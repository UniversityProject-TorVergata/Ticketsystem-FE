'use strict';

angular.module('ticketsystem.teamLeader', ['ngRoute'])

    .controller('TeamLeaderCtrl', function ($scope, restService, httpService) {

        $scope.teamMembersList = [];
        $scope.items = [];

        $scope.prepareData = function () {
            /**
             *  Function reads all the READY tickets in the database via an HTTP GET and
             *  shows them in a table.
             */
                //  HTTP GET
            httpService.get(restService.getTeamMembersByTeamLeader + '/' + JSON.parse(localStorage.getItem('userInformation')).id)
                .then(function (response) {
                    $scope.teamMembersList = response.data;
                    console.log($scope.teamMembersList);
                }), function error(response) {

            };


            httpService.get(restService.readMyAssignedTickets + '/' + JSON.parse(localStorage.getItem('userInformation')).id)
                .then(function (response) {
                    $scope.items = response.data;
                    }, function error(response) {
                });




            /**
             *  Function saves a modified ticket via an HTTP PUT in the database and it
             *  assigns the ticket to a Team Leader.
             *  @param item     selected item
             *  @param index    iterator offset
             */

        }
    });