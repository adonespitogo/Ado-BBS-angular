window.adopisowifi.service('parseScopeConfig', function () {
  return function parseSettings($scope, config) {
    config.dont_limit_stations = !config.limit_stations;
    $scope.config = config;
    $scope.settings = angular.copy(config);
    $scope.current_password = '';
    $scope.wait_payment_seconds = config.wait_payment_seconds / 60;
    $scope.allow_pause_time = config.allow_pause_time / (60*60*24);
    $scope.allow_pause_validity = config.allow_pause_validity / (60*60);
  };
});

