(function () {
  'use strict';

  var compareTo = function() {
    return {
      require: "ngModel",
      scope: {
        otherModelValue: "=compareTo",
        if: "="
      },
      link: function(scope, element, attributes, ngModel) {

        ngModel.$validators.compareTo = function(modelValue) {
          var iif = typeof attributes.if === 'string'? scope.if : true;
          var isNotEqual = typeof attributes.notEqual === 'string';
          var valueIsEqual = modelValue === scope.otherModelValue;
          var returnValue = (isNotEqual? !valueIsEqual : valueIsEqual);
          return iif? returnValue : true;
        };

        scope.$watch("otherModelValue", function() {
          ngModel.$validate();
        });

        scope.$watch("if", function() {
          ngModel.$validate();
        });
      }
    };
  };

  window.adopisowifi.directive("compareTo", compareTo);

})();
