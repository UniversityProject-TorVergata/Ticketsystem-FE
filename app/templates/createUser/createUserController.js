'use strict';

angular.module('ticketsystem.createUser', ['ngRoute'])
    .controller('createUserCtrl', function ($scope, restService, /*httpService,*/ $location) {
        $scope.user = {
            username: "bau90",
            email: "bau90@gmail.com",
            password: "baubau"
        }
        $scope.creationUser = function () {
            // console.log(username, email, password);
            /*httpService.post(restService.createUser, $scope.user)
                .then(function (data) {
                    $location.path('/loginUser')
                    console.log(data)
                })
                */
        }
    });