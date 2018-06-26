'use strict';

angular.module('ticketsystem.listTarget', ['ngRoute'])

    .controller('listTargetCtrl', function ($scope, restService, httpService, $state, storageService, $modal, $log) {

        var modTargetId;

        // Select values
        $scope.modtargetTypes = targetTypes;
        $scope.modstateMachines = stateMachines;

        /**
         *  Function modifies the Target via a new view.
         *  @param $index
         */
        $scope.modifyTarget = function($index){
            //  Saved data for the modifytarget's view
            storageService.save("productData", JSON.stringify($scope.items[$index]))
            $state.go('secure.modifyTarget');
        };


        /**
         *  Functions reads the Targets and shows them in the table.
         */
        $scope.listTarget = function(){
            httpService.get(restService.createTarget)
                .then(function (response) {
                    $scope.items = response.data;
                },
                    function error(response) {
                        $scope.errorResponse = "Error Status: " +  response.statusText;
                });
        };


        // TODO Rehab-Remove possono essere fuse insieme
        /**
         *  Function sets a Target as "Unavailable" via an HTTP PUT.
         *  @param index    id row of the Target
         */
        $scope.removeTarget = function (index) {

            var removedTarget = $scope.items[index];
            var id = removedTarget.id;

            // TODO ???
            var postData = {
                "id" : id,
            };

            httpService.put(restService.createTarget + "/retire", id, postData)
                .then(function (response) {
                    $scope.items[index].targetState = "RETIRED";
                    window.alert('Target Retired Successfully!');
                    console.log(response);
                },
                    function error(response) {
                        window.alert("Error while Retiring Target!");
                        console.log("Error!" + response);
                });
        };

        /**
         *  Function sets an unavailable Target as "Available" again via an HTTP PUT.
         *  @param index    id row of the Target
         */
        $scope.rehabTarget = function (index) {

            var removedTarget = $scope.items[index];
            var id = removedTarget.id;
            var postData = {
                "id" : id,

            };
            httpService.put(restService.createTarget + "/rehab", id, postData)
                .then(function (response) {
                    $scope.items[index].targetState = "ACTIVE";
                    window.alert('Target Activated Successfully!');
                    console.log(response);
                },
                    function error(response) {
                        window.alert("Error while Target Activation!");
                        console.log("Error!" + response);
                });
        };

        /**
         *  Function checks if a Target is "Unavailable" or not.
         *  @param index        id row to check
         *  @returns {boolean}  true is the Target is "Unavailable", false otherwise
         */
        $scope.isRetired = function(index){
            if($scope.items[index].targetState === "RETIRED")
                return true;
            else
                return false;
        };
    });