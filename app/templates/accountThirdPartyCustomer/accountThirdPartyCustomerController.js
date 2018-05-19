'use strict';

angular.module('ticketsystem.accountThirdPartyCustomer', ['ngRoute'])

    .controller('accountThirdPartyCustomerCtrl', function ($scope, restService, httpService,$location) {

        $scope.disabledButton = true;
        $scope.disabledReadonly = true;

        $scope.changeAccountInformation = function() {




        };

        $scope.deleteAccount = function() {




        };

        $scope.disabledButtonHandler = function() {

            $scope.disabledButton = !($scope.disabledButton);
            $scope.disabledReadonly = !($scope.disabledReadonly);
        }







    });