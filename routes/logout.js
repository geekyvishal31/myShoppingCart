const express = require('express');
const router = express.Router();
var passport = require('passport');



router.get('/',isLoggedIn ,function(req, res, next){
  req.logout();
  res.redirect('/');
});

module.exports = router;

function isLoggedIn(req, res, next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect('/');
}