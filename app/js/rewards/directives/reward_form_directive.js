'use strict';

module.exports = function(app) {
  app.directive('rewardFormDirective', function() {
    return {
      restrict: 'A',
      replace: true,
      templateUrl: '/templates/directives/reward_form.html',
      scope: {
        save: '&',
        buttonText: '=',
        labelText: '@',
        reward: '='
      },
      transclude: true
    };
  });
};
