var express = require('express');
var router = express.Router();

//Requiring passport module
const passport = require('passport');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


TODO: //How do I request phonenumber? 

// Google OAuth login route
router.get('/auth/google', passport.authenticate(
  // Which passport strategy is being used?
  'google',
  {
    // Requesting the user's profile and email
    scope: ['profile', 'email'],
    // Optionally force pick account every time
    // prompt: "select_account"
  }
));


// Google OAuth callback route after user confirms
router.get('/oauth2callback', passport.authenticate(
  'google',
  {
    successRedirect: '/spinly',
    failureRedirect: '/spinly'
  }
));


// OAuth logout route
router.get('/logout', function(req, res){
  req.logout(function() {
    res.redirect('/movies');
  });
});


module.exports = router;
