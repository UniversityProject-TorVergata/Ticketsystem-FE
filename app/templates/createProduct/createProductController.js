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
                    // turn on flag for post successfully
                    window.alert("Product submitted with success!");
                    $location.url("/homeCompanyAdmin");

                }, function error(response) {
                    window.alert("Error while submitting product  ");

                });
            }



        };

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
                    // turn on flag for post successfully
                    window.alert("Product modified with success!");
                    $scope.product = "";
                    $location.url("/listProduct");

                }, function error(response) {
                    window.alert("Error while modifying product");

                });
            }



        };
        $scope.modproduct = {};

        $scope.modifyProduct = function($index){

            storageService.save("productData",JSON.stringify($scope.items[$index]))
            //productService.set($scope.items[$index]);
            $location.url("/modifyProduct");


        };

        $scope.initProductModify = function(){
            var product = JSON.parse(storageService.get("productData"));
            modProductId = product.id;
            console.log(modProductId);
            $scope.modproduct.name = product.name;
            $scope.modproduct.description = product.description;
            $scope.modproduct.version = product.version;
            $scope.modproduct.productState = product.productState;


        }


        $scope.listProduct = function(){
            httpService.get(restService.createProduct,config).then(function (response) {
                // turn on flag for post successfully
                $scope.items = response.data;

            }, function error(response) {
                $scope.risposta = "Error Status: " +  response.statusText;

            });
        };

        $scope.removeProduct = function (index) {

            var removedProduct = $scope.items[index];
            var id = removedProduct.id;
            var postData = {
                "id" : id,

            }
            httpService.put(restService.createProduct+"/retire",id,postData).then(function (response) {
                // turn on flag for post successfully
                $scope.items[index].productState = "RETIRED";

            }, function error(response) {

                window.alert("Error ");

            });


        };

        $scope.reabProduct = function (index) {

            var removedProduct = $scope.items[index];
            var id = removedProduct.id;
            var postData = {
                "id" : id,

            }
            httpService.put(restService.createProduct+"/reab",id,postData).then(function (response) {
                // turn on flag for post successfully
                $scope.items[index].productState = "ACTIVE";

            }, function error(response) {

                window.alert("Error");

            });


        };



        $scope.isRetired = function(index){
            if($scope.items[index].productState == "RETIRED")
                return true;
            else
                return false;

        };






    });