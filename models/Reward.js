'use strict';

var mongoose = require('mongoose');

var rewardSchema = mongoose.Schema({
  _rewardId: {type: String},
  level: {type: String, required: true, enum: ['bronze', 'silver', 'gold',
                                               'platinum', 'diamond']},
  points: {type: Number, required: true, min: 0, max: 4000}
});

module.exports = mongoose.model('Reward', rewardSchema);
