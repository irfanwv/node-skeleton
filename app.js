/**
 * Module dependencies.
 */

var express        = require('express'),
    path           = require('path'),
    mongoose       = require('mongoose'),
    logger         = require('morgan'),
    bodyParser     = require('body-parser'),
    compress       = require('compression'),
    favicon        = require('static-favicon'),
    methodOverride = require('method-override'),
    errorHandler   = require('errorhandler'),
    config         = require('./config'),
    routes         = require('./routes'),
    passport       = require('passport'),
    expressSession = require('express-session'),
    LocalStrategy  = require('passport-local').Strategy;

require('./config/passport')(passport);


/*mongoose.connect('mongodb://localhost/siplDirectory');
var database = mongoose.connection;
database.once('open', function() { console.log("database is connected")});
database.on('error', function(err) { console.log(err)});*/

mongoose.connect(config.database.url);
mongoose.connection.on('error', function () {
  console.log('mongodb connection error');
});
/*
var User = require('./models/user');
User.findById("5c35fa6c90b9430774e80362", function(err, response){
    console.log(response);
});
console.log(User);


var userSchema =  mongoose.Schema({
    email: String,
    username: String,
    password: String,
    createdAt: {type: Date, default: Date.now},
});
var Person = mongoose.model("Person", userSchema);*/


var app = express();
//var http = require('http').Server(app);




/**
 * Express configuration.
 */
app.set('port', config.server.port);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app
  .use(compress())
  .use(favicon())
  .use(logger('dev'))
  .use(bodyParser())
  .use(methodOverride())
  .use(expressSession({secret: 'mySecretKey'}))
  .use(passport.initialize())
  .use(passport.session())
  .use(express.static(path.join(__dirname, 'public')))
  .use(routes.indexRouter)
  .use(function (req, res) {
    res.status(404).render('404', {title: 'Not Found :('});
  });


if (app.get('env') === 'development') {
  app.use(errorHandler());
}


var server = app.listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});

require('./config/socket')(server);