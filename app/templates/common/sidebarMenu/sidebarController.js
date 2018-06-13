angular.module('ticketsystem.sidebar', [])

    .controller('SidebarCtrl', function ($state, $scope, menu, storageService) {
        $scope.menu = menu;

        $scope.logout = function () {
            storageService.save("userData", JSON.stringify(null));
            $state.go("Login");
        };

    });