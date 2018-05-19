'use strict';

angular.module('ticketsystem.accountThirdPartyCustomer', ['ngRoute'])

    .controller('accountThirdPartyCustomerCtrl', function ($scope, restService, httpService,$location) {

        $scope.disabledButton = true;
        $scope.disabledReadonly = true;

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




        };

        $scope.disabledButtonHandler = function() {

            $scope.disabledButton = !($scope.disabledButton);
            $scope.disabledReadonly = !($scope.disabledReadonly);
        }







    });