angular.module('ticketsystem.sidebar', [])

    .controller('SidebarCtrl', function ($location, $scope, menu, storageService) {
        $scope.menu = menu;

        $scope.logout = function () {
            storageService.save("userData", JSON.stringify(null));
            $location.url("/home");
        };

    });