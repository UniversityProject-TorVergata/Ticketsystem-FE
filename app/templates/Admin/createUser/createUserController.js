'use strict';

angular.module('ticketsystem.createUser', ['ngRoute'])

    .controller('createUserCtrl', function ($scope, restService, httpService, $state, userTypes) {

        $scope.userType = {};
        $scope.userType.selected;


        //  Select values
        $scope.userTypes = userTypes;

        //  Function creates a new user in the database via an http POST.
        $scope.creationUser = function (user, atype) {



            //  TODO controlli più sensati
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


                user.created_at = moment(Date.now()).format("DD/MM/YYYY");
                user['@type'] = atype.name;

                //  HTTP POST
                httpService.post(restService.createUser, user)
                    .then(function (data) {
                            window.alert('Successful registration!');
                            //  Resettare i campi dopo creazione
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