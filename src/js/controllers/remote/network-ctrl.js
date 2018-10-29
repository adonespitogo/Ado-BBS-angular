window.adopisowifi.controller('NetworkSettingsCtrl', [
  '$scope',
  'device',
  'Device',
  'parseScopeConfig',
  'toastr',
  'deviceConfig',
  function ($scope, device, Device, parseScopeConfig, toastr, deviceConfig) {

    $scope.device = device;

    deviceConfig().then(function (config) {
      $scope.config = config;
      parseScopeConfig($scope, config);
    });

    $scope.setHostapd = function () {
      if ($scope.config.hardware.model === 'raspberry_pi_3') {
        $scope.settings.hostapd = $scope.settings.lan !== 'eth1';
      }
    };

  }
]);
