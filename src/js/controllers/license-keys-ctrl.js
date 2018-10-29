window.adopisowifi.controller('LicenseKeysCtrl', [
  '$scope',
  'LicenseKey',
  'toastr',
  function ($scope, LicenseKey, toastr) {

    function fetchKeys() {
      LicenseKey.fetch().then(function (res) {
        $scope.keys = res.data;
      });
    }

    function fetchOffers() {
      LicenseKey.offers().then(function (res) {
        $scope.offers = res.data;
      });
    }

    fetchKeys();
    fetchOffers();

    $scope.accept = function (id) {
      if (window.confirm('Accept license?')) {
        LicenseKey.accept(id)
          .then(function (res) {
            toastr.success('License successfully transferred to your account');
            fetchKeys();
            fetchOffers();
          });
      }
    };

    $scope.decline = function (id) {
      if (window.confirm('Decline license?')) {
        LicenseKey.decline(id)
          .then(function (res) {
            toastr.warning('License successfully declined');
            fetchOffers();
          });
      }
    };

  }
]);
