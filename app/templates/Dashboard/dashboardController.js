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

      $scope.nextState = {};

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

      var getAllTargets  = function () {
          //  prendo tutti i target e ne seleziono il primo e per questo prendo i possibili stati in cui si può trovare un ticket dato il ruolo dell'utente loggato
          // e i relativi stati ,transizioni e destinatari successivi.

          httpService.get(restService.readTargets)
              .then(function (response) {
                  var role = JSON.parse(localStorage.getItem('userInformation'))['@type'];
                  $scope.targets = response.data;
                  $scope.selectedTarget = response.data[0]; //ce ne deve stare almeno 1, altrimenti nessun ticket potrebbe essere immesso nel sistema
                  httpService.get(restService.readTargets+"/getActualStates/"+$scope.selectedTarget.id+"/"+role)
                      .then(function (response) {
                          $scope.actualStates = response.data;
                          $scope.currentState = $scope.actualStates[0];
                          httpService.get(restService.readTargets+"/getNextStates/"+$scope.selectedTarget.id+"/"+ $scope.currentState)
                              .then(function (response) {
                                  $scope.states = response.data; //ce ne deve stare almeno 1, altrimenti nessun ticket potrebbe essere immesso nel sistema
                                  prepare();


                              }, function error(response){});
                          //ce ne deve stare almeno 1, altrimenti nessun ticket potrebbe essere immesso nel sistema
                      }, function error(response){});


              }, function error(response){});
      };

        ///////////////////////////
        // Inizializzo la dashboard
        getAllTargets();


      //Aggiorno la dashboard quando viene selezionato un nuovo stato corrente aggiungendo stati,transizioni e destinatari successivi.
        //Infine aggiorno la dashboard
      $scope.updateCurrentState = function(newState){
          httpService.get(restService.readTargets+"/getNextStates/"+$scope.selectedTarget.id+"/"+ newState)
              .then(function (response) {
                  $scope.states = response.data;
                  //Aggiorno la dashboard
                  prepare();


              }, function error(response){});
      }

      //Quando viene cambiato il target selezionato dalla select  cerco gli stati correnti per quel target
        //seleziono uno stato corrente e per quello mi cerco tutti gli stati,transizioni e destinatari successivi
        //Infine aggiorno la dashboard
      $scope.updateTarget = function(){
          var role = JSON.parse(localStorage.getItem('userInformation'))['@type'];
          httpService.get(restService.readTargets+"/getActualStates/"+$scope.selectedTarget.id+"/"+role)
              .then(function (response) {
                  $scope.actualStates = response.data;
                  $scope.currentState = $scope.actualStates[0];
                  httpService.get(restService.readTargets+"/getNextStates/"+$scope.selectedTarget.id+"/"+ $scope.currentState)
                      .then(function (response) {
                          $scope.states = response.data;
                          //Aggiorno la dashboard
                          prepare();


                      }, function error(response){});

              }, function error(response){});
      };


      var prepare = $scope.prepareDashboard = function () {
          //console.log("PREPARO")

          $scope.myTickets = [];
          //$scope.states = [];

          $scope.toChange = {};

        //rifaccio sempre la chiamata perchè potrebbero arrivare nuovi ticket in qualsiasi momento
        httpService.get(restService.readMyAssignedTickets + '/' + JSON.parse(localStorage.getItem('userInformation')).id)
            .then(function (response) {
                //I ticket REOPENED vengono gestiti in un altra view sempre dal teamCoordinator

                /*for (let i = 0; i < response.data.length; i++) {
                    if(response.data[i].currentState != 'REOPENED' && response.data[i].customerState == false) {
                        $scope.myTickets.push(response.data[i]);
                    }
                }*/

                for(let i =0;i<response.data.length;i++){
                    //console.log(response.data.length,i)
                    //console.log(response.data[i].currentState,$scope.currentState);
                        $scope.myTickets.push(response.data[i]);


                }
              //se ci sono ticket assegnati con target == selectedTarget, allora mi salvo i loro possibili stati futuri
              //me ne basta trovarne uno per vedere i prossimi stati di tutti quelli con lo stesso target e creare le colonne

              if ($scope.myTickets.length > 0) {
                  for (let i = 0; i < $scope.myTickets.length; i++) {
                      if ($scope.myTickets[i].target.name == $scope.selectedTarget.name) {
                            //$scope.states = $scope.myTickets[i].stateInformation;
                            //$scope.currentState = $scope.myTickets[i].currentState;
                            break; //mi fermo subito
                      }
                  }

                  /*    questo controllo lo faccio perchè, se ho 0 ticket per il targetX ma uno del targetY,
                        ugualmente avrò dei ticket assegnati a me, ma non saranno relativi al target selezionato.
                        Quindi al fine di selezionare solo i ticket che voglio vedere, eseguo il controllo,
                        perchè stats[2] sarà undefined solo se ho ticket assegnati a me di un target non selezionato al momento.*/

                  if ($scope.states[2] != undefined) {
                      for (let i = 0; i < $scope.states[2].length; i++) {

                          httpService.get(restService.findTicketByState + '/' + $scope.states[2][i])
                              .then(function (data) {
                                  for (let j = 0; j < data.data.length; j++) {
                                      if (data.data[j].target.name == $scope.selectedTarget.name) {
                                          //Controllo se ho ricevuto dal BE dei ticket che erano già presenti tra quelli ottenuti in precedenza
                                          if(!searchDuplicate($scope.myTickets,data.data[j].id)) {
                                              console.log("Inserisco",data.data[j])
                                              $scope.myTickets.push(data.data[j]);
                                          }
                                      }
                                  }
                              }, function err(data) {});
                      }
                  }
              } else {
                  $scope.empty = true;
              }
              console.log("my tickets",$scope.myTickets);
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
      };

        /**
         * Modal per l'assegnamento del Ticket.
         *
         * @param nextStateName
         * @param stateAction
         * @param stateRole
         * @param ticket
         */
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

        /**
         * Verifico se nell Array array ho già un elemento con l'id id
         *
         * @param array
         * @param id
         * @returns {boolean}
         */
        var searchDuplicate = function(array,id){
            console.log("Verifico se ",array," contiene ",id);
            for(let i =0;i<array.length;i++){
                var elem = array[i];
                if(elem.id == id) {
                    console.log("Ritorno vero");
                    return true;
                }
            }
            console.log("Ritorno falso");
            return false;

        };

        //Questa funzione verifica se è scaduto il timeout per un ticket e restituisce un colore adeguato
        //che sarà adottato dal Panel-Heading del ticket in questione.
        $scope.ttlColor = function(ticket){

            var date = new Date(ticket.stateCounter);
            var time = new Date().getTime();
            var today = new Date(time);
            var distanceTodayDate = Math.abs(today-date) / 36e5;
            var ttlHours = ticket.ttl*24;
            var threshold = 12;
            if(distanceTodayDate>ttlHours)
                return    "red";
            else if(distanceTodayDate>ttlHours+threshold)
                return "orange";
            else  return  "green";
        };

        /**
         * Show to modal with the infos about a Ticket TTL and the relative Timeout
         *
         * @param item a Ticket
         */
        $scope.showTTLForm = function (item) {
            $scope.formItem = angular.copy(item);
            var date = new Date(item.stateCounter);


            $scope.formItem.startDate = date.toLocaleString();
            var time = new Date().getTime();
            var today = new Date(time);
            var hours = Math.abs(today-date) / 36e5;
            var ttlHours = item.ttl*24;
            var threshold = 12;
            if(hours>ttlHours)
                $scope.formItem.stateTTL = "EXPIRED";
            if(hours>ttlHours+threshold)
                $scope.formItem.stateTTL = "EXPIRING";
            else $scope.formItem.stateTTL = "IN TIME";


            var modalInstance = $modal.open({
                templateUrl: '/modal/modal-ttl.html',
                controller: ModalInstanceCtrl,
                scope: $scope,
                resolve: {
                    userForm: function () {
                        return $scope.userForm;
                    }
                }
            });

            modalInstance.result.then(function (selectedItem) {
                $scope.selected = selectedItem;
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        };


    });

var AssignmentModalCtrl = function ($scope, $modalInstance, getState, getAction, getRole, getTicket, restService, httpService) {

    $scope.membersList = [];

    //TODO recuperarli tramite mock!
    $scope.priorityList = [{"id": "1", "name":"LOW"},{"id": "2", "name":"AVERAGE"},{"id": "3", "name":"HIGH"}];
    $scope.difficultyList = [{"id": "1", "name":"LOW"},{"id": "2", "name":"MEDIUM"},{"id": "3", "name":"HIGH"}];
    $scope.categoryList = getTicket.target.categories;

    $scope.cancelAssignment = function () {
        $modalInstance.dismiss('cancel');
    };

    //Cambia la difficioltà di un ticket
    var changeTicketDifficulty = function(difficulty,ticket){
        httpService.put(restService.changeTicketDifficulty+'/'+difficulty,ticket.id)
            .then(function () {
                $modalInstance.close('assigned')
            }, function err() {
                $modalInstance.close('error')
            });
    };

    //Cambia la Priorità e la categoria interna di un ticket.
    var setInternalPriorityAndType = function(priority,ticket,type){
        httpService.put(restService.createTicket +'/changePriorityAndType/'+priority+'/'+type,ticket.id)
            .then(function () {
                $modalInstance.close('assigned')
            }, function err() {
                $modalInstance.close('error')
            });
    };

    //Assegno il ticket a un InternalUser e se selezionate ne modifico Difficoltà/Priorità&Categoria
    $scope.continueAssignment = function () {

        //se il ticket viene rimandato al customer, metto a 0 il resolverUser
        let resolverID = "0";
        if ($scope.membersList.length > 0) {
            resolverID = $scope.membersList.selected.id;
        }

        httpService.post(restService.changeTicketState + '/' + getTicket.id + '/' + getAction + '/' + resolverID)
            .then(function () {
                //TODO da implementare tutti e due altrimenti non si può settare la priorità e la difficolta
                if (!angular.isUndefined($scope.difficultyList.selected ))
                    changeTicketDifficulty($scope.difficultyList.selected.name, getTicket);
                if (!angular.isUndefined($scope.priorityList.selected ))
                    setInternalPriorityAndType($scope.priorityList.selected.name, getTicket,$scope.categoryList.selected);
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
            httpService.get(restService.getEmployedUserByRole + '/' + getRole)
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
