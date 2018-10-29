window.adopisowifi.factory('deviceConfig', [
  '$stateParams',
  'Device',
  function ($stateParams, Device) {

    return function deviceConfig() {
      return Device.command($stateParams.id, 'get:config').then(function (res) {
        return res.data;
      });
    };

  }
]);

