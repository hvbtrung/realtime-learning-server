const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Please provide your email'],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'Please provide a valid email']
    },
    password: {
        type: String,
        default: null
        // select: false,
        // required: [true, 'Please provide a password'],
        // minLength: [6, 'Password must be up to 6 characters']
    },
    name: {
        type: String,
        required: [true, 'Please enter your name!']
    },
    photo: {
        type: String,
        default: 'https://res.cloudinary.com/dcb3l1cvi/image/upload/v1668656456/realtime_learning/default_unjvlj.jpg'
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    active: {
        type: Boolean,
        default: false
    },
    googleId: {
        type: String,
        default: null
    },
    githubId: {
        type: String,
        default: null
    }
}, {
    timestamps: true,
    collection: 'user'
});

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;

    next();
});

userSchema.methods.correctPassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
}

const User = mongoose.model('User', userSchema);

module.exports = User;
