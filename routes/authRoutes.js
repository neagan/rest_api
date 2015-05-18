'use strict';

var User = require('../models/User');
var bodyparser= require('body-parser');
var events = require('events');
var eventEmitter = new events.EventEmitter();

module.exports = function(router, passport) {
  router.use(bodyparser.json());

  router.post('/create_user', function(req, res) {
    var newUserData = JSON.parse(JSON.stringify(req.body));
    delete newUserData.email;
    delete newUserData.password;

    var newUser = new User(newUserData);
    newUser.basic.email = req.body.email;
    newUser._rewardId = Math.random().toString(36).substr(2, 9);
    newUser.generateHash(req.body.password, function(err, hash) {
      if (err) {
        console.log(err);
        return res.status(500).json({msg: 'unable to process password'});
      }

      newUser.basic.password = hash;
    });

    newUser.save(function(err, user) {
      if (err) {
        console.log(err);
        res.status(500).json({msg: 'user create failed'});
      }

      user.generateToken(process.env.APP_SECRET, function(err, token) {
        if (err) {
          console.log(err);
          return res.status(500).json({msg: 'token generation failed'});
        }

        res.json({token: token});
      });
    });
  });

  router.get('/sign_in', passport.authenticate('basic', {session: false}),
    function(req, res) {
      req.user.generateToken(process.env.APP_SECRET, function(err, token) {
        if (err) {
          console.log(err);
          return res.status(500).json({msg: 'token generation failed'});
        }

        res.json({token: token});
      });
  });
};
