'use strict';

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
            var hours = Math.abs(today-date) / 36e5
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

};
