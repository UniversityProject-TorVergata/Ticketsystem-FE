'use strict';

var app = angular.module('ticketsystem.createTicket', ['ngRoute', 'ui.bootstrap']);
app.controller('CreateTicketCtrl', function ($scope, $state, restService, httpService, util,
                                             $location, storageService, tags,priorities,visibilities) {
    //  Select values
    $scope.tags = tags;

    //  Variables
    $scope.ticket = {};
    $scope.items = [];
    $scope.targetList = [];
    $scope.relatedCategories = [];
    $scope.selectedCategories = [];
    $scope.showCategoriesOnDisplay = false;
    $scope.selected = {};
    $scope.errorMessage = "";
    $scope.edit = [];
    $scope.editTicket = {};
    $scope.selectedTags = [];

    // Ui Select Values
    $scope.target = {};
    $scope.target.selected ;
    $scope.category = {};
    $scope.category.selected ;
    $scope.priorities = priorities;
    $scope.priority = {};
    $scope.priority.selected ;
    $scope.visibilities = visibilities;
    $scope.visibility = {};
    $scope.visibility.selected ;




    /**
     *  Function creates a ticket in the database via an HTTP POST.
     */
    $scope.createTicket = function () {

        if (Object.keys($scope.selectedTags).length < 1) {
            window.alert("Insert at least 1 tag");
        }

        else if (Object.keys($scope.selectedTags).length > 5) {
            window.alert("Insert max 5 tags");
        }

        else if(angular.isUndefined($scope.ticket.title) ||
            angular.isUndefined($scope.ticket.description) ||
            angular.isUndefined($scope.target.selected ) ||
            angular.isUndefined($scope.category.selected)){
            window.alert("Fill in all the fields!")

        }

        else {
            /*
                This change allows you to send the tags as strings to the backend
                instead of the entire json object
             */
            let tempTags = [];
            let tempCategories = [];
            for (let i = 0; i < $scope.selectedTags.length; i++) {
                tempTags.push($scope.selectedTags[i].name);
            }
            $scope.ticket.tags = tempTags;
            console.log($scope.selectedTags);

            for (let a = 0; a < Object.keys($scope.selectedCategories).length; a++) {
                console.log($scope.selectedCategories[a]['name']);
                tempCategories.push($scope.selectedCategories[a].name);
            }
            $scope.ticket.target = $scope.target.selected;
            $scope.ticket.presumedType =  $scope.category.selected;
            $scope.ticket.target.categories = tempCategories;
            $scope.ticket.customerPriority = $scope.priority.selected.name;
            $scope.ticket.visibility = $scope.visibility.selected.name;
            //console.log($scope.selectedCategories);
            console.log(tempCategories);

            //  Assign the ticket creation date
            var date = Date.now();
            $scope.ticket.timestamp = moment(date).format("DD/MM/YYYY");

            /*
                Assign the ticket openerUser.
                IMPORTANT:
                you have to be logged in through the login window,
                otherwise the storageService cannot save user data
             */
            $scope.ticket.openerUser = JSON.parse(localStorage.getItem('userInformation'));

            //  HTTP POST
            httpService.post(restService.createTicket, $scope.ticket)
                .then(function (data) {
                        window.alert("Ticket created");
                        console.log(data);
                        $state.reload();
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
        httpService.get(restService.readMyTickets + '/' + JSON.parse(localStorage.getItem('userInformation')).id)
            .then(function (response) {
                $scope.items = response.data;
                for (let i = 0; i < $scope.items.length; i++) {

                    // Stato attuale del Ticket:
                    $scope.items[i].state = $scope.items[i].stateMachine.currentState;
                }
            }, function error(response) {
                $scope.errorResponse = "Error Status: " + response.statusText;
            });
    };


    $scope.findTargets = function () {
        //  HTTP GET
        httpService.get(restService.readTargets)
            .then(function (response) {
                $scope.targetList = response.data;
            }, function error(response) {
                $scope.errorResponse = "Error Status: " + response.statusText;
            });
    };

    $scope.showCategories = function (i) {
        if (i == null) {
            $scope.showCategoriesOnDisplay = false;
        } else {
            $scope.showCategoriesOnDisplay = true;
            $scope.relatedCategories = i['categories'];
        }
    };


    let findAction = function (string, ticket) {
        //  Trovo l'azione che corrisponde allo stato DISCARDED
        let action = "";
        let allStates = ticket.stateMachine.allStates;
        for (let i = 0; i < Object.keys(allStates).length; i++) {
            if (allStates[i].currentState === ticket.stateMachine.currentState) {
                for (let j = 0; j < Object.keys(allStates[i].newTransitionMap).length; j++) {
                    action = "Action" + (j+1).toString();
                    if (allStates[i].newTransitionMap[action].nextState == string) {
                        break;
                    }
                }
            }
        }
        return action;
    };

    $scope.closeTicket = function (ticket) {
        let action = findAction("CLOSED", ticket);

        //  imposto come resolverUser lo stesso che ha mandato indietro il ticket, ovvero
        //  il TeamCoordinato
        httpService.post(restService.changeTicketState + '/' + ticket.id + '/' + action + '/' + ticket.resolverUser.id)
            .then(function (data) {

                },
                function (err) {

                })

        $state.reload();
    };


    /**
     *  Function deletes a selected ticket via an HTTP DELETE and updates the view of the table.
     *  @param id   id number of the ticket to be deleted.
     */
    $scope.deleteTicket = function (ticket) {

        let action = findAction("DISCARDED", ticket);

        //  imposto come resolverUser lo stesso che ha mandato indietro il ticket, ovvero
        //  il TeamCoordinato
        httpService.post(restService.changeTicketState + '/' + ticket.id + '/' + action + '/' + ticket.resolverUser.id)
            .then(function (data) {

                },
                function (err) {

                })

        $state.reload();
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
        $scope.index=index;
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
            timestamp: ticket.timestamp,
            title: ticket.title,
            description: ticket.description,
            sourceType: ticket.sourceType,
            presumedType: ticket.presumedType,
            actualType: ticket.actualType,
            attachedFile: ticket.attachedFile,
            mediaType: ticket.mediaType,
            resolverUser: ticket.resolverUser,
            openerUser: ticket.openerUser,
            target: ticket.target,
            customerPriority: ticket.customerPriority,
            actualPriority: ticket.actualPriority,
            visibility: ticket.visibility,
            relationships: {},
            difficulty: ticket.difficulty,
            eventRegister: [],
            ticketComments: ticket.ticketComments,
            //state:ticket.state,
            tags: ticket.tags
        };

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
};
