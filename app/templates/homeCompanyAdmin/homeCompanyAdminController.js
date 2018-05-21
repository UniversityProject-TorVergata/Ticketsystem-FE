'use strict';

angular.module('ticketsystem.homeCompanyAdmin', ['ngRoute'])

    .controller('homeCompanyAdminCtrl', function ($scope, restService, httpService,$location,loginService) {


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
            loginService.set(null);
            $location.url("/home");
        };

    });