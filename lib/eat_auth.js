'use strict';

var eat = require('eat');
var User = require('../models/User');

module.exports = function(secret) {
  return function(req, res, next) {
    //var token = req.headers.eat || req.body.eat;
    var token = req.headers.cookie.slice(4);
    console.log(req.headers);
    console.log(token);
    if (!token) {
      console.log('no token in request');
      return res.status(401).json({msg: 'authorization failed wtf'});
    }

    eat.decode(token, secret, function(err, decoded) {
      if (err) {
        console.log(err);
        return res.status(401).json({msg: 'authorization failed 1'});
      }

      User.findOne({_id: decoded.id}, function(err, user) {
        if (err) {
          console.log(err);
          return res.status(401).json({msg: 'authorization failed 2'});
        }

        if (!user) {
          console.log('no user found for token');
          return res.status(401).json({msg: 'authorization failed 3'});
        }

        req.user = user;
        next();
      });
    });
  };
};
