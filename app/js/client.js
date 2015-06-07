'use strict';

require('angular/angular');
require('angular-route');
require('angular-cookies');
require('angular-base64');

var rewardsApp = angular.module('rewardsApp', ['ngRoute', 'ngCookies', 'base64']);

// controllers
require('./rewards/controllers/rewards_controller')(rewardsApp);
require('./auth/controllers/auth_controller')(rewardsApp);

// services
require('./services/rest')(rewardsApp);
require('./services/clear_form')(rewardsApp);
require('./auth/services/auth')(rewardsApp);

// directives
require('./rewards/directives/reward_form_directive')(rewardsApp);
require('./auth/directives/logout_directive')(rewardsApp);

rewardsApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/rewards', {
      templateUrl: 'templates/views/rewards_view.html',
      controller: 'rewardsController'
    })
    .when('/sign_in', {
      templateUrl: 'templates/views/sign_in.html',
      controller: 'authController'
    })
    .when('/create_user', {
      templateUrl: 'templates/views/create_user.html',
      controller: 'authController'
    })
    .when('/', {
      redirectTo: '/rewards'
    })
    .otherwise({
      redirectTo: '/create_user'
    });
}]);
