'use strict';

angular.module('ticketsystem.createProduct', ['ngRoute'])

    .controller('createProductCtrl', function ($scope, restService, httpService,$location) {


        $scope.product = {};
        var config = {
            headers : {
                'Content-Type': 'application/json',


            }
        };

        $scope.creationProduct = function(){

            if(angular.isUndefined($scope.product.name) || angular.isUndefined($scope.product.description) ||
                angular.isUndefined($scope.product.version)) {

                window.alert('fill in all the fields!');
            }
            else {

                httpService.post(restService.createProduct, $scope.product, config).then(function (response) {
                    // turn on flag for post successfully
                    window.alert("Product submitted with success!");
                    $scope.product = "";

                }, function error(response) {
                    window.alert("Error while submitting product : " + response.statusText);

                });
            }



        };


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
            httpService.put(restService.createProduct+"/retire/"+id,postData).then(function (response) {
                // turn on flag for post successfully
                $scope.items[index].productState = "RETIRED";

            }, function error(response) {

                window.alert("Error : " + response.statusText);

            });


        };

        $scope.reabProduct = function (index) {

            var removedProduct = $scope.items[index];
            var id = removedProduct.id;
            var postData = {
                "id" : id,

            }
            httpService.put(restService.createProduct+"/reab/"+id,postData).then(function (response) {
                // turn on flag for post successfully
                $scope.items[index].productState = "ACTIVE";

            }, function error(response) {

                window.alert("Error : " + response.statusText);

            });


        };



        $scope.isRetired = function(index){
            if($scope.items[index].productState == "RETIRED")
                return true;
            else
                return false;

        };






    });