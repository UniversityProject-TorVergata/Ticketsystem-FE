'use strict';

angular.module('ticketsystem.createTarget', ['ngRoute'])

    .controller('createTargetCtrl', function ($scope, restService, httpService, $location, storageService) {

        var modTargetId;
        $scope.target = {};
        $scope.target.targetType = "Service";

        var config = {
            headers : {
                'Content-Type': 'application/json',
            }
        };

        /*
            Funzione per creare un nuovo Target.
            E' invocata alla pressione del tasto Insert nella view target.html
            Un JSON con i dati del nuovo prodotto è inviato con metodo POST al Back-End
            che provvederà a salvarlo nel DB.

         */
        $scope.creationTarget = function(){

            if(angular.isUndefined($scope.target) || (
                angular.isUndefined($scope.target.name) ||
                angular.isUndefined($scope.target.description) ||
                angular.isUndefined($scope.target.version)) ) {

                window.alert('It is necessary to fill all the fields!');
            }
            else {

                httpService.post(restService.createTarget, $scope.target, config)
                    .then(function (response) {
                        window.alert("Target created with success!");
                        $location.url("/homeAdmin");
                        console.log(response);
                    },
                        function error(response) {
                        window.alert("Error while creating Target!");
                        console.log("Error!" + response);
                    });
            }
        };

        /*
            Funzione che apre la view di modifica prodotto modifyTarget.html
            che viene popolata con i dati del prodotto da modificare per il quale si è premuto
            il tasto 'Modify' nella view listTarget.html

        */
        $scope.modifyTarget = function($index){

            //Salva i dati del prodotto da modificare in locale che possano essere usati
            //Per popolare la view modifyTarget.html
            storageService.save("productData",JSON.stringify($scope.items[$index]))
            //productService.set($scope.items[$index]);
            $location.url("/modifyTarget");
        };

        /*
            Funzione invocata alla creazione della pagina modifyTarget.html
            e usata per popolare la pagina con i dati del prodotto da modificare

         */
        $scope.initTargetModify = function(){

            $scope.modtarget = {};

            var target = JSON.parse(storageService.get("productData"));
            modTargetId = target.id;
            console.log(modTargetId);
            $scope.modtarget.name = target.name;
            $scope.modtarget.description = target.description;
            $scope.modtarget.version = target.version;
            $scope.modtarget.targetState = target.targetState;
            $scope.modtarget.targetType = target.targetType;
        };

        /*

            Funzione per modificare un Target.
            E' invocata alla pressione del tasto modifica nella view modifyTarget.html
            Usa il metodo PUT per inviare al Back-End i dati del Target modificato.
            L'id del Target da modificare è incatenato all'url.

         */
        $scope.putModifiedTarget = function(){

            if(angular.isUndefined($scope.modtarget) || (
                angular.isUndefined($scope.modtarget.name) ||
                angular.isUndefined($scope.modtarget.description) ||
                angular.isUndefined($scope.modtarget.version)) ) {

                window.alert('It is necessary to fill all the fields!');
            }
            else {
                var url = restService.createTarget;
                console.log($scope.modtarget);
                var targetID = JSON.parse(storageService.get("productData")).id;
                httpService.put(url, targetID, $scope.modtarget, config)
                    .then(function (response) {

                        window.alert("Target modified with success!");
                        $scope.target = "";
                        $location.url("/listTarget");
                        console.log(response);
                    },
                        function error(response) {
                        window.alert("Error while modifying Target");
                        console.log("Error!" + response);
                    });
            }
        };

        /*
            Funzione usata per inizializzare la lista dei prodotti mostrata
            nella pagina listTarget.html

         */
        $scope.listTarget = function(){
            httpService.get(restService.createTarget, config)
                .then(function (response) {
                    $scope.items = response.data;
                },
                    function error(response) {
                        $scope.errorResponse = "Error Status: " +  response.statusText;
                });
        };

        /*

            Funzione usata per "Ritirare" un Target.
            Invocata alla pressione del tasto Retire nella view listTarget.html
            Usa il metodo PUT per modificare il productState del Target da "ACTIVE" a "RETIRED"
         */
        $scope.removeTarget = function (index) {

            var removedTarget = $scope.items[index];
            var id = removedTarget.id;
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

        /*

           Funzione usata per "Riabilitare" un prodotto.
           Invocata alla pressione del tasto Rehabilitate nella view listTarget.html
           Usa il metodo PUT per modificare il productState del prodotto da "RETIRED" a "ACTIVE"
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

        /*
            Funzione usate per scegliere quale pulsante mostrare tra "RETIRE" o "REHABILITATE"
            nella view listTarget.html.

         */
        $scope.isRetired = function(index){
            if($scope.items[index].targetState === "RETIRED")
                return true;
            else
                return false;
        };


    });