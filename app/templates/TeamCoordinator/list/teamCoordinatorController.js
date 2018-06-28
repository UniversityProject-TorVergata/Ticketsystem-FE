'use strict';

angular.module('ticketsystem.assignTeam', ['ngRoute'])

    .controller('AssignTeamCtrl', function ($scope, $state, $modal, restService, storageService, httpService, util) {

        $scope.items = [];

        /**
         *  Function reads all the PENDING tickets in the database via an HTTP GET and
         *  shows them in a table.
         */
        $scope.readReopenedTicket = function () {
            //  HTTP GET
            httpService.get(restService.findTicketByState + '/' + 'REOPENED')
                .then(function (response) {
                    $scope.items = response.data;

                }, function error(response) {
                    $scope.errorResponse = "Error Status: " + response.statusText;
                });


            };

        $scope.readReopenedTicket();


        $scope.showImage = function (item, index) {
            util.postBase64(item).then(result => {
                // Append the <a/> tag and remove it after automatic click for the download
                document.body.appendChild(result);
                result.click();
                document.body.removeChild(result);
            })

        }

        $scope.reassignTicket = function(item) {
            $scope.showReassignmentModal(item.stateInformation[2][0], item.stateInformation[0][0], item.stateInformation[1][0], item);
        };

        $scope.showReassignmentModal = function (nextStateName, stateAction, stateRole, ticket) {



            var modalInstance;

            modalInstance = $modal.open({
                templateUrl: '/modal/modal-change-state.html',
                controller: ReassignmentModalCtrl,
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
                $state.reload()

            }, function (response) {
                $state.reload();

            });
        };
    });

var ReassignmentModalCtrl = function ($scope, $modalInstance, getState, getAction, getRole, getTicket, restService, httpService) {

    //TODO recuperarli dai mock
    $scope.membersList = [];
    $scope.priorityList = [{"id": "1", "name":"LOW"},{"id": "2", "name":"AVERAGE"},{"id": "3", "name":"HIGH"}];
    $scope.difficultyList = [{"id": "1", "name":"LOW"},{"id": "2", "name":"MEDIUM"},{"id": "3", "name":"HIGH"}];

    $scope.cancelAssignment = function () {
        $modalInstance.dismiss('cancel');
    };

    $scope.continueAssignment = function () {
        //TODO da implementare tutti e due
        //if ($scope.difficultyList.selected != undefined)
        //    changeTicketDifficulty($scope.difficultyList.selected, getTicket);
        //if ($scope.priorityList.selected != undefined)
        //    setInternalPriority();

        //se il ticket viene rimandato al customer, metto a null il resolverUser
        let resolverID = "0";
        if ($scope.membersList.length > 0) {
            resolverID = $scope.membersList.selected.id;
        }

        httpService.post(restService.changeTicketState + '/' + getTicket.id + '/' + getAction + '/' + resolverID)
            .then(function () {
                $modalInstance.close('assigned');
            }, function err() {
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
                    console.log("sto in searcResolverUsers");
                    console.log(response.data);
                    $scope.membersList = response.data;
                }, function err(response) {

                });
        } else {
            return [];
        }
    };

    $scope.searchResolverUsers();
};