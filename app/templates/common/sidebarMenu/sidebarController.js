angular.module('ticketsystem.sidebar', [])

    .controller('SidebarCtrl', function ($location, $scope, menu) {
        $scope.menu = menu;
    })