'use strict';

var eat = require('eat');
var User = require('../models/User');

module.exports = function(secret) {
  return function(req, res, next) {
    var token = req.headers.eat || req.body.eat;
    if (!token) {
      console.log('no token in request');
      return res.status(401).json({msg: 'authorization failed'});
    }

    eat.decode(token, secret, function(err, decoded) {
      if (err) {
        console.log(err);
        return res.status(401).json({msg: 'authorization failed'});
      }

      User.findOne({_id: decoded.id}, function(err, user) {
        if (err) {
          console.log(err);
          return res.status(401).json({msg: 'authorization failed'});
        }

        if (!user) {
          console.log('no user found for token');
          return res.status(401).json({msg: 'authorization failed'});
        }

        req.user = user;
        next();
      });
    });
  };
};
