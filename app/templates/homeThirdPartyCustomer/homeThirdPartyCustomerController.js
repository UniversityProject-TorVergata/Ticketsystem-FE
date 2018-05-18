'use strict';

angular.module('ticketsystem.homeThirdPartyCustomer', ['ngRoute'])

    .controller('homeThirdPartyCustomerCtrl', function ($scope, restService, httpService,$location) {

        $scope.creationTicketHome = function () {
            $location.url("/createTicket");
        }

        $scope.viewAccount = function () {
            $location.url("/accountThirdPartyCustomer");
        }


    });