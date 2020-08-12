var express = require('express');
var router = express.Router();
var csrf = require('csurf');
var passport = require('passport');

//csrf configuration
var csrfProtection = csrf();
router.use(csrfProtection);


router.get('/',function(req,res,next){
  var messages = req.flash('error');
  res.render('user/login',{csrfToken: req.csrfToken(), messages: messages, hasError: messages.length>0});
});

router.post('/',csrfProtection,passport.authenticate('local-login',{    //this middleware takes the strategy that we've defined i.e. local.signup
   successRedirect: '/profile',
   failureRedirect: '/login',
   failureFlash: true      //this will flash a message that we have defined in passport.js

}));     


module.exports = router;