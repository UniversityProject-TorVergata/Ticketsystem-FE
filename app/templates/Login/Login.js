'use strict';

angular.module('ticketsystem.Login', ['ngRoute'])

    .controller('LoginCtrl', function ($scope, restService, httpService, loginService, storageService,
                                           $location) {

        /**
         *  Function triggered by the login.
         *  It sends a login request via HTTP POST.
         */
        $scope.startLoginUser = function () {

            //  Check data for the login
            if( angular.isUndefined($scope.user) ||
                angular.isUndefined($scope.user.username) ||
                angular.isUndefined($scope.user.password) ) {
                window.alert('Some fields are missing!');
            }
            else if($scope.user.username == "" || $scope.user.password == "")
                window.alert('Some fields are missing!');
            else {

                // HTTP POST
                httpService.post(restService.login, $scope.user)
                    .then(function (response) {

                        var url = "";

                        switch(response.data["@type"]) {
                            case "Customer":
                                url = "/homeCustomer";
                                break;
                            case "TeamCoordinator":
                                url = "/homeTeamCoordinator";
                                break;
                            case "Admin":
                                url = "/homeAdmin";
                                break;
                            case "TeamLeader":
                                url = "/assignTicket";
                                break;
                        }

                        $location.url(url);

                    //  User data is saved in the sessions after login
                    storageService.save("userData", JSON.stringify(response.data));
                }, function error(response) {
                    window.alert("Login failed!");
                });
            }
        };
    });