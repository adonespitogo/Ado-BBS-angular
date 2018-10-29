window.adopisowifi.directive('requireVersion', [
  'SemverCompare',
  function (SemverCompare) {

    return {
      restrict: 'A',
      transclude: true,
      scope: {
        requireVersion: '<',
        currentVersion: '<'
      },
      template: '<ng-transclude ng-if="version_met" />',
      link: function ($scope, elem, attrs) {

        console.log(attrs);

        function run (requireVersion, currentVersion) {
          if (!requireVersion || !currentVersion) return;

          var version_met = SemverCompare(currentVersion, requireVersion) >= 0;
          $scope.version_met = version_met;

          if (version_met)
            return elem.css({display: 'block'});
          else
            return elem.html('<p class="text-danger">This feature requires at least software version ' + $scope.requireVersion + '. Please update your machine.</p>');
        }

        $scope.$watch('requireVersion', function () {
          run($scope.requireVersion, $scope.currentVersion);
        });
        $scope.$watch('currentVersion', function () {
          run($scope.requireVersion, $scope.currentVersion);
        });

      }
    };

  }
]);
