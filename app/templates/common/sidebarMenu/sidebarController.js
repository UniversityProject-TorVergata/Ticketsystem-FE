/**
 *  The module sets the menu on the basis of the logged user.
 */
angular.module('ticketsystem.sidebar', [])

    .controller('SidebarCtrl', function ($state, $scope, menu, storageService) {
        $scope.menu = menu;

        // TODO spostare in utils?
        $scope.logout = function () {
            storageService.invalidateUser();
            $state.go("Login");
        };
    });