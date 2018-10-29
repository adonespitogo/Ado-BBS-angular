
window.adopisowifi.controller('SoftwareUpdateCtrl', [
  '$scope',
  'Device',
  '$stateParams',
  '$timeout',
  'SemverCompare',
  function ($scope, Device, $stateParams, $timeout, SemverCompare) {

    $scope.featureSupported = function (device) {
      var least_version = "3.0.61";
      if (!device.software_version) return false;
      return SemverCompare(device.software_version, least_version) >= 0;
    };

    $scope.check = function () {
      $scope.checking_updates = true;
      Device.command($stateParams.id, 'update:check')
        .then(function (res) {
          $scope.updates = res.data;
        })
        .catch(function (res) {
          console.log(res);
          $scope.updates = null;
        })
        .finally(function () {
          $scope.checking_updates = false;
        });
    };

    function pollUpdates() {
      Device
        .command($stateParams.id, 'update:status')
        .then(function (res) {
          $scope.status = res.data;
        })
        .finally(function () {
          if (!$scope.status) return;
          if (!$scope.status.status) return;
          if ($scope.status.status != 'failed' && $scope.status.status != 'installed')
            $timeout(pollUpdates, 3000);
        });
    }

    $scope.install = function () {
      Device.command($stateParams.id, 'update:install')
        .then(function (res) {
          $scope.status = res.data;
          pollUpdates();
        });
    };

    pollUpdates();

  }
]);

