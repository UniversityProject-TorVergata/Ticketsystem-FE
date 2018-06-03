'use strict';

angular.module('ticketsystem.homeCustomer', ['ngRoute'])

    .controller('homeCustomerCtrl', function ($scope, restService, httpService,$location,storageService) {

        $scope.creationTicketHome = function () {
            $location.url("/Ticket");
        }

        $scope.readTicket = function () {
            $location.url("/readTicket");
        }

        $scope.viewAccount = function () {
            $location.url("/accountCustomer");
        }

        $scope.logout = function () {
            storageService.save("userData",JSON.stringify(null));
            $location.url("/home");
        };

    });