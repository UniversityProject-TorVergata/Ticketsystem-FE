'use strict';

angular.module('ticketsystem.teamLeader', ['ngRoute'])

    .controller('TeamLeaderCtrl', function ($scope, restService, httpService,$location) {

        $scope.teamMembersList = [];
        $scope.items = [];
        $scope.teamCoordinator = {}


        var prepareData = function () {
                //  HTTP GET
            httpService.get(restService.getTeamMembersByTeamLeader + '/' + JSON.parse(localStorage.getItem('userInformation')).id)
                .then(function (response) {
                    $scope.teamMembersList = response.data;
                }), function error(response) {

            };

            httpService.get(restService.getTeamCoordinator)
                .then(function (response) {
                    $scope.teamCoordinator = response.data;
                }), function error (response) {

            };


            httpService.get(restService.readMyAssignedTickets + '/' + JSON.parse(localStorage.getItem('userInformation')).id)
                .then(function (response) {
                    $scope.items = response.data;
                    }, function error(response) {
                });
        };

        prepareData();
    });