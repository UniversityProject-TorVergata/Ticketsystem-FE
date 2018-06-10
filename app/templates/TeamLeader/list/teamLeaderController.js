'use strict';

angular.module('ticketsystem.teamLeader', ['ngRoute'])

    .controller('TeamLeaderCtrl', function ($scope, restService, httpService, util, $location, teams, priorities) {

        //  Select values
        $scope.teams = teams;
        $scope.priorities = priorities;

        /**
         *  Function reads all the READY tickets in the database via an HTTP GET and
         *  shows them in a table.
         */
        $scope.readTicketToWork = function () {
            //  HTTP GET
            httpService.get(restService.readyTickets)
                .then(function (response) {
                    $scope.items = response.data;
                }, function error(response) {
                    $scope.errorResponse = "Error Status: " + response.statusText;
                });
        };

        /**
         *  Function saves a modified ticket via an HTTP PUT in the database and it
         *  assigns the ticket to a Team Leader.
         *  @param item     selected item
         *  @param index    iterator offset
         */

    });