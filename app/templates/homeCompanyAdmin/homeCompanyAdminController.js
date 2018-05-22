'use strict';

angular.module('ticketsystem.homeCompanyAdmin', ['ngRoute'])

    .controller('homeCompanyAdminCtrl', function ($scope, restService, httpService,$location,storageService) {


        $scope.insertCustomer = function () {
            $location.url("/createUser");
        };


        $scope.insertProduct = function () {
            $location.url("/createProduct");
        };
        $scope.findProduct = function () {
            $location.url("/listProduct");
        };

        $scope.viewAccount = function () {
            $location.url("/accountCompanyAdmin");
        }

        $scope.logout = function () {
            storageService.save("userData",JSON.stringify(null));
            $location.url("/home");
        };

    });