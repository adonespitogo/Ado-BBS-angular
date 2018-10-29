window.adopisowifi.controller('ManageLicenseCtrl', [
  '$scope',
  'LicenseKey',
  'Device',
  '$stateParams',
  'toastr',
  function ($scope, LicenseKey, Device, $stateParams, toastr) {

    LicenseKey.get($stateParams.id)
      .then(function (res) {
        $scope.key = res.data;
      });

    $scope.revoke = function (id) {
      if (window.confirm('This will remove the license from the associated machine. You cannot use the machine once the license is revoked.')) {
        Device.revoke(id)
          .then(function () {
            toastr.success('A confirmation link has been sent to your email. Please click the link sent to your email to revoke the license.');
          });
      }
    };

    $scope.transfer = function (email) {
      if (window.confirm('Are you sure?')) {
        LicenseKey.transfer($stateParams.id, email)
          .then(function (res) {
            toastr.success('Wait for ' + email + ' to accept the license.');
            $scope.key = res.data;
          });
      }
    };

    $scope.cancelOffer = function (id) {
      if (window.confirm('Are you sure?')) {
        LicenseKey.cancel(id)
          .then(function (res) {
            toastr.success('Transfer cancelled successfully.');
            $scope.key = res.data;
          });
      }
    };

  }
]);
