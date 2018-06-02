'use strict';

var app = angular.module('ticketsystem.createTicket', ['ngRoute', 'ui.bootstrap']);

app.controller('CreateTicketCtrl', function ($scope, restService, httpService, util, $location, storageService,
                                             categories, priorities, tags, targets, visibilities) {
    //  TODO cancellare
    $scope.tags = tags;
    $scope.priorities = priorities;
    $scope.targets = targets;
    $scope.categories = categories;
    $scope.visibilities = visibilities;

    //  Variables
    let showCategoriesOnDisplay = false;
    $scope.ticket = {};
    $scope.items = [];
    $scope.targetList = [];

    $scope.relatedCategories = [];
    $scope.selectedCategories = [];

    $scope.selected = {};
    $scope.errorMessage = "";
    $scope.edit = [];
    $scope.editTicket = {};
    $scope.tempCategories = [];


    /**
     *  Function creates a ticket in the database via an HTTP POST.
     */
    $scope.createTicket = function (ticket, selectedTags, selectedCategories, priority, visibility) {

        ticket.customerPriority = priority.name;
        ticket.visibility = visibility.name;


        if (Object.keys(selectedTags).length < 1 &&
            Object.keys(selectedTags).length > 5) {
            window.alert("Insert at least 1 tag and max 5 tags");
        }
        else {

            let tempTags = [];
            let tempCategories = [];
            /*
                A new ticket has always state 'NEW'
                but whe set this attribute to 'PENDING' because we have
                to see the ticket into the dispatcher window.
            */
            //  TODO Implements this mechanism on the backend side
            $scope.ticket.state = "PENDING";

            /*
                This change allows you to send the sourceType as a string to the backend
                instead of the entire json object
             */
            //$scope.ticket.sourceType = $scope.ticket.sourceType.name;

            //  As mentioned above for the sourceType
            for (let i = 0; i < selectedTags.length; i++)
                tempTags.push(selectedTags[i].name);
            ticket.tags = tempTags;

            JSON.stringify(selectedCategories)

            for (let a = 0; a < Object.keys(selectedCategories).length; a++)
                tempCategories.push(selectedCategories[a].name);

            ticket.target.categories = tempCategories;

            //  Assign the ticket creation date
            var date = Date.now();
            ticket.timestamp = moment(date).format("DD/MM/YYYY");

            /*
                Assign the ticket openerUser.
                IMPORTANT:
                you have to be logged in through the login window,
                otherwise the storageService cannot save user data
             */
            ticket.openerUser = JSON.parse(storageService.get("userData"));

            console.log(ticket);

            //  HTTP POST
            httpService.post(restService.createTicket, $scope.ticket)
                .then(function (data) {
                        window.alert("Ticket created");
                        console.log(data);
                        $location.path('/homeCustomer')
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

    $scope.showCategories = function (target) {
        if (target == null) {
            $scope.showCategoriesOnDisplay = false;
        } else {
            $scope.showCategoriesOnDisplay = true;
            $scope.relatedCategories = target['categories'];
        }
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
        $scope.index = index;
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
    $scope.saveTicket = function (ticket, index) {

        //  Required ticket fields
        let payload = {
            id: ticket.id,
            timestamp: ticket.timestamp,
            title: ticket.title,
            description: ticket.description,
            sourceType: ticket.sourceType,
            presumedType: ticket.presumedType,
            actualType: null,
            attachedFile: ticket.attachedFile,
            mediaType: null,
            resolverUser: null,
            openerUser: ticket.openerUser,
            target: ticket.target,
            customerPriority: ticket.customerPriority,
            actualPriority: null,
            visibility: ticket.visibility,
            relationships: {},
            difficulty: null,
            eventRegister: [],
            ticketComments: [],
            state: ticket.state,
            tags: ticket.tags
        }

        //  HTTP PUT
        httpService.put(restService.createTicket, ticket.id, payload)
            .then(function (succResponse) {
                    $scope.items[index] = angular.copy(ticket);
                    $scope.editTicket = {};
                    $scope.edit = resetIndexes($scope.edit);
                    $scope.readTicket();
                },
                function (errReponse) {
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
 *  Controller used for the modal
 */
app.controller("modalAccountFormController", ['$scope', '$modal', '$log',

    /**
     *  Function used to show the modal popup
     *  @param $scope   general $scope
     *  @param $modal   general $modal
     *  @param $log     general $log
     */
    function ($scope, $modal, $log) {

        //  showEditForm: modal for editing ticket
        $scope.showEditForm = function (item) {
            $scope.message = "Show Form Button Clicked";
            console.log($scope.message);
            $scope.formItem = item;   //  save the item to modify it

            var modalInstance = $modal.open({
                templateUrl: '/templates/Ticket/modal-form.html',
                controller: ModalInstanceCtrl,
                scope: $scope,
                resolve: {
                    userForm: function () {
                        return $scope.userForm;
                    }
                }
            });

            modalInstance.result.then(function (selectedItem) {
                $scope.selected = selectedItem;
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        };
        //  showInfoForm:   modal for see the details about the ticket
        $scope.showInfoForm = function (item) {
            $scope.message = "Show Form Button Clicked";
            console.log($scope.message);
            $scope.formItem = item;
            console.log(item);


            var modalInstance = $modal.open({
                templateUrl: '/templates/Ticket/modal-info.html',
                controller: ModalInstanceCtrl,
                scope: $scope,
                resolve: {
                    userForm: function () {
                        return $scope.userForm;
                    }
                }
            });

            modalInstance.result.then(function (selectedItem) {
                $scope.selected = selectedItem;
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        };

    }]);

var ModalInstanceCtrl = function ($scope, $modalInstance, userForm) {
    $scope.form = {};
    $scope.submitForm = function () {
        if ($scope.form.userForm.$valid) {
            console.log('user form is in scope');
            $scope.saveTicket($scope.editTicket, $scope.index);
            $modalInstance.close('closed');
        } else {
            console.log('userform is not in scope');
        }
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
};

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
