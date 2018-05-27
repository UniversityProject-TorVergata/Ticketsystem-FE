'use strict';

angular.module('ticketsystem.createTicket', ['ngRoute'])

    .controller('CreateTicketCtrl', function ($scope, restService, httpService, util, $location,
                                              products, sourceTypes, tags) {
        //  Select values
        $scope.products = products;
        $scope.sourceTypes = sourceTypes;
        $scope.tags = tags;

        //  Variables
        $scope.ticket = {};
        $scope.items = [];
        $scope.selected = {};
        $scope.errorMessage = "";
        $scope.edit = [];
        $scope.editTicket = {};
        $scope.selectedTags = [];


        /**
         *  Function creates a ticket in the database via an HTTP POST.
         */
        $scope.createTicket = function () {

            if (Object.keys($scope.selectedTags).length < 1) {
                window.alert("Devi metterne 1 almeno STRONZO");
            }

            else if (Object.keys($scope.selectedTags).length > 5) {
                window.alert("Non piu di 5 BASTARDO");
            }

            else {

                //  A new ticket has always state 'NEW'
                $scope.ticket.state = "NEW";

                //  HTTP POST
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
            }
        };

        /**
         *  Function converts image in base64 string and saves it in the ticket.
         *  @param event    event containing the file
         */
        $scope.selectedFile = function (event) {
            util.getBase64(event.target.files[0])
                .then(result => {
                    $scope.ticket.attachedFile = result;
                })
        };

        /**
         *  Function reads all the tickets in the database via an HTTP GET and shows them in a table.
         */
        $scope.readTicket = function () {
            //  HTTP GET
            httpService.get(restService.createTicket)
                .then(function (response) {
                    $scope.items = response.data;
                }, function error(response) {
                    $scope.errorResponse = "Error Status: " + response.statusText;
                });
        };

        /**
         *  Function deletes a selected ticket via an HTTP DELETE and updates the view of the table.
         *  @param id   id number of the ticket to be deleted.
         */
        $scope.deleteTicket = function (id) {
            httpService.delete(restService.createTicket, id)
                .then(function (data) {
                        $scope.readTicket();
                        window.alert("Ticket deleted")
                    },
                    function (err) {
                        $scope.errorMessage = "error!"
                    })
        };

        /**
         *  Function used for saving an edited ticket.
         *  @param item     selected item
         *  @param index    iterator offset
         */
        $scope.modifyTicket = function (item, index) {
            $scope.edit = resetIndexes($scope.edit);
            $scope.editTicket = angular.copy(item);
            $scope.edit[index] = true;
        };

        /**
         *  Function used for aborting a ticket editing.
         *  @param index   iterator offset
         */
        $scope.resetTicket = function (index) {
            $scope.editTicket = {}
            $scope.edit[index] = false;
        }

        /**
         *  Function saves a modified ticket via an HTTP PUT in the database and updates the view of the table.
         *  @param item     selected item
         *  @param index    iterator offset
         */
        $scope.saveTicket = function(ticket,index){

            //  Required ticket fields
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

            //  HTTP PUT
            httpService.put(restService.createTicket,ticket.id, payload)
                .then( function(succResponse){
                    $scope.items[index] = angular.copy(ticket);
                    $scope.editTicket={};
                    $scope.edit = resetIndexes($scope.edit);
                    $scope.readTicket();
                },
                function(errReponse){
                    console.log(errReponse)
                }
            )
        };

        /**
         *  Function used for downloading the saved image os the ticket.
         *  @param item     selected item
         *  @param index    iterator offset
         */
        $scope.showImage = function (item, index) {
            util.postBase64(item).then(result => {
                // Append the <a/> tag and remove it after automatic click for the download
                document.body.appendChild(result);
                result.click();
                document.body.removeChild(result);
            })
        }
    });

/**
 *  Function resets the index used for the 'Modify' function.
 *  @param arrayOfIndexes   items' indexes
 *  @returns {*}   reset items' indexes
 */
function resetIndexes(arrayOfIndexes) {
    angular.forEach(arrayOfIndexes, function (value, key) {
        arrayOfIndexes[key] = false;
    })
    return arrayOfIndexes;
}
