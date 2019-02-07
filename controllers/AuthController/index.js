/**
 * do something with the user model
 *
 */
var User = require('../../models/user'),
    passport        = require('passport'),
    LocalStrategy  = require('passport-local').Strategy;
var AuthController = {};

AuthController.index = function (req, res) {
    /* User.createUser({
         email: 'tom@gmail.com',
         username: 'tom',
         password: '123456'
     });*/
    res.render('login', {
        title: 'Sipl Directory Admin Login',
        body: 'login'
    });
};


AuthController.dashboard = function (req, res) {
    res.render('dashboard', {
        title: 'Sipl Directory Admin Dashboard'
    });
};

module.exports = AuthController;