const express = require('express');
const router = express.Router();
var passport = require('passport');


router.get('/',isLoggedIn ,function(req,res){
  res.render('user/profile');
});


module.exports = router;

function isLoggedIn(req, res, next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect('/');
}