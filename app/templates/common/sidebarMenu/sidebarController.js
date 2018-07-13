/**
 *  The module sets the menu on the basis of the logged user.
 */
angular.module('ticketsystem.sidebar', [])

    .controller('SidebarCtrl', function ($state, $scope, menu, storageService) {

        //User tabs
        $scope.menu = menu;

        /**
         * @ngdoc           function
         * @name            logout
         * @description     This function deletes user data from the session.
         */
        $scope.logout = function () {
            storageService.invalidateUser();
            $state.go("Login");
        };
    });