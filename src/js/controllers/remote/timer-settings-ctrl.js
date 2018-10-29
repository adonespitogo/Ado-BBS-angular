window.adopisowifi.controller('TimerSettingsCtrl', [
  '$scope',
  'Device',
  'parseScopeConfig',
  'toastr',
  'deviceConfig',
  function ($scope, Device, parseScopeConfig, toastr, deviceConfig) {

    var model_pins = {
      raspberry_pi_3: [3, 7, 11],
      espressobin_armbian: [451, 467]
    };

    deviceConfig().then(function (config) {
      $scope.config = config;
      parseScopeConfig($scope, config);
      $scope.pins = model_pins[$scope.config.hardware.model];
    });

    //$scope.config = deviceConfig;
    //parseScopeConfig($scope, deviceConfig);
    //$scope.pins = model_pins[$scope.config.hardware.model];

    function update(timer) {
      timer = timer.filter(function (t) {
        return t.pulse > 0 && t.minutes > 0;
      })
        .map(function(t) {
          t.credits = t.pulse;
          return t;
        });
      return Device.command($scope.device.id, 'update:config', {timer: timer})
        .then(function (res) {
          console.log(res);
          parseScopeConfig($scope, res.data);
          toastr.success('Settings has been saved successfully.');
          return true;
        });
    }

    $scope.onCancel = function () {
      $scope.settings.timer = $scope.settings.timer.filter(function (t) {
        return t.pulse > 0 && t.minutes > 0;
      });
    };

    $scope.updateTimer = function (i, t) {
      var timer = angular.copy($scope.settings.timer);
      timer[i] = angular.extend(timer[i], t);
      return update(timer);
    };

    $scope.newCredit = function () {
      $scope.inserted = {
        pulse: 1,
        credits: 0,
        minutes: 0
      };
      $scope.settings.timer.push($scope.inserted);
    };

    $scope.removeCredit = function (index) {
      console.log('index', index);
      if (window.confirm('Are you sure?')) {
        var timer = angular.copy($scope.settings.timer);
        timer.splice(index, 1);
        return update(timer);
      }
    };

    $scope.disableBtn = function (field, val) {

      if (val && !window.confirm('Are you sure?')) {
        $scope.settings[field] = !val;
        return;
      }

      var opts = {};
      opts[field] = val;

      Device.command($scope.device.id, 'update:config', opts)
        .then(function() {
          $scope.config[field] = val;
          toastr.success('Settings has been saved successfully.');
        })
        .catch(function () {
          $scope.settings[field] = !val;
        });
    };

  }
]);
