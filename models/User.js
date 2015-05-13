'use strict';

var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var eat = require('eat');

var userSchema = mongoose.Schema({
  username: String,
  basic: {
    email: { type: String, unique: true},
    password: String
  }
});

userSchema.methods.generateHash = function(password) {
  bcrypt.genSalt(8, function(err, salt) {
    bcrypt.hash(password, salt, null, function(err, hash) {
      if (err) {
        console.log(err);
        return res.status(500).json({msg: 'Internal Server Error'});
      }
      return hash; // ?
    });
  });
};

userSchema.methods.checkPassword = function(password) {
  bcrypt.compare(password, this.basic.password, function(err, res) {
    if (err) {
      console.log(err);
      return res.status(500).json({msg: 'Internal Server Error'})
    }
    return res;
  })
};

userSchema.methods.generateToken = function(secret, callback) {
  eat.encode({id: this._id}, secret, callback);
};

module.exports = mongoose.model('User', userSchema);
