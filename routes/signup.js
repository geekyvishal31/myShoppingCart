const express = require('express');
const router = express.Router();
var csrf = require('csurf');
var passport = require('passport');


//csrf configuration
var csrfProtection = csrf();
router.use(csrfProtection);

router.get('/',csrfProtection,function(req,res){
  var messages = req.flash('error');
   res.render('user/signup',{csrfToken: req.csrfToken(), messages: messages, hasError:messages.length>0});
});

router.post('/',csrfProtection,passport.authenticate('local-signup',{    //this middleware takes the strategy that we've defined i.e. local.signup
   successRedirect: '/login',
   failureRedirect: '/signup',
   failureFlash: true      //this will flash a message that we have defined in passport.js

}));     
  

module.exports = router;