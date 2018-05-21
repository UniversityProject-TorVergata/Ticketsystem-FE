'use strict';

angular.module('ticketsystem.createTicket', ['ngRoute'])

    .controller('CreateTicketCtrl', function ($scope, restService, httpService, util, $location/*, products*/) {

        //$scope.products = products;  //non immessi per ora
        $scope.ticket = {};
        $scope.items = [];
        $scope.selected = {};
        $scope.errorMessage = "";
        $scope.edit = [];
        $scope.editTicket = {}

        $scope.createTicket = function () {
            var date = Date.now();
            //TODO convertire bene
            //$scope.ticket.created_at = moment(date).format("DD/MM/YYYY");
            $scope.ticket.state = "CREATED";

            console.log($scope.ticket);
            httpService.post(restService.createTicket, $scope.ticket)
                .then(function (data) {
                        window.alert("Ticket created");
                        console.log(data);
                        $location.path('/homeThirdPartyCustomer')
                    },
                    function (err) {
                        window.alert("Error!")
                        $scope.errorMessage = "error!"
                    })
        };

        //Allegato del ticket
        $scope.selectedFile = function (event) {
            util.getBase64(event.target.files[0]).then(result => {
                console.log(result)
                $scope.ticket.attachedFile = result;
            })
        };

        $scope.readTicket = function () {
            httpService.get(restService.createTicket)
                .then(function (response) {
                    $scope.items = response.data;
                }, function error(response) {
                    $scope.risposta = "Error Status: " + response.statusText;
                });
        };

        $scope.deleteTicket = function (id) {
            httpService.delete(restService.createTicket, id)
                .then(function (data) {
                        console.log(data);
                        httpService.get(restService.createTicket)
                            .then(function (response) {
                                $scope.items = response.data;
                            }, function error(response) {
                                $scope.risposta = "Error Status: " + response.statusText;
                            });
                        window.alert("Ticket deleted")
                    },
                    function (err) {
                        $scope.errorMessage = "error!"
                    })
        };

        $scope.modifyTicket = function (item, index) {
            $scope.edit = resetIndexes($scope.edit);
            $scope.editTicket = angular.copy(item);
            $scope.edit[index] = true;


        };
        $scope.resetTicket = function (index) {
            $scope.editTicket = {}
            $scope.edit[index] = false;

        }

        $scope.saveTicket = function(ticket,index){
            let payload = {
                id: ticket.id,
                timestamp: null,
                title: ticket.title,
                description: ticket.description,
                sourceType: ticket.sourceType,
                presumedType: ticket.presumedType,
                actualType: null,
                attachedFile: null,
                mediaType: null,
                resolverUser: null,
                openerUser: null,
                target: null,
                customerPriority: null,
                actualPriority: null,
                visibility: null,
                relationships: {},
                difficulty: null,
                eventRegister: [],
                ticketComments: [],
                state:ticket.state
            }
            httpService.put(restService.createTicket,ticket.id, payload).then(
            //httpService.post(restService.createTicket,payload).then(
                function(succResponse){
                    console.log(succResponse);
                    $scope.items[index] = angular.copy(ticket);
                    $scope.editTicket={};
                    $scope.edit = resetIndexes($scope.edit);
                    httpService.get(restService.createTicket)
                        .then(function (response) {
                            $scope.items = response.data;
                            window.alert("Ticket changed")
                        }, function error(response) {
                            $scope.risposta = "Error Status: " + response.statusText;
                        });
                },
                function(errReponse){
                    console.log(errReponse)
                }
            )
        }

        $scope.getTemplate = function (row) {
            /*console.log(row);
            if (row.id === $scope.selected.id){
                return 'edit';
            }
            else
                return 'displayRow';*/
        };

        $scope.editRow = function (row) {
            $scope.selected = angular.copy(row);
        };

        $scope.reset = function () {
            $scope.selected = {};
        };

    });

function resetIndexes(arrayOfIndexes) {
    angular.forEach(arrayOfIndexes, function (value,key) {
        arrayOfIndexes[key] = false;
    })
    return arrayOfIndexes;
}
