'use strict';

angular.module('ticketsystem.assignTeam', ['ngRoute'])

    .controller('AssignTeamCtrl', function ($scope, restService, httpService, util, $location, teams) {

        //  Select values
        $scope.teams = teams;

        //  Variables
        $scope.items = [];

        /**
         *  Function reads all the PENDING tickets in the database via an HTTP GET and
         *  shows them in a table.
         */
        $scope.readUnassignedTicket = function () {
            //  HTTP GET
            httpService.get(restService.pendingTickets)
                .then(function (response) {
                    $scope.items = response.data;
                }, function error(response) {
                    $scope.errorResponse = "Error Status: " + response.statusText;
                });
        };

        /** TODO cambiare
         *  Function saves a modified ticket via an HTTP PUT in the database and updates the view of the table.
         *  @param item     selected item
         *  @param index    iterator offset
         */
        $scope.saveTicketWithTeam = function(ticket, team){

            //  HTTP PUT
            httpService.put(restService.assignTicket, ticket.id+"/"+team.id)
                .then(function(succResponse){
                        $scope.readUnassignedTicket();
                        window.alert("Ticket assigned to " + team.username)
                    },
                    function(errReponse){
                        console.log(errReponse)
                    }
                )

        };

    });

