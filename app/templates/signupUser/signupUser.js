'use strict';

angular.module('ticketsystem.signupUser', ['ngRoute'])
    .controller('SignupUserCtrl', function ($scope, restService, /*httpService,*/ $location) {
        $scope.user = {
            username: "bau90",
            email: "bau90@gmail.com",
            password: "baubau"
        }
        $scope.startSignupUser = function () {
            // console.log(username, email, password);
            /*httpService.post(restService.signupUser, $scope.user)
                .then(function (data) {
                    $location.path('/loginUser')
                    console.log(data)
                })
                */
        }
    });