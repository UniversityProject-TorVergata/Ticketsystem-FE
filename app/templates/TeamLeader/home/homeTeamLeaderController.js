'use strict';

angular.module('ticketsystem.homeTeamLeader', ['ngRoute'])

    .controller('homeTeamLeaderCtrl', function ($scope, restService, httpService, $location, storageService) {

        $scope.assigneTickets = function () {
            $location.url("/assignedTicket");
        };

        $scope.viewAccount = function () {
            $location.url("/accountTeamLeader");
        }

        $scope.logout = function () {
            storageService.save("userData",JSON.stringify(null));
            $location.url("/home");
        };

    });