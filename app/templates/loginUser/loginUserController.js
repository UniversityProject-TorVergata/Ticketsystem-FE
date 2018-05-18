'use strict';

angular.module('ticketsystem.loginUser', ['ngRoute'])

    .controller('LoginUserCtrl', function ($scope, restService, httpService,$location) {
        $scope.user = {
            username: "bau90",
            password: "baubau"
        }
        $scope.errorMessage=""
        $scope.startLoginUser = function () {
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