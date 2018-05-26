'use strict';

angular.module('ticketsystem.homeThirdPartyCustomer', ['ngRoute'])

    .controller('homeThirdPartyCustomerCtrl', function ($scope, restService, httpService,$location,storageService) {

        $scope.creationTicketHome = function () {
            $location.url("/Ticket");
        }

        $scope.readTicket = function () {
            $location.url("/readTicket");
        }

        $scope.viewAccount = function () {
            $location.url("/accountThirdPartyCustomer");
        }

        $scope.logout = function () {
            storageService.save("userData",JSON.stringify(null));
            $location.url("/home");
        };

    });