var express = require('express');
var app = express();
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

    app.use(session({resave: true, saveUninitialized: true, secret: 'secreta', cookie: { maxAge: 60000 }}));

var routes = require('./routes/index');
var users = require('./routes/users');
var mongodbroutes = require('./routes/mongodb');
var sqliteroutes = require('./routes/sqlite');
var mongoose = require('mongoose');
var passport = require('passport');
require('./models/user');
require('./passport/passport')(passport);
mongoose.createConnection('mongodb://localhost/local',
    function(err, res) {
        if(err) throw err;
        console.log('Conectado a la BD');
    });

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(passport.initialize());
app.use(passport.session());
app.get('/auth/twitter', passport.authenticate('twitter'));
app.get('/auth/twitter/callback', passport.authenticate('twitter',
    { successRedirect: '/loged',
        failureRedirect: '/' }));

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);
app.use('/sqlite', sqliteroutes);
app.use('/mongodb', mongodbroutes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

exports.index = function(req, res){
    res.render('loged', {
        title: 'Login Social',
        user: req.user
    });
};

module.exports = app;
