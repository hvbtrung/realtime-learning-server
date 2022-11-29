const User = require('../models/userModel');

const filterObj = (obj, ...allowedFields) => {
    const newObj = {};
    Object.keys(obj).forEach(el => {
        if (allowedFields.includes(el)) newObj[el] = obj[el];
    });

    return newObj;
}

exports.getMe = async (req, res, next) => {
    req.params.id = req.user._id;
    next();
}

exports.updateMe = async (req, res, next) => {
    if (req.body.password) {
        const err = new Error('This route is not for password updates. Please use /updateMyPassword');
        err.statusCode = 400;
        throw err;
    }

    const filteredBody = filterObj(req.body, 'name', 'photo');

    const updatedUser = await User.findByIdAndUpdate(req.user._id, filteredBody, {
        new: true,
        runValidators: true
    });

    res.status(200).json({
        status: 'success',
        data: {
            user: updatedUser
        }
    })
}

exports.deleteMe = async (req, res, next) => {
    await User.findByIdAndUpdate(req.user._id, { active: false });

    res.status(204).json({
        status: 'success',
        data: null
    })
}

exports.getUsers = async (req, res, next) => {
    const users = await User.find();

    if (!users.length) {
        const err = new Error('No users found');
        err.statusCode = 400;
        throw err;
    }

    res.status(200).json({
        status: 'success',
        results: users.length,
        data: { users }
    });
}

exports.getUser = async (req, res, next) => {
    const user = await User.findById(req.params.id);

    if (!user) {
        const err = new Error('No user found with that ID');
        err.statusCode = 404;
        throw err;
    }

    res.status(200).json({
        status: 'success',
        data: { user }
    });
}

exports.createUser = (req, res, next) => {
    const err = new Error('This route is not defined! Please use /signup');
    err.statusCode = 500;
    throw err;
}

// Do NOT update password
exports.updaterUser = async (req, res, next) => {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });

    if (!user) {
        const err = new Error('No user found with that ID');
        err.statusCode = 404;
        throw err;
    }

    res.status(200).json({
        status: 'success',
        data: { user }
    });
}

exports.deleteUser = async (req, res, next) => {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
        const err = new Error('No user found with that ID');
        err.statusCode = 404;
        throw err;
    }

    res.status(204).json({
        status: 'success',
        data: null
    });
}
