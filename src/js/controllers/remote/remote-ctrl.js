window.adopisowifi.controller('RemoteCtrl', [
  '$scope',
  'Device',
  '$stateParams',
  'device',
  function ($scope, Device, $stateParams, device) {

    $scope.device = device;

  }
]);

