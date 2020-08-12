const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var bcrypt = require('bcryptjs');

const userSchema = new Schema({
  
     fullName:{ type: String, required:true },
     email:{ type: String, required:true },
     password:{ type: String, required:true },
  
  });
//method to hash the password,to get an encrypted password .
userSchema.methods.encryptPassword = function(password){
  return bcrypt.hashSync(password, bcrypt.genSaltSync(5), null);
};

//method to check whether the password matches the hashed password.
userSchema.methods.validPassword = function(password){
  return bcrypt.compareSync(password, this.password); //this here refers to the password of the current user.
};

module.exports = mongoose.model('User',userSchema); 