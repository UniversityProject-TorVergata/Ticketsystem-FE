'use strict';

angular.module('ticketsystem.readAssignedTicket', ['ngRoute'])

    .controller('readAssignedTicketCtrl', function ($scope, restService, httpService, util, $location, priorities) {

        $scope.priorities = priorities;

        /**
         *  Function reads all the READY tickets in the database via an HTTP GET and
         *  shows them in a table.
         */
        $scope.readAssignedTicket = function () {
            //  HTTP GET
            httpService.get(restService.executionTickets)
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