const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GithubStrategy = require('passport-github2').Strategy;
const User = require('../models/userModel');

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: 'https://realtime-learning-server.onrender.com/api/users/google/callback'
    // callbackURL: 'http://localhost:4000/api/users/google/callback'
}, async function (accessToken, refreshToken, profile, done) {
    console.log('GG profile', profile);
    //Check if current user already exists in DB
    const currentUser = await User.findOne({ googleId: profile.id });
    if (currentUser) {
        return done(null, currentUser);
    }

    // if new user
    const newUser = await User.create({
        email: profile.emails[0].value,
        name: profile.name.givenName,
        photo: profile.photos[0].value,
        googleId: profile.id
    });

    done(null, newUser);
}));

passport.use(new GithubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    scope: ['user:email'],
    callbackURL: 'http://localhost:4000/api/users/github/callback'
}, async function (accessToken, refreshToken, profile, done) {
    console.log('GH profile', profile);
    //Check if current user already exists in DB
    const currentUser = await User.findOne({ githubId: profile.id });
    if (currentUser) {
        return done(null, currentUser);
    }

    // if new user
    const newUser = await User.create({
        email: profile.emails[0].value,
        name: profile.username,
        photo: profile.photos[0].value,
        githubId: profile.id
    });

    done(null, newUser);
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    const user = await User.findById(id);
    done(null, user);
});
