'use strict';

angular.module('ticketsystem.assignTeam', ['ngRoute'])

    .controller('AssignTeamCtrl', function ($scope, $state, restService, storageService, httpService, util, $location, teams, priorities) {

        //  Select values
        $scope.teams = teams;
        $scope.priorities = priorities;
        //$scope.newComment = {};
        $scope.categories = [];
        $scope.refresh = false;

        /**
         *  Function reads all the PENDING tickets in the database via an HTTP GET and
         *  shows them in a table.
         */
        $scope.readUnassignedTicket = function () {
            //  HTTP GET
            //TODO non deve vedere i ticket NEW! Usato solo per test ora
            var categories =[];
            var tickets = {};
            httpService.get(restService.validationTickets)
                .then(function (response) {
                    $scope.items = response.data;
                    tickets = $scope.items;


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
            //console.log(ticket);
            ticket.actualPriority = actualPriority.name;
            ticket.resolverUser = team.id;
            console.log(ticket.actualType);

            //  trovo i possibili futuri stati in cerca di PENDING
            let action = "";
            let allStates = ticket.stateMachine.allStates;
            for (let i = 0; i < Object.keys(allStates).length; i++) {
                if (allStates[i].currentState === ticket.stateMachine.currentState) {
                    for (let j = 0; j < Object.keys(allStates[i].newTransitionMap).length; j++) {
                        action = "Action" + (j+1).toString();
                        if (allStates[i].newTransitionMap[action].nextState == "PENDING") {
                            break;
                        }
                    }
                }
            }

            //  imposto come resolverUser il TeamLeader a cui verrà assegnato il ticket
            httpService.post(restService.changeTicketState + '/' + ticket.id + '/' + action + '/' +
                team.id+'/'+ticket.actualPriority+'/'+ticket.actualType)
                .then(function (data) {

                    },
                    function (err) {

                    });

            $state.reload();
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