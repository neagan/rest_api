'use strict';

var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var eat = require('eat');
var events = require('events');

var userSchema = mongoose.Schema({
  username: String,
  _rewardId: String,
  basic: {
    email: {type: String, unique: true},
    password: String
  }
});

userSchema.methods.generateHash = function(password, callback) {
  bcrypt.genSalt(8, function(err, salt) {
    bcrypt.hash(password, salt, null, function(err, hash) {
      if (err) {
        console.log(err);
        return res.status(500).json({msg: 'internal Server Error'});
      }
      callback(null, hash);
    });
  });
};

userSchema.methods.checkPassword = function(password, callback) {
  bcrypt.compare(password, this.basic.password, function(err, res) {
    if (err) {
      console.log(err);
      return res.status(500).json({msg: 'internal Server Error'});
    }
    callback(null, res);
  });
};

userSchema.methods.generateToken = function(secret, callback) {
  eat.encode({id: this._rewardId}, secret, callback); // Change this
};

module.exports = mongoose.model('User', userSchema);
