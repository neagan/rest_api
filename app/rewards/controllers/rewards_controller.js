'use strict';

module.exports = function(app) {
  app.controller('rewardsController', ['$scope', '$http','REST', function($scope, $http, resource) {
    var Reward = resource('rewards');
    $scope.errors = [];
    $scope.rewards = [];
    $scope.update = {}; // Alter this to be toggle

    $scope.getAll = function() {
      Reward.getAll(function(err, data) {
        if (err) {
          return $scope.errors.push({msg: 'could not retrieve rewards profiles'});
        }
        $scope.rewards = data;
      });
    };

    $scope.createNewReward = function() {
      $scope.rewards.push($scope.newReward);

      Reward.create($scope.newReward, function(err, data) {
        if (err) {
          return $scope.errors.push({msg: 'could not create new rewards profile'});
        }
        $scope.rewards.splice($scope.rewards.indexOf($scope.newReward), 1, data);
        $scope.newReward = null;
      });
    };

    $scope.removeReward = function(reward) {
      $scope.rewards.splice($scope.rewards.indexOf(reward), 1);

      Reward.remove(reward, function(err) {
        if (err) {
          $scope.errors.push({msg: 'could not remove reward id: ' + reward._rewardId});
        }
      });
    };

    $scope.updateReward = function(reward) {
      reward.editing = false;
      $http.put('/api/rewards/' + reward._rewardId, reward)
        .error(function(data) {
          console.log(data);
          $scope.errors.push({msg: 'could not update reward profile'});
        });
    };

    $scope.copyReward = function(reward) {
      $scope.update = angular.copy(reward);
    };

    $scope.resetReward = function(reward) {
      $scope.rewards.splice($scope.rewards.indexOf(reward), 1, angular.copy($scope.update));
      $scope.update = {};
    };

    $scope.clearErrors = function() {
      $scope.errors = [];
      $scope.getAll();
    };

  }]);
};
