const express = require('express');
const passport = require('passport');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

const router = express.Router();

// Normal login
router.post('/register', authController.register);
router.get('/confirmation/:confirmEmailToken', authController.confirmEmail);
router.post('/login', authController.login);
router.get('/logout', authController.logout);

// Social login
router.get('/social/login/success', authController.socialLoginSuccess);
router.get('/social/login/failed', authController.socialLoginFailed);

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/google/callback', passport.authenticate('google', {
    successRedirect: process.env.CLIENT_URL,
    failureRedirect: 'api/users/social/login/failed'
}));

router.get('/github', passport.authenticate('github', { scope: ['profile', 'user:email'] }));
router.get('/github/callback', passport.authenticate('github', {
    successRedirect: process.env.CLIENT_URL,
    failureRedirect: 'api/users/social/login/failed'
}));

// Manage user for Admin
router.use(authController.protect);

router.route('/')
    .get(userController.getUsers)
    .post(userController.createUser);

router.route('/:id')
    .get(userController.getUser)
    .patch(userController.updaterUser)
    .delete(userController.deleteUser);

module.exports = router;
