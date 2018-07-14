'use strict';

var app = angular.module('ticketsystem.readTicket', ['ngRoute', 'ui.bootstrap']);
app.controller('ReadTicketCtrl', function ($scope, $state, restService, httpService, util, storageService) {

    $scope.edit = [];
    $scope.editTicket = {};

    /**
     * @ngdoc           function
     * @name            readTicket
     * @description     Function reads all the tickets in the database via an HTTP GET and shows them in a table.
     */
    $scope.readTicket = function () {
        //  HTTP GET
        httpService.get(restService.readMyTickets + '/' + JSON.parse(localStorage.getItem('userInformation')).id)
            .then(function (response) {
                $scope.items = response.data;
            }, function error(response) {
                $scope.errorResponse = "Error Status: " + response.statusText;
            });
    };


    /**
     * @ngdoc               function
     * @name                findAction
     * @description         Function to find the action necessary to send the ticket in the specified state.
     *
     * @param stateName     state of which find the action
     * @param ticket        the ticket
     * @returns {*}
     */
    var findAction = function (stateName, ticket) {
        for (let i = 0; i < ticket.stateInformation[2].length; i++) {
            if (ticket.stateInformation[2][i] === stateName) {
                return ticket.stateInformation[0][i];
            }
        }

        return null;
    };

    /**
     * @ngdoc               function
     * @name                saveTicket
     * @description         Function saves a modified ticket via an HTTP PUT in the database and updates the view of the table.
     *                      When a ticket is edited, then it changes its current state, accordint to the reference state machine
     *
     *  @param item         selected item
     *  @param index        iterator offset
     */
    $scope.saveTicket = function (ticket, index) {

        httpService.get(restService.getTeamCoordinator)
            .then(function (response) {
                console.log("il team coordinator è " + response.data.name);

                //  Required ticket fields
                let payload = {
                    id: ticket.id,
                    timestamp: ticket.timestamp,
                    title: ticket.title,
                    description: ticket.description,
                    sourceType: ticket.sourceType,
                    presumedType: ticket.presumedType,
                    actualType: ticket.actualType,
                    attachedFile: ticket.attachedFile,
                    mediaType: ticket.mediaType,
                    openerUser: ticket.openerUser,
                    target: ticket.target,
                    customerPriority: ticket.customerPriority,
                    actualPriority: ticket.actualPriority,
                    visibility: ticket.visibility,
                    difficulty: ticket.difficulty,
                    ticketComments: ticket.ticketComments,
                    //state:ticket.state,
                    tags: ticket.tags
                };

                //  HTTP PUT
                httpService.put(restService.createTicket, ticket.id, payload)
                    .then(function (succResponse) {
                            //console.log("STO DENTRO ALLA PUT");
                            let action = findAction("VALIDATION", ticket);
                            if (action == null) {
                                action = findAction("DISPATCHING", ticket);
                            }

                            //  change the ticket state
                            httpService.post(restService.changeTicketState + '/' + ticket.id + '/' + action + '/' + response.data.id)
                                .then(function (response) {
                                        //console.log("Modify SUCCESS");
                                        $scope.items[index] = angular.copy(ticket);
                                        $scope.editTicket = {};
                                        $scope.edit = resetIndexes($scope.edit);
                                        $scope.readTicket();
                                    },
                                    function err(response) {
                                        console.log(response)
                                    });
                        },
                        function (errReponse) {
                            console.log(errReponse)
                        }
                    );

            }, function err(response) {
            });
    };

    /**
     *
     * @ngdoc               function
     * @name                closeTicket
     * @description         Function used to send the ticket in the CLOSED state
     *
     * @param ticket        ticket
     */
    $scope.closeTicket = function (ticket) {

        let action = findAction("CLOSED", ticket);

        var temp = "0";
        httpService.post(restService.changeTicketState + '/' + ticket.id + '/' + action + '/' + temp)
            .then(function (data) {
                    $state.reload();
                },
                function (err) {
                    console.log(err);
                })
    };

    /**
     * @ngdoc               function
     * @name                rejectResolvedTicket
     * @description         Function used to send the ticket in the REOPENED state
     *
     * @param ticket        ticket
     */
    $scope.rejectResolvedTicket = function (ticket) {

        let action = findAction("REOPENED", ticket);

        // Reopened state is always managed by the Team Coordinator

        httpService.get(restService.getTeamCoordinator)
            .then(function (data) {
                    console.log(data);
                    httpService.post(restService.changeTicketState + '/' + ticket.id + '/' + action + '/' + data.data.id)
                        .then(function (secondData) {
                                $state.reload();
                            },
                            function (err) {
                                console.log(err);
                            });
                },
                function (err) {

                });
    };

    /**
     * @ngdoc           function
     * @name            modifyTicket
     * @description     Function used for saving an edited ticket.
     *
     * @param item     selected item
     * @param index    iterator offset
     */
    $scope.modifyTicket = function (item, index) {
        $scope.edit = resetIndexes($scope.edit);
        $scope.editTicket = angular.copy(item);
        $scope.edit[index] = true;
        $scope.index = index;
    };

    /**
     * @ngdoc           function
     * @name            resetTicket
     * @description     Function used for aborting a ticket editing.
     *
     * @param index     iterator offset
     */
    $scope.resetTicket = function (index) {
        $scope.editTicket = {};
        $scope.edit[index] = false;
    };

    /**
     * @ngdoc           function
     * @name            showImage
     * @description     Function used for downloading the saved image os the ticket.
     *
     * @param item      selected item
     * @param index     iterator offset
     */
    $scope.showImage = function (item, index) {
        util.postBase64(item).then(result => {
            // Append the <a/> tag and remove it after automatic click for the download
            document.body.appendChild(result);
            result.click();
            document.body.removeChild(result);
        })
    }
});

/**
 * @ngdoc                   function
 * @name                    resetIndexes
 * @description             Function resets the index used for the 'Modify' function.
 *
 * @param arrayOfIndexes    items' indexes
 * @returns {*}             reset items' indexes
 */
function resetIndexes(arrayOfIndexes) {

    angular.forEach(arrayOfIndexes, function (value, key) {
        arrayOfIndexes[key] = false;
    });

    return arrayOfIndexes;
}
