'use strict';

var bodyparser = require('body-parser');
var Reward = require('./models/Reward');
var Sql = require('sequelize');
var sql = new Sql('reward_dev', 'reward_dev', 'reward123',  {
  dialect: 'postgres'
});

module.exports = function(router) {
  router.use(bodyparser.json());

  router.get('/rewards', function(req, res) {
    sql.sync()
    .then(function() {
      Reward.all()
      .then(function(data) {
        res.json(data);
      })
      .error(function(err) {
        console.log(err);
        res.status(500).json({msg: 'Internal Server Error'});
      });
    });
  });

  router.post('/rewards', function(req, res) {
    sql.sync()
    .then(function() {
      Reward.create(req.body)
      .then(function(data) {
        res.json(data);
      })
      .error(function(err) {
        console.log(err);
        res.status(500).json({msg: 'Internal Server Error'});
      });
    });
  });

  router.put('/rewards/:id', function(req, res) {
    sql.sync()
    .then(function() {
      Reward.update(req.body, {where: {id: req.params.id}})
      .then(function() {
        res.json({msg: 'Update Successful'});
      })
      .error(function(err) {
        console.log(err);
        res.status(500).json({msg: 'Internal Server Error'});
      });
    });
  });

  router.delete('/rewards/:id', function(req, res) {
    sql.sync()
    .then(function() {
      Reward.destroy({where: {id: req.params.id}})
      .then(function() {
        res.json({msg: 'Delete Successful'});
      })
      .error(function(err) {
        console.log(err);
        res.status(500).json({msg: 'Internal Server Error'});
      });
    });
  });
};
