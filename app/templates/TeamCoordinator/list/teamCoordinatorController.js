'use strict';

angular.module('ticketsystem.assignTeam', ['ngRoute'])

    .controller('AssignTeamCtrl', function ($scope, $route, restService, storageService, httpService, util, $location, teams, priorities) {

        //  Select values
        $scope.teams = teams;
        $scope.priorities = priorities;
        $scope.newComment = {};
        $scope.refresh = false;



        /**
         *  Function reads all the PENDING tickets in the database via an HTTP GET and
         *  shows them in a table.
         */
        $scope.readUnassignedTicket = function () {
            //  HTTP GET
            //TODO non deve vedere i ticket NEW! Usato solo per test ora
            httpService.get(restService.newTickets)
                .then(function (response) {
                    $scope.items = response.data;
                }, function error(response) {
                    $scope.errorResponse = "Error Status: " + response.statusText;
                });
        };

        $scope.sendNewTicketComment = function (ticketID, msg) {
            msg['eventGenerator'] = JSON.parse(storageService.get("userData"));
            httpService.post(restService.insertComment + '/' + ticketID, msg)
                .then(function (data) {
                    //$route.reload();
                },
                    function (err) {
                    window.alert("Error!")
                    })
        };


        /*
        httpService.post(restService.createTicket, $scope.ticket)
                .then(function (data) {
                        window.alert("Ticket created");
                        console.log(data);
                        $location.path('/homeCustomer')
                    },
                    function (err) {
                        window.alert("Error!")
                        $scope.errorMessage = "error!"
                    })
         */


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

        $scope.showImage = function (item, index) {
            util.postBase64(item).then(result => {
                // Append the <a/> tag and remove it after automatic click for the download
                document.body.appendChild(result);
                result.click();
                document.body.removeChild(result);
            })

        }

    });