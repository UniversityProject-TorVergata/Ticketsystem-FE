'use strict';

angular.module('ticketsystem.home', ['ngRoute'])

    .controller('HomeCtrl', function ($scope, restService, httpService, $location) {
        $scope.redirectLoginUser = function () {
            $location.url("/loginUser");
        },
        $scope.redirectLoginCompany = function () {
            $location.url("/loginCompany");
        },
        $scope.createTicket = function () {
            $location.url("/createTicket");
        }
    });