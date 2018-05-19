'use strict';

angular.module('ticketsystem.loginUser', ['ngRoute'])

    .controller('LoginUserCtrl', function ($scope, restService, httpService,$location) {

        $scope.startLoginUser = function () {

            if(angular.isUndefined($scope.user) || angular.isUndefined($scope.user.username) ||
                angular.isUndefined($scope.user.password) || angular.isUndefined($scope.user.type)) {

                window.alert('è necessario riempire tutti i campi!')
            }
            else {

                console.log($scope.user);

                /*
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
        }
    });