'use strict';

module.exports = function(app) {
  app.controller('rewardsController', ['$scope', '$http', function($scope, $http) {
    $scope.errors = [];
    $scope.rewards = [];

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

  }]);
};
