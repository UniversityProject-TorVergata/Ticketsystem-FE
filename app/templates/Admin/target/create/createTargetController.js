'use strict';

angular.module('ticketsystem.createTarget', ['ngRoute'])

    .controller('createTargetCtrl', function ($scope, restService, httpService, $state, storageService, $modal, $log,
                                              stateMachines, targetTypes) {

        //Select values
        $scope.stateMachineIMG = '';
        $scope.targetTypes = targetTypes;
        $scope.stateMachines = stateMachines;

        /**
         * @ngdoc               function
         * @name                changeStateMachine
         * @description         When changing the selected state machine change also the related modal image.
         *
         * @param stateMachine  new selected state machine
         */
        $scope.changeStateMachine = function (stateMachine) {

            $scope.stateMachineIMG = stateMachine.base64Diagram;
        };

        /**
         * @ngdoc               function
         * @name                creationTarget
         * @description         Function to create a new Target.
         *
         * @param target        target to be created
         * @param tags          selected tags
         * @param targetType    target type (Product or Service)
         * @param stateMachine  Target's FSM
         */
        $scope.creationTarget = function (target, tags, targetType, stateMachine) {

            if (angular.isUndefined(target) ||
                target.name === "" ||
                target.description === "" ||
                target.version === "" ||
                tags.length === 0) {

                window.alert('It is necessary to fill all the fields!');
            }

            else {

                target.categories = [];
                target.targetState = "ACTIVE";
                target.stateMachineName = stateMachine.name;
                target.targetType = targetType.name;

                for (let i = 0; i < tags.length; i++) {
                    target.categories[i] = tags[i].text;
                }

                //Send to the backend
                httpService.post(restService.createTarget, target)
                    .then(function (response) {
                            window.alert("Target created with success!");
                            //  TODO reset field
                            $state.reload();
                            console.log(response);
                        },
                        function error(response) {
                            window.alert("Error while creating Target!");
                            console.log("Error!" + response);
                        });
            }
        };


        /**
         * @ngdoc               function
         * @name                viewStateMachines
         * @description         Function show the available FSM through a modal.
         */
        $scope.viewStateMachines = function () {

            var modalInstance;

            modalInstance = $modal.open({
                templateUrl: '/modal/modal-view-state-machine.html',
                controller: ModalInstanceCtrl,
                scope: $scope,
                backdrop: 'static',
            });

            modalInstance.result.then(function () {

            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        };

    });