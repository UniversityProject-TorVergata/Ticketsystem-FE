'use strict';

angular.module('ticketsystem.homeTeamCoordinator', ['ngRoute'])

    .controller('homeTeamCoordinatorCtrl', function ($scope, restService, httpService,$location,storageService) {

        $scope.assignTicket = function () {
            $location.url("/assignTicket");
        }

        $scope.logout = function () {
            storageService.save("userData",JSON.stringify(null));
            $location.url("/home");
        };

    });