
window.adopisowifi.directive('saveConfigBtn', [
  'toastr',
  'Device',
  function (toastr, Device) {
    return {
      replace: true,
      transclude: true,
      restrict: 'AE',
      scope: {
        deviceId: '<',
        config: '<'
      },
      template: '<button type="submit" ladda="submitting" class="btn btn-primary" ng-click="submit()"><span ng-if="submitting" class="ellipsis">Saving</span><ng-transclude ng-if="!submitting"/></button>',
      link: function ($scope, elem) {

        $scope.submitting = false;
        $scope.submit = function () {
          $scope.submitting = true;
          Device.command($scope.deviceId, 'update:config', $scope.config)
            .then(function() {
              toastr.success('Settings has been saved successfully.');
            })
            .finally(function () {
              $scope.submitting = false;
            });
        };

      }
    };
  }]);
