/**
 * Module dependencies
 */
var express         = require('express'),
    passport        = require('passport'),
    LocalStrategy   = require('passport-local').Strategy,
    controllers     = require('../controllers'),
    userControllers = require('../controllers/UserController'),
    authControllers = require('../controllers/AuthController'),
    eventControllers = require('../controllers/EventController'),
    chatControllers = require('../controllers/ChatController'),
    User            = require('../models/user');


/**
 * the new Router exposed in express 4
 * the indexRouter handles all requests to the `/` path
 */
var indexRouter = express.Router();

/**
 * this accepts all request methods to the `/` path
 */
//indexRouter.route('/').all(controllers.index);
indexRouter.get('/login',require('connect-ensure-login').ensureNotLoggedIn(), authControllers.index);
//indexRouter.post('/authCheck', authControllers.authCheck);
//indexRouter.post('/authCheck', passport.authenticate(), function(req, res) {    res.redirect('/dashboard'); });
indexRouter.get('/dashboard', require('connect-ensure-login').ensureLoggedIn(),controllers.dashboard);
//User Route
indexRouter.get('/user', require('connect-ensure-login').ensureLoggedIn(), userControllers.user);
indexRouter.get('/userApi',require('connect-ensure-login').ensureLoggedIn(), userControllers.userApi);
indexRouter.post('/userAdd',require('connect-ensure-login').ensureLoggedIn(), userControllers.userAdd);
//Event Route
indexRouter.get('/event', require('connect-ensure-login').ensureLoggedIn(), eventControllers.event);
indexRouter.get('/eventApi', eventControllers.eventApi);
indexRouter.post('/eventAdd',require('connect-ensure-login').ensureLoggedIn(), eventControllers.add);
//Chat Route
indexRouter.get('/chat',chatControllers.index);
indexRouter.post('/chat-list',chatControllers.getChatList);
indexRouter.get('/conntectes-users',chatControllers.conntedUsers);
//indexRouter.get('/online-user-list',chatControllers.getUserList);



indexRouter.post('/login',passport.authenticate('local', {
            failureRedirect: '/login',
            successRedirect : '/chat'
        })
    /*function(req, res) {
        res.redirect('/dashboard');
    }*/ );


indexRouter.get('/logout', function(req, res){ req.logout();  res.redirect('/'); });

exports.indexRouter = indexRouter;
