const User = require('../models/userModel');

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
