'use strict';

angular.module('ticketsystem.createTarget', ['ngRoute'])

    .controller('createTargetCtrl', function ($scope, restService, httpService, $state, storageService, $modal, $log,
                                              stateMachines, targetTypes) {

        // Select values
        $scope.targetTypes = targetTypes;
        $scope.stateMachines = stateMachines;

        /**
         *  Function creates a new Target.
         *  @param target       target to be created
         *  @param tags         selected tags
         *  @param targetType   target type (Product or Service)
         *  @param stateMachine Target's FSM
         */
        $scope.creationTarget = function(target, tags, targetType, stateMachine, modstateMachine){

            // TODO controlli sensati
            if(angular.isUndefined(target) ||
                target.name === ""  ||
                target.description === "" ||
                target.version === "" ||
                tags.length==0) {

                window.alert('It is necessary to fill all the fields!');
            }

            else {

                target.categories = [];
                target.targetState = "ACTIVE";
                target.stateMachineName = stateMachine.name;
                target.targetType = targetType.name ;

                for(let i=0; i<tags.length; i++){
                    target.categories[i] = tags[i].text;
                }

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
         *  Function show the available FSM.
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


var ModalInstanceCtrl = function ($scope, $modalInstance) {

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };

};