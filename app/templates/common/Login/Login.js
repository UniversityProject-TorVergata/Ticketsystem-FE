'use strict';

angular.module('ticketsystem.Login', ['ngRoute'])

    .controller('LoginCtrl', function ($scope, restService, httpService, loginService, storageService,
                                           $location,  $state) {

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

                        storageService.setUser(response.data);

                        switch(response.data["@type"]) {
                            case "Customer":
                            case "TeamCoordinator":
                            case "Admin":
                            case "TeamLeader":
                                $state.go('secure.accountInfo');
                                break;
                        }

                        //$location.url(url);

                    //  User data is saved in the sessions after login
                    //storageService.save("userData", JSON.stringify(response.data));
                }, function error(response) {
                    window.alert("Login failed!");
                });
            }
        };
    });