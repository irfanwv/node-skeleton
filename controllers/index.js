/**
 * do something with the user model
 *
 */
var User = require('../models/user');
var UserController = {};


    UserController.index = function (req, res) {
        User.createUser({
            email: 'tom@gmail.com',
            username: 'tom',
            password: '123456'
        });
      res.render('login', {
          title: 'Sipl Directory Admin Login',
          body: 'login'
      });
    };


    UserController.dashboard = function (req, res) {
        res.render('dashboard', {
            title: 'Sipl Directory Admin Dashboard',
            user: req.user
        });
    };






module.exports = UserController;