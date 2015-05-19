'use strict';

var Sql = require('sequelize');
var sql = new Sql('reward_dev', 'reward_dev', 'reward123', {
  dialect: 'postgres'
});

var Reward = module.exports = sql.define('Reward', {
  name: Sql.STRING,
  level: {
    type: Sql.STRING,
    validate: {
      isIn: [['silver', 'gold', 'platinum', 'diamond']]
    }
  },
  points: {
    type: Sql.INTEGER,
    validate: {
      min: 0,
      max: 4000
    }
  }
});

Reward.sync();
