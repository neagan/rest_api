'use strict';

var mongoose = require('mongoose');

var rewardSchema = mongoose.Schema({
  name: String,
  level: String,
  points: Number
});

module.exports = mongoose.model('Reward', rewardSchema);
