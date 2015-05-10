'use strict';

var mongoose = require('mongoose');

var rewardSchema = mongoose.Schema({
  name: String,
  status: String,
  points: Number
});

module.exports = mongoose.model('Rewards', rewardSchema);
