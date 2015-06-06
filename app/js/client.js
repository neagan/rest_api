'use strict';

require('angular/angular');

var rewardsApp = angular.module('rewardsApp', []);

// controllers
require('./rewards/controllers/rewards_controller')(rewardsApp);

// services
require('./services/rest')(rewardsApp);
require('./services/clear_form')(rewardsApp);

// directives
require('./rewards/directives/reward_form_directive')(rewardsApp);
