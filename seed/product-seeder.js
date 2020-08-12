var Product = require('./models/product');

var mongoose = require('mongoose');


var product = new Product({
  imagePath: 'shopping.jfif',
  title: 'levelU',
  description:'myfav!!!!!!',
  price: 10
});

product.save().then(savedProduct=> {
   console.log('saved');
});

mongoose.disconnect();