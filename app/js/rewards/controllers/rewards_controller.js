'use strict';

module.exports = function(app) {
  app.controller('rewardsController', ['$scope','REST', 'clearForm', function($scope, resource, clearForm) {
    var Reward = resource('rewards');
    $scope.errors = [];
    $scope.rewards = [];
    $scope.update = {};

    $scope.getAll = function() {
      Reward.getAll(function(err, data) {
        if (err) {
          return $scope.errors.push({msg: 'could not retrieve rewards profiles'});
        }
        $scope.rewards = data;
      });
    };

    $scope.createNewReward = function(reward) {
      var newReward = angular.copy(reward);
      clearForm(reward);
      $scope.rewards.push(newReward);

      Reward.create(newReward, function(err, data) {
        if (err) {
          return $scope.errors.push({msg: 'could not create new rewards profile'});
        }
        $scope.rewards.splice($scope.rewards.indexOf(newReward), 1, data);
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

      Reward.save(reward, function(err, data) {
        if (err) {
          $scope.errors.push({msg: 'could not update reward profile'});
        }
      });
    };

    // consider turning this into a service
    $scope.toggleCancel = function(reward) {
      if (reward.editing) {
        $scope.rewards.splice($scope.rewards.indexOf(reward), 1, angular.copy($scope.update));
        $scope.update = {};
        reward.editing = false;
      } else {
        $scope.update = angular.copy(reward);
        reward.editing = true;
      }
    };

    $scope.clearErrors = function() {
      $scope.errors = [];
      $scope.getAll();
    };

  }]);
};
