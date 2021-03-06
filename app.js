var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

var index = require('./routes/index');
var login = require('./routes/login');
var inbox = require('./routes/inbox');
var compose = require('./routes/compose');
var send = require('./routes/send');

var MongoClient = require('mongodb').MongoClient;

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(session({secret: 'zea8anuwoQuooL4Cheu5fohbesaew6aix5ithae8'}));
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next) {
  MongoClient.connect('mongodb://localhost:27017/msgapp', function(err, db) {
    req.users = db.collection('users');
    req.messages = db.collection('messages');
    next();
  });
});

app.use('/', index);
app.use('/login', login);
app.use('/inbox', inbox);
app.use('/compose', compose);
app.use('/send', send);

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

/// error handlers

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


module.exports = app;
