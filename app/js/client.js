'use strict';

require('angular/angular');

var rewardsApp = angular.module('rewardsApp', []);

// controllers
require('../rewards/controllers/rewards_controller')(rewardsApp);

// services
require('./services/rest')(rewardsApp);

// directives
