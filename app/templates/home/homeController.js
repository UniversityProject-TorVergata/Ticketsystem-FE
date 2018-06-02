'use strict';

angular.module('ticketsystem.home', ['ngRoute'])

    .controller('HomeCtrl', function ($scope, restService, httpService, $location) {
        $scope.redirectLoginUser = function () {
            $location.url("/Login");
        }
    });