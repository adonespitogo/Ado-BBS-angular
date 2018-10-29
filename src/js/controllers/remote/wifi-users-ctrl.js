window.adopisowifi.controller('WiFiUsersCtrl', [
  '$scope',
  'Device',
  '$stateParams',
  function($scope, Device, $stateParams) {

    Device.command($stateParams.id, 'get:clients')
      .then(function(res) {
        $scope.clients = res.data;
      });

  }
]);
