'use strict';

angular.module('ticketsystem.assignTeam', ['ngRoute'])

    .controller('AssignTeamCtrl', function ($scope, restService, httpService, util, $location, teams) {
        //  Select values
        $scope.teams = teams;

        //  Variables
        $scope.items = [];

        /**
         *  Function reads all the tickets in the database via an HTTP GET and shows them in a table.
         */
        $scope.readUnassignedTicket = function () {
            //  HTTP GET
            httpService.get(restService.unassignedTickets)
                .then(function (response) {
                    console.log("YEH")
                    $scope.items = response.data;
                }, function error(response) {
                    console.log("MEH")
                    $scope.errorResponse = "Error Status: " + response.statusText;
                });
        };

        /**
         *  Function saves a modified ticket via an HTTP PUT in the database and updates the view of the table.
         *  @param item     selected item
         *  @param index    iterator offset
         */
        $scope.saveTicketWithTeam = function(ticket){

            //  Required ticket fields with 'state' changed
            let payload = {
                id: ticket.id,
                timestamp: null,
                title: ticket.title,
                description: ticket.description,
                sourceType: ticket.sourceType,
                presumedType: ticket.presumedType,
                actualType: null,
                attachedFile: null,
                mediaType: null,
                resolverUser: null,
                openerUser: null,
                target: null,
                customerPriority: null,
                actualPriority: null,
                visibility: null,
                relationships: {},
                difficulty: null,
                eventRegister: [],
                ticketComments: [],
                state: "READY"
            }

            //  HTTP PUT
            httpService.put(restService.createTicket, ticket.id, payload)
                .then(function(succResponse){
                        $scope.readUnassignedTicket();
                    },
                    function(errReponse){
                        console.log(errReponse)
                    }
                )
        };

    });

