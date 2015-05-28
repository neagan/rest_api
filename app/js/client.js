'use strict';

var reward = require('./reward');
document.write(reward());
var rewardList = document.getElementById('rewardList');

var request = require('superagent');


request
  .get('/api/rewards')
  .end(function(err, res) {
    if (err) {
      console.log(err);
    }

    var rewards = JSON.parse(res.text);
    rewards.forEach(function(reward) {
      var rewardEl = document.createElement('li');
      rewardEl.innerHTML += 'ID: ' + reward._rewardId + ', ';
      rewardEl.innerHTML += 'Level: ' + reward.level + ', ';
      rewardEl.innerHTML += 'Points: ' + reward.points;
      rewardList.appendChild(rewardEl);
    })
  });

document.getElementById('submit').onclick = function() {
  var level = document.getElementById('level').value;
  var points = document.getElementById('points').value;

  request
    .post('/api/rewards')
    .send({level: level, points: points})
    .end(function(err, res) {
      if (err) {
        console.log(err);
      }

      console.log('Posted');
    });
};

document.getElementById('delete').onclick = function() {
  var id = document.getElementById('delete-id').value;

  request
    .del('/api/rewards/' + id)
    .end(function(err, res) {
      if (err) {
        console.log(err);
      }

      console.log('Deleted');
    });
}

