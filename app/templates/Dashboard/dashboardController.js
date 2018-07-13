'use strict';

angular.module('dashboard', [])
    .controller('dashboardController', function ($scope, $window, $state, $modal, $log, restService, storageService, httpService, util) {

        //It contains all the tickets assignet to the logged user
        $scope.myTickets = [];
        //When this Boolean is true, there are no tickets assigned to the selectedTarget target. You could use it to show a message in the view
        $scope.empty = false;

        //It encloses the names of the current state (position 0) and the future states (subsequent positions) in which a ticket can go
        $scope.states = [];

        //It identify the next state where a ticket will go
        $scope.nextState = {};

        //It identify the ticket that will have to change status
        $scope.toChange = {};

        //It is used to select a target to show its associated tickets (via SELECT)
        $scope.selectedTarget = {};

        //List of target retrieved from backend
        $scope.targets = [];


        /**
         * @ngdoc               function
         * @name                findActionAndResolverUser
         * @description         This function finds the "action" and the "resolverUser" in "states" array
         *                      using the name of the next state.
         * @param nextState:    string to identify the next state
         * @return response:    [0]-> action
         *                      [1]-> resolverUser
         *                      [2]-> state name
         */
        var findActionAndResolverUser = function (nextState) {
            var state = [];

            var temp = $scope.states[2];

            for (let i = 0; i < temp.length; i++) {
                if (temp[i] === nextState) {
                    state.push($scope.states[0][i]);
                    state.push($scope.states[1][i]);
                    break;
                }
            }
            return state;
        };

        /**
         *
         * @ngdoc           function
         * @name            getAllTargets
         * @description     This function is used to retrieve the targets list from Back-End and
         *                  set the selectedTarget to a default value, that is the first target
         *                  on the list.
         *                  We always assume that there is a target within the system,
         *                  because otherwise a ticket could not be sent
         */
        var getAllTargets = function () {
            //Request all the targets from backend
            httpService.get(restService.readTargets)
                .then(function (response) {
                    $scope.targets = response.data;
                    //At least one target must exist in the system, otherwise no ticket could be entered
                    $scope.selectedTarget = response.data[0];

                    //Continue the initialization of the view
                    $scope.updateTarget();

                }, function error(response) {
                });
        };


        //************************
        //Start dashboard initialization
        getAllTargets();
        //************************


        /**
         * @ngdoc           function
         * @name            updateCurrentState
         * @description     This function is called when the "CURRENT STATE" is changed from the view (by the SELECT) to change the
         *                  view itself and showing correct states.
         *                  It allows to retrieve subsequent states from the current state (the changed one)
         *                  to create the new view.
         *
         * @param newState  the new state from which to find the successive states
         */
        $scope.updateCurrentState = function (newState) {
            httpService.get(restService.readTargets + "/getNextStates/" + $scope.selectedTarget.id + "/" + newState)
                .then(function (response) {
                    $scope.states = response.data;
                    //reload the dashboard
                    $scope.prepareDashboard();

                }, function error(response) {
                });
        }


        /**
         * @ngdoc           function
         * @name            updateTarget
         * @description     This function is called when the target is changed from the view, or when the view is initialized
         *                  at the very start. It allows to retrieve:
         *
         *                  2) all the states managed by the logged user (the role itself)
         *                  3) all subsequent states of a ticket, starting from the ticket current state
         *
         *                  For "subsequent" we mean all states at a distance of "1 hop" from the current state,
         *                  directly connected with the current state.
         */
        $scope.updateTarget = function () {
            //Find the role of the logged user (i.e. "TeamMember" or "TeamLeader")
            var role = JSON.parse(localStorage.getItem('userInformation'))['@type'];
            //Retrieve all the states managed by the logged user (the role itself)
            httpService.get(restService.readTargets + "/getActualStates/" + $scope.selectedTarget.id + "/" + role)
                .then(function (response) {
                    $scope.actualStates = response.data;
                    $scope.currentState = $scope.actualStates[0];
                    //Retrieve all subsequent states starting by current state
                    httpService.get(restService.readTargets + "/getNextStates/" + $scope.selectedTarget.id + "/" + $scope.currentState)
                        .then(function (response) {
                            $scope.states = response.data;
                            //Reload dashboard
                            $scope.prepareDashboard();

                        }, function error(response) {
                        });

                }, function error(response) {
                });
        };


        /**
         * @ngdoc           function
         * @name            prepareDashboard
         * @description     This function prepares data to initialize the dashboard.
         *                  In particular, the ticket assigned to the logged user are
         *                  retrieved. Then, all tickets in states immediately following
         *                  the current one are picked up to be shown in the view.
         */
        $scope.prepareDashboard = function () {
            //Set default value
            $scope.myTickets = [];
            $scope.toChange = {};

            //Read all logged user's assigned tickets
            httpService.get(restService.readMyAssignedTickets + '/' + JSON.parse(localStorage.getItem('userInformation')).id)
                .then(function (response) {

                    $scope.myTickets = response.data;

                    if ($scope.myTickets.length > 0) {
                        if ($scope.states[2] !== undefined) {
                            for (let i = 0; i < $scope.states[2].length; i++) {
                                //Find all the tickets for the next states. These tickets will only be used to show the TTL and the progress
                                httpService.get(restService.findTicketByState + '/' + $scope.states[2][i])
                                    .then(function (data) {
                                        for (let j = 0; j < data.data.length; j++) {
                                            if (data.data[j].target.name === $scope.selectedTarget.name) {
                                                //Search for duplicate tickets, because a role can manage more than one state
                                                if (!searchDuplicate($scope.myTickets, data.data[j].id)) {
                                                    $scope.myTickets.push(data.data[j]);
                                                }
                                            }
                                        }
                                    }, function err(data) {
                                    });
                            }
                        }
                    } else {
                        //Future use: when empty, show a message in the view
                        $scope.empty = true;
                    }
                    console.log("my tickets", $scope.myTickets);
                }, function error(response) {
                });
        };

        /**
         * @ngdoc           function
         * @name            changeTicketState
         * @description     This function is called as "onDrop" method, when a ticket is dropped on a column.
         *
         * @param event     library param (the event that brought about change)
         * @param ui        library param (data related to the positioning of the object in the view)
         * @param data      the new state for the toChange ticket
         */
        $scope.changeTicketState = function (event, ui, data) {
            $scope.nextState = data.nextState;
            var temp = findActionAndResolverUser(data.nextState);
            //See the modal to set some information about the new state
            $scope.viewChangeStateModal(data.nextState, temp[0], temp[1], $scope.toChange);
        };

        /**
         * @ngdoc           function
         * @name            setTicketToChange
         * @description     This function is colled as "onStart" method, when a ticket is being dragged
         *
         * @param event     library param (the event that brought about change)
         * @param ui        library param (data related to the positioning of the object in the view)
         * @param data      the ticket whose status must be changed
         */
        $scope.setTicketToChange = function (event, ui, data) {
            $scope.toChange = data.ticket;
        };


        /**
         * @ngdoc           function
         * @name            showImage
         * @description     This function is used to show the attachment image of a ticket
         *
         * @param item      the image itself, formatted as a base64 object
         * @param index
         */
        $scope.showImage = function (item, index) {
            util.postBase64(item).then(result => {
                // Append the <a/> tag and remove it after automatic click for the download
                document.body.appendChild(result);
                result.click();
                document.body.removeChild(result);
            })
        };

        /**
         * @ngdoc           function
         * @name            viewChangeStateModal
         * @description     This is a function to set up a modal to complete the change of the state and the assignment.
         *
         * @param nextStateName     name of the nex state
         * @param stateAction       "action" of the next state
         * @param stateRole         role to which the ticket will be assigned with the status changed
         * @param ticket            the ticket itself
         */
        $scope.viewChangeStateModal = function (nextStateName, stateAction, stateRole, ticket) {

            var modalInstance;

            modalInstance = $modal.open({
                templateUrl: '/modal/modal-change-state.html',
                controller: AssignmentModalCtrl,
                scope: $scope,
                backdrop: 'static',
                resolve: {
                    getState: function () {
                        return nextStateName;
                    },
                    getAction: function () {
                        return stateAction;
                    },
                    getRole: function () {
                        return stateRole;
                    },
                    getTicket: function () {
                        return ticket;
                    }
                }
            });

            //On "success" or "cancel", the dashboard is reinitialized
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
         * @ngdoc           function
         * @name            searchDuplicates
         * @description     Search for duplicate tickets in the myTickets array
         *
         * @param array         array of tickets
         * @param id            id to compare with the other tickets
         * @returns {boolean}   true if a match is found, false otherwise
         */
        var searchDuplicate = function (array, id) {
            for (let i = 0; i < array.length; i++) {
                var elem = array[i];
                if (elem.id === id) {
                    return true;
                }
            }
            return false;

        };


        /**
         * @ngdoc               function
         * @name                ttlColor
         * @description         This function is used to verify if a TTL of a ticket is expired and return a string
         *                      that represents a color to indicate TTL level.
         *                      There are three levels:
         *                      1) the ticket TTL is still valid (green)
         *                      2) the ticket TTL is almost expired (orange)
         *                      3) the ticket TTL is expired (red)
         *
         * @param ticket        ticket to check
         * @returns {string}    a string that represents a color
         */
        $scope.ttlColor = function (ticket) {

            var date = new Date(ticket.stateCounter);
            var time = new Date().getTime();
            var today = new Date(time);
            var distanceTodayDate = Math.abs(today - date) / 36e5;
            var ttlHours = ticket.ttl * 24;
            var threshold = 12;
            if (distanceTodayDate > ttlHours)
                return "red";
            else if (distanceTodayDate > ttlHours + threshold)
                return "orange";
            else return "green";
        };

        /**
         * @ngdoc           function
         * @name            showTTLForm
         * @description     This function set up a modal to show the status of a TTL related to a ticket
         *
         *  @param item         ticket
         */
        $scope.showTTLForm = function (item) {
            $scope.formItem = angular.copy(item);
            var date = new Date(item.stateCounter);

            //Set parameters to check the TTL validity
            $scope.formItem.startDate = date.toLocaleString();
            var time = new Date().getTime();
            var today = new Date(time);
            var hours = Math.abs(today - date) / 36e5;
            var ttlHours = item.ttl * 24;
            var threshold = 12;

            if (hours > ttlHours)
                $scope.formItem.stateTTL = "EXPIRED";
            if (hours > ttlHours + threshold)
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

/**
 * @ngdoc           controller
 * @name            AssignmentModalCtrl
 * @description     Controller for the "assignment" modal
 *
 * @param $scope                $scope
 * @param $modalInstance        $modalInstance
 * @param getState              the next state to which the ticket is to be sent
 * @param getAction             the "action" related to the new state
 * @param getRole               the role in charge of managing the ticket in the new state
 * @param getTicket             the ticket itself
 * @param restService           restService
 * @param httpService           httpService
 */
var AssignmentModalCtrl = function ($scope, $modalInstance, getState, getAction, getRole, getTicket, restService, httpService) {

    //Initial value
    $scope.membersList = [];

    //In the future these values ​​will be recovered from the backend
    $scope.priorityList = [{"id": "1", "name": "LOW"}, {"id": "2", "name": "AVERAGE"}, {"id": "3", "name": "HIGH"}];
    $scope.difficultyList = [{"id": "1", "name": "LOW"}, {"id": "2", "name": "MEDIUM"}, {"id": "3", "name": "HIGH"}];
    $scope.categoryList = getTicket.target.categories;


    $scope.cancelAssignment = function () {
        $modalInstance.dismiss('cancel');
    };

    /**
     * @ngdoc           function
     * @name            changeTicketDifficulty
     * @description     This function allows to change the param "difficulty" of a ticket, sending a request to the backend
     *
     * @param difficulty        new difficulty
     * @param ticket            the ticket itself
     */
    var changeTicketDifficulty = function (difficulty, ticket) {
        httpService.put(restService.changeTicketDifficulty + '/' + difficulty, ticket.id)
            .then(function () {
                $modalInstance.close('assigned')
            }, function err() {
                $modalInstance.close('error')
            });
    };

    /**
     * @ngdoc           function
     * @name            setInternalPriorityAndType
     * @description     This function allows to change the params "priority" and "type" of a ticket
     *
     * @param priority      new priority
     * @param ticket        ticket itself
     * @param type          new type
     */
    var setInternalPriorityAndType = function (priority, ticket, type) {
        httpService.put(restService.createTicket + '/changePriorityAndType/' + priority + '/' + type, ticket.id)
            .then(function () {
                $modalInstance.close('assigned')
            }, function err() {
                $modalInstance.close('error')
            });
    };

    /**
     * @ngdoc           function
     * @name            continueAssignment
     * @description     This function is used to perform the true change of status of a ticket.
     *
     */
    $scope.continueAssignment = function () {

        //When a ticket is sent back to the customer, the resolver user is set to 0
        let resolverID = "0";
        if ($scope.membersList.length > 0) {
            resolverID = $scope.membersList.selected.id;
        }

        //Service that allows you to advance the ticket in the next state
        httpService.post(restService.changeTicketState + '/' + getTicket.id + '/' + getAction + '/' + resolverID)
            .then(function () {
                //check if difficulty adn priority have changed
                if (!angular.isUndefined($scope.difficultyList.selected))
                    changeTicketDifficulty($scope.difficultyList.selected.name, getTicket);
                if (!angular.isUndefined($scope.priorityList.selected))
                    setInternalPriorityAndType($scope.priorityList.selected.name, getTicket, $scope.categoryList.selected);
                $modalInstance.close('assigned')
            }, function err() {
                $modalInstance.close('error')
            });
    };

    /**
     * @ngdoc           function
     * @name            searchResolverUsers
     * @description     This function finds all the internal Users to which the ticket can be assigned
     *
     * @param role              the name of the role (i.e. 'TeamMember')
     * @returns {Array}         all members found
     */
    $scope.searchResolverUsers = function () {
        if (getRole !== "Customer") {
            httpService.get(restService.getEmployedUserByRole + '/' + getRole)
                .then(function (response) {
                    $scope.membersList = response.data;
                }, function err(response) {

                });
        } else {
            return [];
        }
    };

    //Used to populate the "SELECT"
    $scope.searchResolverUsers();
};
