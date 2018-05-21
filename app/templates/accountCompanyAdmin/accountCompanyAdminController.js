'use strict';

angular.module('ticketsystem.accountCompanyAdmin', ['ngRoute'])

    .controller('accountCompanyAdminCtrl', function ($scope, restService, httpService,$location,loginService) {

        $scope.user = loginService.get();
        $scope.disabledButton = true;
        $scope.disabledReadonly = true;


        var config = {
            headers : { 'Content-Type': 'application/json', }
        };


        $scope.changeAccountInformation = function() {

            if(angular.isUndefined($scope.user) || (angular.isUndefined($scope.user.fiscal_code) || angular.isUndefined($scope.user.name) ||
                angular.isUndefined($scope.user.surname) || angular.isUndefined($scope.user.address) ||
                angular.isUndefined($scope.user.email) || angular.isUndefined($scope.user.username) ||
                angular.isUndefined($scope.user.password))) {

                window.alert('è necessario riempire tutti i campi!')
            }
            else {

                httpService.put(restService.updateUser, $scope.user.id, $scope.user, config)
                    .then(function (response) {
                            window.alert('Account Aggiornato con successo');
                            $location.path('/homeCompanyAdmin');
                            loginService.set($scope.user);
                            console.log(response)
                        },

                        function (err) {
                            window.alert('Aggiornamento non riuscito');
                            console.log("Error!\n");
                            console.log(err)
                        })
            }
        };

        $scope.deleteAccount = function() {

            httpService.delete(restService.deleteUser, $scope.user.id, config)
                .then(function (response) {
                        window.alert('Account Cancellato con Successo');
                        $location.path('/home');
                        console.log(response)
                    },

                    function (err) {
                        window.alert('Cancellazione Non Riuscita');
                        console.log("Error!\n");
                        console.log(err)
                    })
        };

        $scope.disabledButtonHandler = function() {

            $scope.disabledButton = !($scope.disabledButton);
            $scope.disabledReadonly = !($scope.disabledReadonly);
        }

    });