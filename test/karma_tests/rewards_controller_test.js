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

  });

});
