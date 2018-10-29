window.adopisowifi.controller('DeviceCtrl', [
  '$scope',
  'Device',
  'toastr',
  '$window',
  function ($scope, Device, toastr, $window) {

    $scope.reset = function (device_id) {

      if (!$window.confirm('Are you sure?')) return;

      Device.command(device_id, 'reset').then(function () {
        toastr.warning('Device is rebooting in order for new settings to take effect.');
        toastr.success('Device has been reset successfully.');
      });

    };

    $scope.power = function (device_id, cmd) {

      if (!$window.confirm('Are you sure?')) return;

      Device.command(device_id, cmd).then(function () {
        toastr.success('Device has been ' + cmd + ' successfully.');
      });

    };

    $scope.update = function (d) {
      Device.update(d)
        .then(function (res) {
          $scope.device = res.data;
          toastr.success("Machine updated successfully");
        });
    };

  }
]);
