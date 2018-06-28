'use strict';

angular.module('dashboard', [])
    .controller('dashboardController', function ($scope, $window, $state, $modal, $log, restService, storageService, httpService, util) {

      //Contiene tutti i ticket assegnati al ruolo
      $scope.myTickets = [];
      //un booleano che mi dice se non ci sono ticket assegnati con il target selectedTarget
      $scope.empty = false;  //nell'html quando è true visualizzo "non ci sono ticket relativi a questo target" con ng-change forse

      //Racchiude i nomi del current state e dei futuri stati in cui un ticket può andare
      //Nella posizione 0 c'è il current state, nei successivi ci sono gli stati futuri
      $scope.states = [];  //devo metterli in modo che posso fare come nella select, cioè scorrerli come t in states per creare le colonne
      $scope.currentState = "";
      $scope.nextState = "";

      $scope.toChange = {};

      //Mostro i ticket solamente di un target alla volta.
      //Questo campo viene riempito dalla select
      $scope.selectedTarget = {}; //nell'html con ng-if visualizzo solo i ticket che hanno target == selectedTarget.name
      $scope.targets = [];  //li tengo nello scope perchè così non eseguo sempre chiamate al BE


        /**
         * This function finds the "action" and the "resolverUser" in "states" array
         * using the name of the next state.
         * @param nextState:    string to identify the next state
         * @return response:    [0]-> action
         *                      [1]-> resolverUser
         */
      var findActionAndResolverUser = function(nextState) {
          var state = [];

          var temp = $scope.states[2];

            for (let i = 0; i < temp.length; i++) {
                if (temp[i] == nextState) {
                    state.push($scope.states[0][i]);
                    state.push($scope.states[1][i]);
                    break;
                }
            }
            return state;
      };

      var getAllTargets = function () {
          //  prendo il primo target e visualizzo i ticket di questo target appena apro la view.
          //  poi si potrà cambiare tramite una select
          httpService.get(restService.readTargets)
              .then(function (response) {
                  $scope.targets = response.data;
                  $scope.selectedTarget = response.data[0]; //ce ne deve stare almeno 1, altrimenti nessun ticket potrebbe essere immesso nel sistema
              }, function error(response){});
      };


      $scope.prepareDashboard = function () {

          $scope.myTickets = [];
          $scope.states = [];
          $scope.currentState = "";
          $scope.toChange = {};

        //rifaccio sempre la chiamata perchè potrebbero arrivare nuovi ticket in qualsiasi momento
        httpService.get(restService.readMyAssignedTickets + '/' + JSON.parse(localStorage.getItem('userInformation')).id)
            .then(function (response) {
                //I ticket REOPENED vengono gestiti in un altra view sempre dal teamCoordinator
                for (let i = 0; i < response.data.length; i++) {
                    if(response.data[i].currentState != 'REOPENED' && response.data[i].customerState == false) {
                        $scope.myTickets.push(response.data[i]);
                    }
                }

              //se ci sono ticket assegnati con target == selectedTarget, allora mi salvo i loro possibili stati futuri
              //me ne basta trovarne uno per vedere i prossimi stati di tutti quelli con lo stesso target e creare le colonne

              if ($scope.myTickets.length > 0) {
                  for (let i = 0; i < $scope.myTickets.length; i++) {
                      if ($scope.myTickets[i].target.name == $scope.selectedTarget.name) {
                            $scope.states = $scope.myTickets[i].stateInformation;
                            $scope.currentState = $scope.myTickets[i].currentState;
                            break; //mi fermo subito
                      }
                  }

                  /*    questo controllo lo faccio perchè, se ho 0 ticket per il targetX ma uno del targetY,
                        ugualmente avrò dei ticket assegnati a me, ma non saranno relativi al target selezionato.
                        Quindi al fine di selezionare solo i ticket che voglio vedere, eseguo il controllo,
                        perchè stats[2] sarà undefined solo se ho ticket assegnati a me di un target non selezionato al momento.
                   */
                  if ($scope.states[2] != undefined) {
                      for (let i = 0; i < $scope.states[2].length; i++) {
                          httpService.get(restService.findTicketByState + '/' + $scope.states[2][i])
                              .then(function (data) {
                                  for (let j = 0; j < data.data.length; j++) {
                                      if (data.data[j].target.name == $scope.selectedTarget.name) {
                                          $scope.myTickets.push(data.data[j]);
                                      }
                                  }
                              }, function err(data) {});
                      }
                  }
              } else {
                  $scope.empty = true;
              }
            }, function error(response) {});
      };

        //funzione richiamata quando si droppa un ticket
        $scope.changeTicketState = function(event, ui, data) {
            $scope.nextState = data.nextState;
            var temp = findActionAndResolverUser(data.nextState);
            $scope.viewChangeStateModal(data.nextState, temp[0], temp[1], $scope.toChange);
        };

        //funzione richiamata appena si comincia a draggare un ticket
        $scope.setTicketToChange = function(event, ui, data) {
            $scope.toChange = data.ticket;
        };


      $scope.showImage = function (item, index) {
        util.postBase64(item).then(result => {
          // Append the <a/> tag and remove it after automatic click for the download
          document.body.appendChild(result);
          result.click();
          document.body.removeChild(result);
        })
      }



      $scope.viewChangeStateModal = function (nextStateName, stateAction, stateRole, ticket) {

            var modalInstance;

            modalInstance = $modal.open({
                templateUrl: '/modal/modal-change-state.html',
                controller: AssignmentModalCtrl,
                scope: $scope,
                backdrop: 'static',
                resolve: {
                    getState: function() {
                        return nextStateName;
                    },
                    getAction: function() {
                        return stateAction;
                    },
                    getRole: function() {
                        return stateRole;
                    },
                    getTicket: function() {
                        return ticket;
                    }
                }
            });

            modalInstance.result.then(function (response) {
                //response == "assigned"
                $scope.toChange = {};
                $scope.nextState = "";
                $scope.myTickets = [];
                $scope.prepareDashboard();

            }, function (response) {
                //response.data == "cancel"
                $scope.toChange = {};
                $scope.nextState = "";
                $scope.myTickets = [];
                $scope.prepareDashboard();

            });
        };

        ///////////////////////////
        //Inizializzo la dashboard
        getAllTargets();
        $scope.prepareDashboard();

    });

