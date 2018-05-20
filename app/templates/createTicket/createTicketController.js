'use strict';

angular.module('ticketsystem.createTicket', ['ngRoute'])

    .controller('CreateTicketCtrl', function ($scope, restService, httpService, util/*, products*/) {

        //$scope.products = products;
        $scope.ticket = {};
        $scope.errorMessage = ""
        /*$scope.startLoginUser = function () {
            console.log($scope.ticket);
            httpService.post(restService.createTicket, $scope.ticket)
                .then(function (data) {
                        console.log(data)
                    },
                    function (err) {
                        $scope.errorMessage = "error!"
                    })
        };*/
        $scope.createTicket = function () {
            var date = Date.now();
            //TODO convertire bene
            $scope.ticket.created_at = date;
            $scope.ticket.state = "CREATED";

            // TODO correggere 'sta zozzata
            //$scope.ticket.target = 1
            console.log($scope.ticket);
            httpService.post(restService.createTicket, $scope.ticket)
                .then(function (data) {
                        console.log(data)
                        //$location.path('/table')
                    },
                    function(err){
                        $scope.errorMessage = "error!"
                    })
        };

        $scope.selectedFile = function (event) {
            util.getBase64(event.target.files[0]).then(result => {
                console.log(result)
                $scope.ticket.attachedFile = result;
            })
        };

        $scope.readTicket = function(){
            httpService.get(restService.createTicket)
                .then(function(response) {
                $scope.items = response.data;
            }, function error(response) {
                $scope.risposta = "Error Status: " +  response.statusText;
            });
        };

        $scope.deleteTicket = function(id){
            httpService.delete(restService.createTicket, id)
                .then(function (data) {
                        console.log(data)
                    },
                    function(err){
                        $scope.errorMessage = "error!"
                    })
        };

        $scope.modifyTicket = function(id){
        };

    });