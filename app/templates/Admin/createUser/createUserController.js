'use strict';

//TODO ridefinire tutto... Abuso di Scope
//TODO Implementare inserimento di @type

angular.module('ticketsystem.createUser', ['ngRoute'])

    .controller('createUserCtrl', function ($scope, restService, httpService, $location) {

        //  TODO controlli più sensati
        $scope.creationUser = function (user) {

            if( angular.isUndefined(user) ||
                angular.isUndefined(user.fiscal_code) ||
                angular.isUndefined(user.name) ||
                angular.isUndefined(user.surname) ||
                angular.isUndefined(user.address) ||
                angular.isUndefined(user.email) ||
                angular.isUndefined(user.username) ||
                angular.isUndefined(user.password)) {

                    window.alert('Some fields are missing!')
            }
            else {

                var date = Date.now();
                user.created_at = moment(date).format("DD/MM/YYYY");

                // HTTP POST
                httpService.post(restService.createUser, user)
                    .then(function (data) {
                            window.alert('Successful registration!');
                            $state.go('secure.createUser');
                        },

                        function (err) {
                            window.alert('Registration failed! Try again!');
                            console.log("Error!\n");
                            console.log(err)
                        })
            }
        }
    });