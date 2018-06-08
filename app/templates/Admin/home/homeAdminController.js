'use strict';
// TODO Inutile ora
angular.module('ticketsystem.homeAdmin', ['ngRoute'])

    .controller('homeAdminCtrl', function ($scope, restService, httpService, $location, storageService) {

        $scope.insertTarget = function () {
            $location.url("/createTarget");
        };
        $scope.findTarget = function () {
            $location.url("/listTarget");
        };

        $scope.logout = function () {
            storageService.save("userData",JSON.stringify(null));
            $location.url("/home");
        };

    });