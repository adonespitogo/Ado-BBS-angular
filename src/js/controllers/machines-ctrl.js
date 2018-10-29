window.adopisowifi.controller('MachinesCtrl', [
  '$scope',
  'Device',
  'toastr',
  function ($scope, Device, toastr) {

    function fetchMachines() {
      Device.fetch().then(function (res) {
        $scope.machines = res.data;
      });
    }

    function fetchOffers() {
      Device.offers().then(function (res) {
        $scope.offers = res.data;
      });
    }

    fetchMachines();
    fetchOffers();

    $scope.respondToOffer = function (id, action) {
      if (window.confirm('Are you sure?')) {
        Device.offerReponse(id, action)
          .then(function (res) {
            if (action.accepted) {
              toastr.success('Machine successfully transfered');
            }
            else {
              toastr.warning('Offer successfully declined');
            }
            fetchMachines();
            fetchOffers();
          });
      }
    };

  }
]);
