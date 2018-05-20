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

            if ($scope.product.version.$valid) {

                httpService.post(restService.createProduct, $scope.product, config).then(function (response) {
                    // turn on flag for post successfully
                    window.alert("Product submitted with success!");

                }, function error(response) {
                    window.alert("Error while submitting product : " + response.statusText);

                });
            }
            else {
                window.alert("Version is a real number!");

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






    });