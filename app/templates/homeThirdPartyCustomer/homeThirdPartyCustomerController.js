'use strict';

angular.module('ticketsystem.homeThirdPartyCustomer', ['ngRoute'])

    .controller('homeThirdPartyCustomerCtrl', function ($scope, restService, httpService,$location,loginService) {

        $scope.creationTicketHome = function () {
            $location.url("/createTicket");
        }

        $scope.readTicket = function () {
            $location.url("/readTicket");
        }

        $scope.viewAccount = function () {
            $location.url("/accountThirdPartyCustomer");
        }

        $scope.logout = function () {
            loginService.set(null);
            $location.url("/home");
        };


    });