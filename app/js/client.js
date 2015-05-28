'use strict';

require('angular/angular');

var rewardsApp = angular.module('rewardsApp', []);

require('../rewards/controllers/rewards_controller')(rewardsApp);
