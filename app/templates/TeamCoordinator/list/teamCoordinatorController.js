'use strict';

angular.module('ticketsystem.assignTeam', ['ngRoute'])

    .controller('AssignTeamCtrl', function ($scope, restService, httpService, util, $location, teams, priorities) {

        //  Select values
        $scope.teams = teams;
        $scope.priorities = priorities;

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

        /**
         *  Function saves a modified ticket via an HTTP PUT in the database and it
         *  assigns the ticket to a Team Leader.
         *  @param item     selected item
         *  @param index    iterator offset
         */
        $scope.saveTicketWithTeam = function (ticket, team, actualPriority) {
            console.log(ticket);
            ticket.actualPriority = actualPriority.name;

            //  HTTP PUT
            httpService.put(restService.createTicket, ticket.id, ticket)
                .then(function (succResponse) {
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
                    },
                    function (errReponse) {
                        console.log(errReponse)
                    }
                )
        };

    });