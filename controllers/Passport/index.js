/**
 * do something with the user model
 *
 */
var User = require('../../models/user'),
    passport        = require('passport'),
    LocalStrategy  = require('passport-local').Strategy;
var Passport = {};

passport.use(new LocalStrategy(
    function(username, password, cb) {
        User.User.findByUsername(username, function(err, user) {
            if (err) { return cb(err); }
            if (!user) { return cb(null, false); }
            if (user.password != password) { return cb(null, false); }
            return cb(null, user);
        });
    }));

passport.serializeUser(function(user, cb) {
    cb(null, user.id);
});

passport.deserializeUser(function(id, cb) {
    User.User.findById(id, function (err, user) {
        if (err) { return cb(err); }
        cb(null, user);
    });
});

passport.authenticate('local', { failureRedirect: '/login' }),
    function(req, res) {
        res.redirect('/dashboard');
    };





module.exports = passport;