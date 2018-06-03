'use strict';

angular.module('ticketsystem.assignTeam', ['ngRoute'])

    .controller('AssignTeamCtrl', function ($scope, restService, httpService, util, $location, teams) {

        //  Select values
        $scope.teams = teams;

        //  Variables
        $scope.items = [];

        /**
         *  Function reads all the PENDING tickets in the database via an HTTP GET and
         *  shows them in a table.
         */
        $scope.readUnassignedTicket = function () {
            //  HTTP GET
            httpService.get(restService.pendingTickets)
                .then(function (response) {
                    $scope.items = response.data;
                }, function error(response) {
                    $scope.errorResponse = "Error Status: " + response.statusText;
                });
        };

        /** TODO cambiare
         *  Function saves a modified ticket via an HTTP PUT in the database and updates the view of the table.
         *  @param item     selected item
         *  @param index    iterator offset
         */
        $scope.saveTicketWithTeam = function(ticket, team){

            //  HTTP PUT
            httpService.put(restService.assignTicket, ticket.id+"/"+team.id)
                .then(function(succResponse){
                        $scope.readUnassignedTicket();
                        window.alert("Ticket assigned to " + team.username)
                    },
                    function(errReponse){
                        console.log(errReponse)
                    }
                )

        };

    });

/**
 *  Controller used for the modal
 */
app.controller("modalAccountFormController", ['$scope', '$modal', '$log',

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
                templateUrl: '/templates/Ticket/modal-form.html',
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
                templateUrl: '/templates/Ticket/modal-info.html',
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

var ModalInstanceCtrl = function ($scope, $modalInstance, userForm) {
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

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
};