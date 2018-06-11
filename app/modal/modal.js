var app = angular.module('modal', ['ui.bootstrap']);

/**
 *  Controller used for the modal
 */
app.controller("modalController", ['$scope', '$modal', '$log',

    /**
     *  Function used to show the modal popup
     *  @param $scope   general $scope
     *  @param $modal   general $modal
     *  @param $log     general $log
     */
    function ($scope, $modal, $log) {

        //  showEditForm: modal for editing ticket
        $scope.showEditForm = function (item) {
            $scope.message = "Show Form Button Clicked";
            console.log($scope.message);
            $scope.formItem=item;   //  save the item to modify it

            var modalInstance = $modal.open({
                templateUrl: '/modal/modal-form.html',
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
        //  showInfoForm:   modal for see the details about the ticket
        $scope.showInfoForm = function (item) {
            $scope.message = "Show Form Button Clicked";
            console.log($scope.message);
            $scope.formItem=item;
            console.log(item);


            var modalInstance = $modal.open({
                templateUrl: '/modal/modal-info.html',
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

        $scope.showMessageForm = function (item) {
            $scope.terminateSending = false;
            $scope.formItem=item;
            $scope.newMessage = {};
            let date = Date.now();
            $scope.newMessage.timestamp = moment(date).format("DD/MM/YY, h:mm:ss");
            //Author is inserted on teamCoordinatorController.sendNewTicketComment

            var modalInstance = $modal.open({
                templateUrl: '/modal/modal-message.html',
                controller: ModalInstanceCtrl,
                scope: $scope,
                backdrop: 'static',
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


        /**
            Queste due variabili sono usate per debug.
            Quando un utente esegue DnD su uno stato, può ripensarci
            e spostare il ticket in un altro stato prima di dare la conferma.
            Queste variabili tengono traccia dello stato precedentemente
            selezionato, e lo stato corrente selezionato.
         */
        $scope.currentState = null;
        $scope.previousState = null;

        /**
            Usata per differenziare TeamCoordinator da altri ruoli.
            Per il TeamCoordinator si deve lasciare intatto il
            meccanismo di invio del ticket ad un team mediante
            multiselect e non drag and drop
        */
        $scope.isTeamCoordinator = false;
        $scope.selectedMember = null;

        $scope.showAssignmentModal = function (event, ui, ticket) {
            $scope.item = ticket.ticket;

            //possinibili stati in cui può andare il ticket
            $scope.states = [];
            //variabile temporanea usata come alias (per scrivere meno -_-)
            let allStates = $scope.item.stateMachine.allStates;

            /**
                Cerco i prossimi stati in cui il ticket può andare e li inserisco in states.
                Ogni stato è un JSON OBJ composto da un campo "name" che identifica
                l'action da usare nell'url per contattare il backend (es: Action1),
                e un campo "state" dove risiede lo stato come definito nella SM.
             */
            for (let i = 0; i < Object.keys(allStates).length; i++) {
                if (allStates[i].currentState === $scope.item.stateMachine.currentState) {
                    for (let j = 0; j < Object.keys(allStates[i].newTransitionMap).length; j++) {
                        let temp = "Action" + (j+1).toString();
                        let t = {};
                        t.name = temp;
                        t.state = allStates[i].newTransitionMap[temp];


                        //  controllo se è il TeamLeader che sta eseguendo questa operazione
                        if (JSON.parse(localStorage.getItem('userInformation'))['@type'] == "TeamCoordinator") {
                            $scope.isTeamCoordinator = true;
                        }

                        /*
                            elimino la possibilità di mandare un ticket ad un team (quindi in stato di PENDING) tramite drag and drop,
                            in quanto era stato già implementato tramite select. Questo vale solo se è il TeamLeader a eseguire l'operazione.
                         */
                        //TODO trovare una implementazione migliore
                        if (t.state.nextState == "PENDING" && JSON.parse(localStorage.getItem('userInformation'))['@type'] == "TeamCoordinator") {
                            //  eventuali controlli (per ora non ce n'è bisogno)
                        }
                        else {
                            $scope.states.push(t);
                        }
                    }
                }
            }
            //console.log($scope.states);

            var modalInstance = $modal.open({
                templateUrl: 'modal/modal-assignment-ticket-teamleader.html',
                controller: ModalInstanceCtrl,
                scope: $scope,
                backdrop: 'static',
                resolve: {
                    userForm: function () {
                        return $scope.userForm;
                    }
                }
            });

            modalInstance.result.then(function () {
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        };


        //  Callback chiamata dopo il drop dell'elemento
        $scope.dropCallback = function(event, ui, element) {
            $scope.previousState = $scope.currentState;
            $scope.currentState = element.element;
            console.log($scope.currentState);
        };


        $scope.showInfoTeam = function (item) {
            $scope.formItem = item;

            var modalInstance = $modal.open({
                templateUrl: '/modal/modal-info-team.html',
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

    }]);

var ModalInstanceCtrl = function ($state, $scope, $modalInstance, httpService, restService) {
    $scope.form = {};

    $scope.submitForm = function () {
        if ($scope.form.userForm.$valid) {
            console.log('user form is in scope');
            $scope.saveTicket($scope.editTicket,$scope.index);
            $modalInstance.close('closed');
        } else {
            console.log('userform is not in scope');
        }
    };

    $scope.messageOk = function() {
        $scope.sendNewTicketComment($scope.formItem.id, $scope.newMessage);
        $scope.terminateSending = true;
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };

    $scope.closeMessageModal = function () {
        $modalInstance.dismiss("closed");

        //riduco i reload della pagina: reload solo quando
        //inserisco un commento o la textarea non è vuota
        //TODO implementare meccanismo migliore
        if($scope.newMessage.description) {
            $state.reload();
        }

    };

    $scope.assignmentOk = function() {
        $scope.changeTicketState($scope.item.id, $scope.currentState.name, $scope.selectedMember);
        $modalInstance.dismiss('closed');
        $state.reload();
    }

    $scope.closeAssignmentModal = function() {
        $modalInstance.dismiss('closed');
        $state.reload();
    }



    //  FUNZIONI COMUNI A PIU USER INSERITE DIRETTAMENTE NEL CONTROLLER MODAL
    //  PER EVITARE DI RISCRIVERLE
    $scope.sendNewTicketComment = function (ticketID, msg) {
        msg['eventGenerator'] = JSON.parse(localStorage.getItem('userInformation'));
        httpService.post(restService.insertComment + '/' + ticketID, msg)
            .then(function (data) {
                    //$route.reload();
                },
                function (err) {
                    //window.alert("Error!")
                })
    };


    $scope.changeTicketState = function(ticketID, action, resolverUser) {

        let resolv;
        if (resolverUser == null)
            resolv = JSON.parse(localStorage.getItem('userInformation'));
        else
            resolv = resolverUser;

        httpService.post(restService.changeTicketState + '/' + ticketID + '/' + action + '/' + resolv.id)
            .then(function (data) {

                },
                function (err) {

                });

        $scope.isTeamCoordinator = false;
    };
};
