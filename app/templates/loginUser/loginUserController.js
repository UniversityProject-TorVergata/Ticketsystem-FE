'use strict';

angular.module('ticketsystem.loginUser', ['ngRoute'])

    .controller('LoginUserCtrl', function ($scope, restService, httpService,$location,loginService) {

        $scope.startLoginUser = function () {



            if(angular.isUndefined($scope.user) || angular.isUndefined($scope.user.username) ||
                angular.isUndefined($scope.user.password) ) {

                window.alert('è necessario riempire tutti i campi!')
            }
            else if($scope.user.username == "" || $scope.user.password == ""){
                window.alert('è necessario riempire tutti i campi!')
            }
            else {

                httpService.post(restService.login, $scope.user).then(function (response) {
                    // turn on flag for post successfully
                    if(response.data["@type"] == "ThirdPartyCustomer") {
                        $location.url("/homeThirdPartyCustomer");

                    }
                    else if(response.data["@type"] == "CompanyAdmin") {
                        $location.url("/homeCompanyAdmin");
                    }
                    loginService.set(response.data);

                }, function error(response) {

                    window.alert("Login failed ");

                });


            }
        };
    });