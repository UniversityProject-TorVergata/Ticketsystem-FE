//  custom-changes.directive.js
/**
 *  @ngdoc module
 *  @name  ticketsystem.directives
 *  @description The module manages the directives.
 *  conversion of the image.
 */
angular.module('ticketsystem.directives', [])

    /**
     *  @ngdoc directive
     *  @module  ticketsystem.directives
     *  @name customOnChange
     *  @description The directive is used for creating links for base 64
     */
    .directive('customOnChange', function() {
    return {
        restrict: 'A',

        /**
         *  @ngdoc directive
         *  @module  ticketsystem.directives
         *  @name link
         *  @param scope       controller scope
         *  @param element     selected element
         *  @param attrs       attributes that changed
         */
        link: function (scope, element, attrs) {
            var onChangeHandler = scope.$eval(attrs.customOnChange);
            element.on('change', onChangeHandler);
            element.on('$destroy', function() {
                element.off();
            });

        }
    };
});