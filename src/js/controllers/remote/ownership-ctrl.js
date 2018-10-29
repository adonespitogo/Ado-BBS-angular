window.adopisowifi.controller('OwnershipCtrl', [
  '$scope',
  'Device',
  '$stateParams',
  'toastr',
  function ($scope, Device, $stateParams, toastr) {

    $scope.transfer = function (email) {
      if (window.confirm('Are you sure?')) {
        Device.transfer($stateParams.id, email).then(function (res) {
          $scope.device = res.data;
          toastr.success('Wait for ' + email + ' to accept your offer', 'Success');
        });
      }
    };

    $scope.cancel = function (email) {
      if (window.confirm('Are you sure?')) {
        Device.cancelTransfer($stateParams.id, email).then(function (res) {
          $scope.device = res.data;
          toastr.success('Transfer cancelled successfully.', 'Success');
        });
      }
    };

  }
]);
