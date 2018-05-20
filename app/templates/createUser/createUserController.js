'use strict';

angular.module('ticketsystem.createUser', ['ngRoute'])

    .controller('createUserCtrl', function ($scope, restService, httpService, $location) {

        $scope.creationUser = function () {

            if(angular.isUndefined($scope.user) || (angular.isUndefined($scope.user.fiscal_code) || angular.isUndefined($scope.user.name) ||
                angular.isUndefined($scope.user.surname) || angular.isUndefined($scope.user.address) ||
                angular.isUndefined($scope.user.email) || angular.isUndefined($scope.user.username) ||
                angular.isUndefined($scope.user.password))) {

                window.alert('è necessario riempire tutti i campi!')
            }
            else {

                var date = Date.now();
                $scope.user.created_at = moment(date).format("DD/MM/YYYY");
                $scope.user.type = "ThirdPartyCustomer";

                var jsonString =

                    {
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

                console.log(jsonString);

                httpService.post(restService.createUser, jsonString)
                    .then(function (data) {
                            window.alert('Utente inserito con successo');
                            $location.path('/homeCompanyAdmin');
                            console.log(data)
                        },

                        function (err) {
                            window.alert('Inserimento non riuscito');
                            console.log("Error!\n");
                            console.log(err)
                        })
            }
        }
    });