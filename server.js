var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

//OAuth Session
var session = require('express-session');
//Require Passport
var passport = require('passport');
//Method Override
var methodOverride = require('method-override');

//Load the "secrets" in the .env file
require('dotenv').config();

TODO: //Add Database
require('./config/database');

require('./config/passport');

// //Require Google AuthStrategy
// const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

const indexRouter = require('./routes/index');
const vinylsRouter = require('./routes/vinyls');
const reviewsRouter = require('./routes/reviews');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//Method Override
app.use(methodOverride('_method'));

//Configure Session Middleware
app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true
}));

//Mount Passport
app.use(passport.initialize());
app.use(passport.session());

// Req.user to all views - Add this middleware BELOW passport middleware
app.use(function (req, res, next) {
  res.locals.user = req.user;
  next();
});

//App Routers
app.use('/', indexRouter);
app.use('/vinyls', vinylsRouter);
app.use('/', reviewsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
