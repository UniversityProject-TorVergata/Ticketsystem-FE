'use strict';

angular.module('ticketsystem.loginCompany', ['ngRoute'])

    .controller('LoginCompanyCtrl', function ($scope, restService, httpService,$location) {
        $scope.user = {
            company_username: "Companybau90",
            company_password: "Companybaubau"
        }
        $scope.errorMessage=""
        $scope.startLoginCompany = function () {
            /*console.log($scope.user);
            console.log(restService.login)
            httpService.post(restService.login, $scope.user)
                .then(function (data) {
                        console.log(data)
                        storageService.setUser(data.data.message);
                        storageService.setSocketPort(data.data.message.socketPort);
                        $location.path('/table')
                    },
                    function(err){
                        $scope.errorMessage = "error!"
                    })*/
        }
    });