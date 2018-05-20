'use strict';

angular.module('ticketsystem.homeCompanyAdmin', ['ngRoute'])

    .controller('homeCompanyAdminCtrl', function ($scope, restService, httpService,$location) {

        $scope.insertCustomer = function () {
            $location.url("/createUser");
        };


        $scope.insertProduct = function () {
            $location.url("/createProduct");
        };
        $scope.findProduct = function () {
            $location.url("/listProduct");
        };





    });