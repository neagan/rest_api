'use strict';

var Reward = require('../models/Reward');
var bodyparser = require('body-parser');
var eatAuth = require('../lib/eat_auth')(process.env.APP_SECRET);

module.exports = function(router) {
  router.use(bodyparser.json());

  router.get('/rewards', eatAuth, function(req, res) {
    Reward.find({}, function(err, data) {
      if (err) {
        console.log(err);
        return res.status(500).json({msg: 'internal server error'});
      }

      res.json(data);
    });
  });

  router.get('/rewards/:id', eatAuth, function(req, res) {
    Reward.find({_rewardId: req.params.id}, function(err, data) {
      if (err) {
        console.log(err);
        return res.status(500).json({msg: 'internal server error'});
      }

      res.json(data);
    });
  });

  router.post('/rewards', eatAuth, function(req, res) {
    var newReward = new Reward(req.body);
    newReward._rewardId = Math.random().toString(36).substr(2, 9);
    newReward.save(function(err, data) {
      if (err) {
        return res.status(500).json(err);
      }

      res.json(data);
    });
  });

  router.put('/rewards/:id', eatAuth, function(req, res) {
    var update = req.body;
    update._rewardId = req.params.id;
    delete update._id;

    Reward.update({'_rewardId': req.params.id}, update, function(err, data) {
      if (err) {
        console.log(err);
        return res.status(500).json({msg: 'internal server error'});
      }

      res.json({msg: 'update successful'});
    });

  });

  router.delete('/rewards/:id', eatAuth, function(req, res) {
    Reward.remove({'_rewardId': req.params.id}, function(err, data) {
      if (err) {
        console.log(err);
        return res.status(500).json({msg: 'internal server error'});
      }

      res.json({msg: 'delete successful'});
    });
  });
};
