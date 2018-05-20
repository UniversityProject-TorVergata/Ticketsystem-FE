'use strict';

angular.module('ticketsystem.createProduct', ['ngRoute'])

    .controller('createProductCtrl', function ($scope, restService, httpService,$location) {
        var url = "http://localhost:8200/ticketsystem/product/";

        $scope.product = {};
        var config = {
            headers : {
                'Content-Type': 'application/json',


            }
        };

        $scope.creationProduct = function(){

            httpService.post(url,$scope.product,config).then(function (response) {
                // turn on flag for post successfully
                $scope.risposta="Prodotto inserito " + response.data;

            }, function error(response) {
                $scope.risposta = "Error Status: " +  response.statusText;

            });


        };






    });