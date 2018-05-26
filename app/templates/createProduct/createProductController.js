'use strict';

angular.module('ticketsystem.createProduct', ['ngRoute'])

    .controller('createProductCtrl', function ($scope, restService, httpService,$location,storageService) {

        var modProductId;

        $scope.product = {};
        var config = {
            headers : {
                'Content-Type': 'application/json',


            }
        };

        /*
            Funzione per creare un nuovo prodotto.
            E' invocata alla pressione del tasto Insert nella view createProduct.html
            Un JSON con i dati del nuovo prodotto è inviato con metodo POST al Back-End
            che provvederà a salvarlo nel DB.

         */
        $scope.creationProduct = function(){

            if(angular.isUndefined($scope.product.name) || angular.isUndefined($scope.product.description) ||
                angular.isUndefined($scope.product.version) ) {

                window.alert('è necessario riempire tutti i campi!');
            }

            else if($scope.product.name == "" || $scope.product.description=="" ||
                $scope.product.version == "" ) {

                window.alert('fill in all the fields!');
            }
            else {

                httpService.post(restService.createProduct, $scope.product, config).then(function (response) {

                    window.alert("Product submitted with success!");
                    $location.url("/homeCompanyAdmin");

                }, function error(response) {
                    window.alert("Error while submitting product  ");

                });
            }



        };

        /*

            Funzione per modificare un prodotto.
            E' invocata alla pressione del tasto modifica nella view modifyProduct.html
            Usa il metodo PUT per inviare al Back-End i dati del prodotto modificato.
            L'id del prodotto da modificare è incatenato all'url.

         */
        $scope.putModifiedProduct = function(){

            if($scope.modproduct.name == "" || $scope.modproduct.description=="" ||
                $scope.modproduct.version == "" ) {

                window.alert('fill in all the fields!');
            }
            else {
                var url = restService.createProduct;
                console.log($scope.modproduct);
                var productID = JSON.parse(storageService.get("productData")).id;
                httpService.put(url,productID, $scope.modproduct, config).then(function (response) {

                    window.alert("Product modified with success!");
                    $scope.product = "";
                    $location.url("/listProduct");

                }, function error(response) {
                    window.alert("Error while modifying product");

                });
            }



        };
        $scope.modproduct = {};

        /*
            Funzione che apre la view di modifica prodotto modifyProduct.html
            che viene popolata con i dati del prodotto da modificare per il quale si è premuto
            il tasto 'Modify' nella view listProduct.html

         */
        $scope.modifyProduct = function($index){

            //Salva i dati del prodotto da modificare in locale che possano essere usati
            //Per popolare la view modifyProduct.html
            storageService.save("productData",JSON.stringify($scope.items[$index]))
            //productService.set($scope.items[$index]);
            $location.url("/modifyProduct");


        };

        /*
            Funzione invocata alla creazione della pagina modifyProduct.html
            e usata per popolare la pagina con i dati del prodotto da modificare

         */
        $scope.initProductModify = function(){
            var product = JSON.parse(storageService.get("productData"));
            modProductId = product.id;
            console.log(modProductId);
            $scope.modproduct.name = product.name;
            $scope.modproduct.description = product.description;
            $scope.modproduct.version = product.version;
            $scope.modproduct.productState = product.productState;


        };

        /*
            Funzione usata per inizializzare la lista dei prodotti mostrata
            nella pagina listProduct.html

         */
        $scope.listProduct = function(){
            httpService.get(restService.createProduct,config).then(function (response) {

                $scope.items = response.data;

            }, function error(response) {
                $scope.errorResponse = "Error Status: " +  response.statusText;

            });
        };

        /*

            Funzione usata per "Ritirare" un prodotto.
            Invocata alla pressione del tasto Retire nella view listProduct.html
            Usa il metodo PUT per modificare il productState del prodotto da "ACTIVE" a "RETIRED"
         */
        $scope.removeProduct = function (index) {

            var removedProduct = $scope.items[index];
            var id = removedProduct.id;
            var postData = {
                "id" : id,

            }
            httpService.put(restService.createProduct+"/retire",id,postData).then(function (response) {

                $scope.items[index].productState = "RETIRED";

            }, function error(response) {

                window.alert("Error ");

            });


        };

        /*

           Funzione usata per "Riabilitare" un prodotto.
           Invocata alla pressione del tasto Rehabilitate nella view listProduct.html
           Usa il metodo PUT per modificare il productState del prodotto da "RETIRED" a "ACTIVE"
        */

        $scope.reabProduct = function (index) {

            var removedProduct = $scope.items[index];
            var id = removedProduct.id;
            var postData = {
                "id" : id,

            }
            httpService.put(restService.createProduct+"/reab",id,postData).then(function (response) {

                $scope.items[index].productState = "ACTIVE";

            }, function error(response) {

                window.alert("Error");

            });


        };


        /*
            Funzione usate per scegliere quale pulsante mostrare tra "RETIRE" o "REHABILITATE"
            nella view listProduct.html.

         */
        $scope.isRetired = function(index){
            if($scope.items[index].productState == "RETIRED")
                return true;
            else
                return false;

        };






    });