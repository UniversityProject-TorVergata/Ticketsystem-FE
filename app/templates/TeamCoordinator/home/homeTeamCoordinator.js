'use strict';

angular.module('ticketsystem.homeTeamCoordinator', ['ngRoute'])

    .controller('homeTeamCoordinatorCtrl', function ($scope, restService, httpService,$location,storageService) {

        $scope.assignTickets = function () {
            $location.url("/assignTicket");
        };

        $scope.createTeam = function () {
            $location.url("/createTeam");
        };

        $scope.readTeam = function () {
            $location.url("/readTeam");
        };

        $scope.logout = function () {
            storageService.save("userData",JSON.stringify(null));
            $location.url("/home");
        };

    });