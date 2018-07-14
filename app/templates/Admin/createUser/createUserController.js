'use strict';
//  TODO Restituire l'errore se è già registrato.
//  TODO clear field che è l ostesso per tutti i createUser
/**
 *  This module mannages the creation of a new user.
 */
angular.module('ticketsystem.createUser', ['ngRoute'])
    .controller('createUserCtrl', function ($scope, restService, httpService, $state, userTypes) {

        // Select values
        $scope.userTypes = userTypes;

        /**
         * @ngdoc           function
         * @name            creationUser
         * @description     Function creates a new user in the database via an HTTP POST.
         *
         * @param user      user to create
         * @param userType     type of the user
         */
        $scope.creationUser = function (user, userType) {

            if (angular.isUndefined(user) ||
                user.fiscal_code === "" ||
                user.name  === "" ||
                user.surname  === "" ||
                user.address === "" ||
                user.email  === "" ||
                user.username  === "" ||
                user.password  === "" ) {

                window.alert('Some fields are missing!')
            }
            else {
                // Set date and user type
                user['@type'] = userType.name;

                //HTTP POST
                httpService.post(restService.createUser, user)
                    .then(function (data) {
                            window.alert('Successful registration!');
                            $state.reload('secure.createUser');
                        },

                        function (err) {
                            window.alert('Registration failed! Try again!');
                            console.log("Error!\n");
                            console.log(err)
                        })
            }
        }
    });