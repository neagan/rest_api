'use strict';

module.exports = function(app) {
  app.controller('rewardsController', ['$scope', '$http', function($scope, $http) {
    $scope.errors = [];
    $scope.rewards = [];
    $scope.update = {};

    $scope.getAll = function() {
      $http.get('/api/rewards')
        .success(function(data) {
          $scope.rewards = data;
        })
        .error(function(data) {
          console.log(data);
          $scope.errors.push({msg: 'could not retrieve rewards profiles'});
        })
    };

    $scope.createNewReward = function() {
      $http.post('/api/rewards', $scope.newReward)
        .success(function(data) {
          $scope.rewards.push(data);
          $scope.newReward = null;
        })
        .error(function(data) {
          console.log(data);
          $scope.errors.push({msg: 'could not create new rewards profile'});
        });
    };

    $scope.clearErrors = function() {
      $scope.errors = [];
      $scope.getAll();
    };

    $scope.removeReward = function(reward) {
      $scope.rewards.splice($scope.rewards.indexOf(reward), 1);
      $http.delete('/api/rewards/' + reward._rewardId)
        .error(function(data) {
          console.log(data);
          $scope.errors.push({msg: 'could not remove reward id: ' + reward._rewardId});
        });
    };

    $scope.updateReward = function(reward) {
      reward.editing = false;
      $http.put('/api/rewards/' + reward._rewardId, reward)
        .error(function(data) {
          console.log(data);
          $scope.errors.push({msg: 'could not update reward profile'})
        });
    };

    $scope.copyReward = function(reward) {
      $scope.update = angular.copy(reward);
    };

    $scope.resetReward = function(reward) {
      $scope.rewards.splice($scope.rewards.indexOf(reward), 1, angular.copy($scope.update));
      $scope.update = {};
    };

  }]);
};
