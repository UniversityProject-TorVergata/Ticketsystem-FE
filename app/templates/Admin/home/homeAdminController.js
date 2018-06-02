'use strict';

angular.module('ticketsystem.homeAdmin', ['ngRoute'])

    .controller('homeAdminCtrl', function ($scope, restService, httpService,$location,storageService) {


        $scope.insertCustomer = function () {
            $location.url("/create");
        };


        $scope.insertProduct = function () {
            $location.url("/product");
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