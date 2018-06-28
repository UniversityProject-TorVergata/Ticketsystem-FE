'use strict';

// TODO .then e err senza nulal dentro...
var app = angular.module('ticketsystem.readTicket', ['ngRoute', 'ui.bootstrap']);
app.controller('ReadTicketCtrl', function ($scope, $state, restService, httpService, util, storageService) {

    $scope.edit = [];
    $scope.editTicket = {};

    /**
     *  Function reads all the tickets in the database via an HTTP GET and shows them in a table.
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

    var findAction = function(stateName, ticket) {
        for (let i = 0; i < ticket.stateInformation[2].length; i++) {
            if (ticket.stateInformation[2][i] == stateName) {
                return ticket.stateInformation[0][i];
            }
        }

        return response;
    };

    /**
     *  Function saves a modified ticket via an HTTP PUT in the database and updates the view of the table.
     *  @param item     selected item
     *  @param index    iterator offset
     */
    $scope.saveTicket = function(ticket,index){

        console.log("STO DENTRO SAVE TICKET");

        httpService.get(restService.getTeamCoordinator)
            .then(function(response) {
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
                httpService.put(restService.createTicket,ticket.id, payload)
                    .then( function(succResponse){
                            console.log("STO DENTRO ALLA PUT");
                            httpService.post(restService.changeTicketState + '/' + ticket.id + '/' + findAction("VALIDATION", ticket) + '/' + response.data.id)
                                .then(function(response) {
                                    console.log("Modify SUCCESS");
                                    $scope.items[index] = angular.copy(ticket);
                                    $scope.editTicket={};
                                    $scope.edit = resetIndexes($scope.edit);
                                    $scope.readTicket();
                                }, function err(response){});

                        },
                        function(errReponse){
                            console.log(errReponse)
                        }
                    );


            }, function err(response) {});



    };

    $scope.closeTicket = function (ticket) {
        let action = findAction("CLOSED", ticket);

        var temp = "0";
        httpService.post(restService.changeTicketState + '/' + ticket.id + '/' + action + '/' + temp)
            .then(function (data) {
                //TODO Reset
                    $state.reload();
                },
                function (err) {

                })
    };

    $scope.rejectResolvedTicket = function (ticket) {
      let action = findAction("REOPENED", ticket);

      //LO DO AL TEAMCOORDINATOR

      httpService.get(restService.getTeamCoordinator)
          .then(function (data) {
              console.log(data);
              httpService.post(restService.changeTicketState + '/' + ticket.id + '/' + action + '/' + data.data.id)
                  .then(function (secondData) {
                          //TODO Reset
                          $state.reload();
                      },
                      function (err) {

                      });

          },
              function (err) {

          });
    };

    /**
     *  Function used for saving an edited ticket.
     *  @param item     selected item
     *  @param index    iterator offset
     */
    $scope.modifyTicket = function (item, index) {
        $scope.edit = resetIndexes($scope.edit);
        $scope.editTicket = angular.copy(item);
        $scope.edit[index] = true;
        $scope.index=index;
    };

    /**
     *  Function used for aborting a ticket editing.
     *  @param index   iterator offset
     */
    $scope.resetTicket = function (index) {
        $scope.editTicket = {}
        $scope.edit[index] = false;
    }

    /**
     *  Function used for downloading the saved image os the ticket.
     *  @param item     selected item
     *  @param index    iterator offset
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
 *  Function resets the index used for the 'Modify' function.
 *  @param arrayOfIndexes   items' indexes
 *  @returns {*}   reset items' indexes
 */
function resetIndexes(arrayOfIndexes) {
    angular.forEach(arrayOfIndexes, function (value, key) {
        arrayOfIndexes[key] = false;
    })
    return arrayOfIndexes;
};
