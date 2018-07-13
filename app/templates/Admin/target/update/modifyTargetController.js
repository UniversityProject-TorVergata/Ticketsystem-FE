'use strict';

angular.module('ticketsystem.modifyTarget', ['ngRoute'])

    .controller('modifyTargetCtrl', function ($scope, restService, httpService, $state, storageService, $modal, $log, targetTypes) {

        var modTargetId;

        // Select values
        $scope.modtargetTypes = targetTypes;

        /**
         *  Function returns the position in the array of the value of the Target who needs to be modified.
         *  @param arrayToLoop  Field's select values
         *  @param value        Value to search
         *  @returns {number}   position of the searched value
         */
        $scope.getIndexFromValue = function(arrayToLoop, value) {
            for(let i=0; i<arrayToLoop.length; i++) {
                if(arrayToLoop[i].name === value)
                    return i;
            }
        };

        /*
            Funzione invocata alla creazione della pagina modifyTarget.html
            e usata per popolare la pagina con i dati del prodotto da modificare

         */
        /**
         *  Function sets selected Target data in the form to be updated.
         */
        $scope.initTargetModify = function(){

            var target = JSON.parse(storageService.get("productData"));
            // TODO Serve?
            modTargetId = target.id;
            $scope.modtarget = angular.copy(target);
            $scope.modtags = target.categories;
        };

        /**
         *  Function modifies a Target.
         *  @param modtarget        New Target values
         *  @param modtargetType    New Target Type
         *  @param modtags          New Target Tags
         *  @param modstateMachine  New State Machine
         */
        $scope.putModifiedTarget = function(modtarget, modtargetType, modtags){

            // TODO rifare controlli
            if(angular.isUndefined(modtarget) ||
                modtarget.name === "" ||
                modtarget.description === "" ||
                modtarget.version === "" ||
                modtags.length < 1) {

                    window.alert('It is necessary to fill all the fields!');
            }
            else {

                modtarget.categories = [];
                modtarget.targetType = modtargetType.name;

                for(let i=0; i<modtags.length; i++){
                    modtarget.categories[i] = modtags[i].text;
                }

                var targetID = JSON.parse(storageService.get("productData")).id;
                httpService.put(restService.createTarget, targetID, modtarget)
                    .then(function (response) {
                        window.alert("Target modified with success!");
                        $scope.target = "";
                        $state.go('secure.listTarget');
                        console.log(response);
                    },
                        function error(response) {
                        window.alert("Error while modifying Target");
                        console.log("Error!" + response);
                    });
            }
        };

    });