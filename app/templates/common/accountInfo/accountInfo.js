'use strict';
/**
 *  This module allows to modify user data.
 */
angular.module('ticketsystem.accountInfo', ['ngRoute'])

    .controller('accountInfoCtrl', function ($scope, restService, httpService, $state, storageService) {

        //  TODO prenderlo direttamente nell'html?
        $scope.user = storageService.getUser();
        $scope.disabledButton = true;
        $scope.disabledReadonly = true;
        $scope.confirm_pass_value = true;

        /**
         *  This function allows to change user data.
         *  @param user updated user data
         */
        $scope.changeAccountInformation = function (user) {

            // TODO fare controlli migliori?
            if (user.fiscal_code === "" || user.name === "" || user.surname === "" ||
                user.address === "" || user.email === "" || user.username === "" ||
                user.password === "" || user.confirm_password === "") {
                window.alert('You need to fill all the fields!')
            }

            if (!angular.equals(user.password, user.confirm_password)) {
                window.alert('Password and confirm password not matching')
            }
            else {

                // HTTP PUT
                httpService.put(restService.updateUser, user.id, user)
                    .then(function (response) {
                            console.log(response)
                            window.alert('Account updated!');
                            storageService.setUser(response.data)
                            $state.reload();
                        },

                        function (err) {
                            window.alert('Update Failed!');
                            console.log(err)
                        })
            }
        };

        /**
         *  This function deletes the user data from the session and the database.
         *  @param user User to delete
         */
        $scope.deleteAccount = function (user) {

            //  HTTP DELETE
            httpService.delete(restService.deleteUser, user.id)
                .then(function (response) {
                        // TODO alert con si e no?
                        window.alert('Account Successfully Deleted!');
                        storageService.invalidateUser();
                        $state.reload();
                    },

                    function (err) {
                        window.alert('Deletion Failed!');
                        console.log(err)
                    })
        };

        $scope.disabledButtonHandler = function () {
            $scope.disabledButton = !($scope.disabledButton);
            $scope.disabledReadonly = !($scope.disabledReadonly);
            $scope.confirm_pass_value = !($scope.confirm_pass_value);
        }

    });