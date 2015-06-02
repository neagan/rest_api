'use strict';

require('../../app/js/client');
require('angular-mocks');

describe('rewards controller', function() {
  var $CC;
  var $httpBackend;
  var $scope;

  beforeEach(angular.mock.module('rewardsApp'));

  beforeEach(angular.mock.inject(function($rootScope, $controller) {
    $scope = $rootScope.$new();
    $CC = $controller;
  }));

  it('should be able to create a new controller', function() {
    var rewardsController = $CC('rewardsController', {$scope: $scope});
    expect(typeof rewardsController).toBe('object');
    expect(Array.isArray($scope.rewards)).toBe(true);
    expect(Array.isArray($scope.errors)).toBe(true);
    expect(typeof $scope.getAll).toBe('function');
  });

  describe('REST functionality', function() {
    beforeEach(angular.mock.inject(function(_$httpBackend_) {
      $httpBackend = _$httpBackend_;
      this.rewardsController = $CC('rewardsController', {$scope: $scope});
    }));

    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it('should make a get request on index', function() {
      $httpBackend.expectGET('/api/rewards').respond(200, [{_id: 1, _rewardId: 1, level: 'bronze', points: 0}]);
      $scope.getAll();
      $httpBackend.flush();
      expect($scope.rewards[0]._id).toBe(1);
      expect($scope.rewards[0]._rewardId).toBe(1);
      expect($scope.rewards[0].level).toBe('bronze');
      expect($scope.rewards[0].points).toBe(0);
    });

    it('should be able to process errors', function() {
      $httpBackend.expectGET('/api/rewards').respond(500, {msg: 'internal server error'});
      $scope.getAll();
      $httpBackend.flush();

      expect($scope.errors.length).toBe(1);
      expect($scope.errors[0].msg).toBe('could not retrieve rewards profiles');
    });

    it('should be able to create a new rewards profile', function() {
      $scope.newReward = ({_id: 2, _rewardId: 2, level: 'silver', points: 1000});

      $httpBackend.expectPOST('/api/rewards').respond(200, [{_id: 2, _rewardId: 2, level: 'silver', points: 1000}]);
      $scope.createNewReward();
      $httpBackend.flush();

      expect($scope.rewards[0]._id).toBe(2);
      expect($scope.rewards[0]._rewardId).toBe(2);
      expect($scope.rewards[0].level).toBe('silver');
      expect($scope.rewards[0].points).toBe(1000);
      expect($scope.newReward).toBe(null);
    });

    it('should be able to delete a rewards profile', function() {
      var reward = {_id: 3, _rewardId: 3, level: 'gold', points: 2000};
      $scope.rewards.push(reward);

      $httpBackend.expectDELETE('/api/rewards/3').respond(200, {msg: 'delete successful'});
      expect($scope.rewards.indexOf(reward)).not.toBe(-1);
      $scope.removeReward(reward);
      expect($scope.rewards.indexOf(reward)).toBe(-1);
      $httpBackend.flush();

      expect($scope.errors.length).toBe(0);
    });

  });

});
