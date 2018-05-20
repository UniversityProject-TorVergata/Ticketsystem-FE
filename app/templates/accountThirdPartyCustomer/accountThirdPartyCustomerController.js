'use strict';

angular.module('ticketsystem.accountThirdPartyCustomer', ['ngRoute'])

    .controller('accountThirdPartyCustomerCtrl', function ($scope, restService, httpService,$location) {

        $scope.user = {

            'username': 'mioUsername_2',
            'password': 'miaPassword_2',
        };

        $scope.disabledButton = true;
        $scope.disabledReadonly = true;

        var config = {
            headers : { 'Content-Type': 'application/json', }
        };

        $scope.paramsString = '/login?username=' + $scope.user.username + '&password=' + $scope.user.password;

        httpService.get(restService.getUser + $scope.paramsString, config)
            .then(function (response) {
                    $scope.user = response.data;
                    console.log(response.data)
                },

                function (err) {
                    console.log("Error!\n");
                    console.log(err)
                });


        $scope.changeAccountInformation = function() {

            if(angular.isUndefined($scope.user) || (angular.isUndefined($scope.user.fiscal_code) || angular.isUndefined($scope.user.name) ||
                angular.isUndefined($scope.user.surname) || angular.isUndefined($scope.user.address) ||
                angular.isUndefined($scope.user.email) || angular.isUndefined($scope.user.username) ||
                angular.isUndefined($scope.user.password))) {

                window.alert('è necessario riempire tutti i campi!')
            }
            else {

                console.log($scope.user);




            }
        };

        $scope.deleteAccount = function() {

            httpService.delete(restService.deleteUser, $scope.user)
                .then(function (data) {
                        window.alert('Account Cancellato con Successo');
                        $location.path('/home');
                        console.log(data)
                    },

                    function (err) {
                        window.alert('Cancellamento Non Riuscito');
                        console.log("Error!\n");
                        console.log(err)
                    })
        };

        $scope.disabledButtonHandler = function() {

            $scope.disabledButton = !($scope.disabledButton);
            $scope.disabledReadonly = !($scope.disabledReadonly);
        }







    });