var AssignmentModalCtrl = function ($scope, $modalInstance, getState, getAction, getRole, getTicket, restService, httpService) {

    $scope.membersList = [];

    //TODO recuperarli tramite mock!
    $scope.priorityList = [{"id": "1", "name":"LOW"},{"id": "2", "name":"AVERAGE"},{"id": "3", "name":"HIGH"}];
    $scope.difficultyList = [{"id": "1", "name":"LOW"},{"id": "2", "name":"MEDIUM"},{"id": "3", "name":"HIGH"}];

    $scope.cancelAssignment = function () {
        $modalInstance.dismiss('cancel');
    };

    $scope.continueAssignment = function () {

        //TODO da implementare tutti e due altrimenti non si può settare la priorità e la difficolta
        //if ($scope.difficultyList.selected != undefined)
        //    changeTicketDifficulty($scope.difficultyList.selected, getTicket);
        //if ($scope.priorityList.selected != undefined)
        //    setInternalPriority();

        //se il ticket viene rimandato al customer, metto a 0 il resolverUser
        let resolverID = "0";
        if ($scope.membersList.length > 0) {
            resolverID = $scope.membersList.selected.id;
        }

        httpService.post(restService.changeTicketState + '/' + getTicket.id + '/' + getAction + '/' + resolverID)
            .then(function () {
                $modalInstance.close('assigned')
            }, function err() {
                $modalInstance.close('error')
            });

    };

    /**
     * This function finds all the internal Users to which the ticket can be assigned
     * @param role              the name of the role (i.e. 'TeamMember')
     * @returns {Array}         all members found
     */
    $scope.searchResolverUsers = function() {

        if (getRole != "Customer") {
            httpService.get(restService.getUserByRole + '/' + getRole)
                .then(function (response) {
                    $scope.membersList = response.data;
                }, function err(response) {

                });
        } else {
            return [];
        }
    };

    $scope.searchResolverUsers();
};
