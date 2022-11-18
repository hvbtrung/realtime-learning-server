const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const signAccessToken = (id) => {
    return jwt.sign({ id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN });
}

const decodeAccessToken = (token) => {
    return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
}

const createCookieOptions = () => {
    const cookieOptions = {
        httpOnly: true,
        secure: false, // production: true
        expires: new Date(Date.now() + process.env.ACCESS_TOKEN_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000)
    }

    return cookieOptions;
}

exports.register = async (req, res, next) => {
    const { email, password, name } = req.body;

    if (!email || !password || !name) {
        const err = new Error('All fields must be filled');
        err.statusCode = 400;
        throw err;
    }

    const newUser = await User.create({ email, password, name });

    const accessToken = signAccessToken(newUser._id);

    const cookieOptions = createCookieOptions();

    res.cookie('jwt', accessToken, cookieOptions);

    res.status(201).json({
        status: 'success',
        accessToken,
        data: { user: newUser }
    })
}

exports.login = async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        const err = new Error('Please enter email and password');
        err.statusCode = 400;
        throw err;
    }

    const user = await User.findOne({ email });

    if (!user || !(await user.correctPassword(password))) {
        const err = new Error('Incorrect email or password');
        err.statusCode = 401;
        throw err;
    }

    const accessToken = signAccessToken(user._id);

    const cookieOptions = createCookieOptions();

    res.cookie('jwt', accessToken, cookieOptions);

    res.status(200).json({
        status: 'success',
        accessToken,
        data: { user }
    })
}

exports.logout = (req, res) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        secure: false,
        expires: new Date(Date.now() + 1 * 1000)
    });
    res.status(200).json({ status: 'success' });
}

exports.protect = async (req, res, next) => {
    let accessToken;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        accessToken = req.headers.authorization.split(' ')[1];
    } else if (req.cookies.jwt) {
        accessToken = req.cookies.jwt;
    }

    if (!accessToken) {
        const err = new Error('Unauthorized, please login');
        err.statusCode = 403;
        throw err;
    }

    const decoded = decodeAccessToken(accessToken);

    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
        const err = new Error('User not found');
        err.statusCode = 401;
        throw err;
    }

    req.user = currentUser;
    next();
}
