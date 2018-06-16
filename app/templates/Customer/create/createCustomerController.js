'use strict';

//TODO Restituire l'errore se è già registrato.

angular.module('ticketsystem.createCustomer', ['ngRoute'])

    .controller('createCustomerCtrl', function ($scope, restService, httpService, $location) {

        /**
         *  Function creates a ticket.
         */
        $scope.creationUser = function () {

            if( angular.isUndefined($scope.user) ||
                angular.isUndefined($scope.user.fiscal_code) ||
                angular.isUndefined($scope.user.name) ||
                angular.isUndefined($scope.user.surname) ||
                angular.isUndefined($scope.user.address) ||
                angular.isUndefined($scope.user.email) ||
                angular.isUndefined($scope.user.username) ||
                angular.isUndefined($scope.user.password) ||
                angular.isUndefined($scope.user.confirm_password))
            {

                    window.alert('Some fields are missing!')
            }
            else if(!angular.equals($scope.user.password, $scope.user.confirm_password)) {
                window.alert('Password Error')
            }
            else {
                var date = Date.now();
                $scope.user.created_at = moment(date).format("DD/MM/YYYY");
                $scope.user.type = "Customer";

                var jsonString = {
                    "@type": $scope.user.type,
                    "fiscal_code": $scope.user.fiscal_code,
                    "name": $scope.user.name,
                    "surname": $scope.user.surname,
                    "email": $scope.user.email,
                    "username": $scope.user.username,
                    "password": $scope.user.password,
                    "address": $scope.user.address,
                    "created_at": $scope.user.created_at
                };

                // HTTP POST
                httpService.post(restService.createUser, jsonString)
                    .then(function (data) {
                            window.alert('Successful registration! You will be redirected to login page.');
                            $location.path('/loginUSer');
                        },

                        function (err) {
                            window.alert('Registration failed! Try again!');
                            console.log("Error!\n");
                            console.log(err)
                        })
            }
        }
    });