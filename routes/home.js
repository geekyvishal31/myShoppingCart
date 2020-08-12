const express = require('express');
const router = express.Router();
const products = require('../models/product');

router.get('/',function(req,res){
  products.find({},function(err,obj){
    var stockChunks = [];
    var chunkSize = 3;
    for(var i=0; i<obj.length; i+= chunkSize){
      stockChunks.push(obj.slice(i, i+chunkSize));
    }
    //console.log(stock);
    res.render('shop/home',{stuffs:stockChunks});
  });
});

module.exports = router;


