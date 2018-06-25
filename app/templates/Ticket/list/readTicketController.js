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
                for (let i = 0; i < $scope.items.length; i++) {

                        // Actual state in the FSM
                    $scope.items[i].state = $scope.items[i].stateMachine.currentState;
                }
            }, function error(response) {
                $scope.errorResponse = "Error Status: " + response.statusText;
            });
    };

    let findAction = function (string, ticket) {
        //  Trovo l'azione che corrisponde allo stato DISCARDED
        let action = "";
        let allStates = ticket.stateMachine.allStates;
        for (let i = 0; i < Object.keys(allStates).length; i++) {
            if (allStates[i].currentState === ticket.stateMachine.currentState) {
                for (let j = 0; j < Object.keys(allStates[i].newTransitionMap).length; j++) {
                    action = "Action" + (j+1).toString();
                    if (allStates[i].newTransitionMap[action].nextState == string) {
                        break;
                    }
                }
            }
        }
        return action;
    };

    $scope.closeTicket = function (ticket) {
        let action = findAction("CLOSED", ticket);

        //  imposto come resolverUser lo stesso che ha mandato indietro il ticket, ovvero
        //  il TeamCoordinato
        httpService.post(restService.changeTicketState + '/' + ticket.id + '/' + action + '/' + ticket.resolverUser.id)
            .then(function (data) {
                //TODO Reset
                    $state.reload();
                },
                function (err) {

                })
    };

    $scope.rejectResolvedTicket = function (ticket) {
      let action = findAction("PENDING", ticket);

      httpService.get(restService.getTeamLeaderByTeamID + '/' + ticket.resolverUser.team.id)
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
     *  Function deletes a selected ticket via an HTTP DELETE and updates the view of the table.
     *  @param id   id number of the ticket to be deleted.
     */
    $scope.deleteTicket = function (ticket) {

        let action = findAction("DISCARDED", ticket);

        //  imposto come resolverUser lo stesso che ha mandato indietro il ticket, ovvero
        //  il TeamCoordinato
        httpService.post(restService.changeTicketState + '/' + ticket.id + '/' + action + '/' + ticket.resolverUser.id)
            .then(function (data) {
                    //TODO Reset
                    $state.reload();
                },
                function (err) {

                })
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
