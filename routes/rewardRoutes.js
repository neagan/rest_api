'use strict';

var Reward = require('../models/Reward');
var bodyparser = require('body-parser');
var eatAuth = require('../lib/eat_auth')(process.env.APP_SECRET);

module.exports = function(router) {
  router.use(bodyparser.json());

  router.get('/rewards', eatAuth, function(req, res) {
    Reward.find({rewardId: req.user._id}, function(err, data) {
      if (err) {
        console.log(err);
        return res.status(500).json({msg: 'internal Server Error'});
      }

      res.json(data);
    });
  });

  router.post('/rewards', eatAuth, function(req, res) {
    var newReward = new Reward(req.body);
    newReward.rewardId = req.user._id;
    newReward.save(function(err, data) {
      if (err) {
        return res.status(500).json(err);
      }

      res.json(data);
    });
  });

  router.put('/rewards/:id', eatAuth, function(req, res) {
    var update = req.body;
    delete update._id;

    Reward.update({'_id': req.params.id}, update, function(err, data) {
      if (err) {
        console.log(err);
        return res.status(500).json({msg: 'internal Service Error'});
      }

      res.json({msg: 'update Successful'});
    });

  });

  router.delete('/rewards/:id', eatAuth, function(req, res) {
    Reward.remove({'_id': req.params.id}, function(err, data) {
      if (err) {
        console.log(err);
        return res.status(500).json({msg: 'internal Service Error'});
      }

      res.json({msg: 'delete Successful'});
    });
  });
};
