'use strict';

angular.module('ticketsystem.Login', ['ngRoute'])

    .controller('LoginCtrl', function ($scope, restService, httpService, storageService, $state) {

        /**
         *  Function triggered by the login.
         *  It sends a login request via HTTP POST.
         */
        $scope.startLoginUser = function (user) {

            //  Check fields
            if (angular.isUndefined(user) || user.username === "" || user.password === "")
                window.alert('Some fields are missing!');
            else {

                // HTTP POST
                httpService.post(restService.login, user)
                    .then(function (response) {

                        //  Save user info
                        storageService.setUser(response.data);

                        switch (response.data["@type"]) {
                            case "Customer":
                                $state.go('secure.homeCustomer');
                                break;
                            case "TeamCoordinator":
                                $state.go('secure.homeTeamCoordinator');
                                break;
                            case "Admin":
                                $state.go('secure.homeAdmin');
                                break;
                            case "TeamMember":
                                $state.go('secure.homeTeamMember');
                                break;
                            case "TeamLeader":
                                $state.go('secure.homeTeamLeader');
                                break;
                        }

                    }, function error(response) {
                        window.alert("Login failed! Try again.");
                        console.log(response);
                    });
            }
        };
    });