'use strict';

var app = angular.module('ticketsystem.createTicket', ['ngRoute', 'ui.bootstrap']);
app.controller('CreateTicketCtrl', function ($scope, $state, restService, httpService, util,
                                             storageService, tags, priorities, visibilities,
                                             activeTargets) {
    //  Select values
    $scope.tags = tags;
    $scope.targets = activeTargets;
    $scope.priorities = priorities;
    $scope.visibilities = visibilities;
    $scope.relatedCategories = [];

    //  Variables
    $scope.showCategoriesOnDisplay = false;

    /**
     * @ngdoc           function
     * @name            createTicket
     * @description     Function creates a ticket in the database via an HTTP POST.
     */
    $scope.createTicket = function (ticket, selectedTags, customerPriority, visibility) {

        if (Object.keys(selectedTags).length < 1) {
            window.alert("Insert at least 1 tag");
        }

        else if (Object.keys(selectedTags).length > 5) {
            window.alert("Insert max 5 tags");
        }

        else if (angular.isUndefined(ticket.title) ||
            angular.isUndefined(ticket.description) ||
            angular.isUndefined(ticket.target) ||
            angular.isUndefined(ticket.presumedType)) {
            window.alert("Fill in all the fields!")
        }

        else {

            ticket.attachedFile = $scope.attachedFile;
            ticket.customerPriority = customerPriority.name;
            ticket.openerUser = JSON.parse(localStorage.getItem('userInformation'));
            ticket.tags = setArrayField(selectedTags);
            ticket.timestamp = moment(Date.now()).format("DD/MM/YYYY");
            ticket.visibility = visibility.name;

            console.log(ticket)

            //  HTTP POST
            httpService.post(restService.createTicket, ticket)
                .then(function (data) {
                        window.alert("Ticket created");
                        console.log(data);
                        $scope.attachedFile = "";
                        $scope.ticket = "";
                        $scope.selectedTags = [];
                        $scope.customerPriority = "";
                        $scope.visibility = "";
                    },
                    function (err) {
                        window.alert("Error!")
                        $scope.errorMessage = "error!"
                    })
        }
    };

    /**
     * @ngdoc           function
     * @name            selectedFile
     * @description     Function converts image in base64 string and saves it in the ticket.
     *
     * @param event    event containing the file
     */
    $scope.selectedFile = function (event) {
        util.getBase64(event.target.files[0])
            .then(result => {
                $scope.attachedFile = result;
            })
    };

    /**
     * @ngdoc           function
     * @name            showCategories
     * @description     Function gets and shows the categories of the selected target.
     *
     * @param target    the target of which to show the categories
     */
    $scope.showCategories = function (target) {
        if (target == null) {
            $scope.showCategoriesOnDisplay = false;
        } else {
            $scope.showCategoriesOnDisplay = true;
            $scope.relatedCategories = target['categories'];
        }
    };
});

/**
 * @ngdoc               function
 * @name                setArrayField
 * @description         Function for setting a field with an array
 *
 * @param arrayToLoop
 * @returns {Array}
 */

function setArrayField(arrayToLoop) {
    let arrayLooped = [];
    for (let i = 0; i < Object.keys(arrayToLoop).length; i++) {
        arrayLooped.push(arrayToLoop[i].name);
    }
    return arrayLooped;
}

/**
 * @ngdoc                   function
 * @name                    resetindexes
 * @description             Function resets the index used for the 'Modify' function.
 *
 * @param arrayOfIndexes    items' indexes
 * @returns {*}             reset items' indexes
 */
function resetIndexes(arrayOfIndexes) {
    angular.forEach(arrayOfIndexes, function (value, key) {
        arrayOfIndexes[key] = false;
    });
    return arrayOfIndexes;
};
