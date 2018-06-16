'use strict';

angular.module('ticketsystem.accountInfo', ['ngRoute'])

    // TODO rifare che è stutto sbagliato (abuso di scope)
    .controller('accountInfoCtrl', function ($scope, restService, httpService,$location,storageService) {

        $scope.user = storageService.getUser()
        $scope.disabledButton = true;
        $scope.disabledReadonly = true;
        $scope.confirm_pass_value = true;

        var config = {
            headers : { 'Content-Type': 'application/json', }
        };

        $scope.changeAccountInformation = function() {

            if( angular.isUndefined($scope.user) ||
                angular.isUndefined($scope.user.fiscal_code) ||  $scope.user.fiscal_code === "" ||
                angular.isUndefined($scope.user.name) || $scope.user.name === "" ||
                angular.isUndefined($scope.user.surname) || $scope.user.surname === "" ||
                angular.isUndefined($scope.user.address) || $scope.user.address === "" ||
                angular.isUndefined($scope.user.email) || $scope.user.email === "" ||
                angular.isUndefined($scope.user.username) || $scope.user.username === "" ||
                angular.isUndefined($scope.user.password) || $scope.user.password === "" ||
                angular.isUndefined($scope.user.confirm_password)|| $scope.user.confirm_password === "")
            {
                window.alert('It is necessary to fill all the fields!')

            }
            else if(!angular.equals($scope.user.password, $scope.user.confirm_password)) {
                window.alert('Password and confirm password not matching')
            }
            else {

                httpService.put(restService.updateUser, $scope.user.id, $scope.user, config)
                    .then(function (response) {
                            window.alert('Account Successfully Updated!');
                            $location.path('/homeAdmin');
                            storageService.save("userData",JSON.stringify($scope.user));
                            console.log(response)
                        },

                        function (err) {
                            window.alert('Update Failed!');
                            console.log("Error!\n");
                            console.log(err)
                        })
            }
        };

        $scope.deleteAccount = function() {

            httpService.delete(restService.deleteUser, $scope.user.id, config)
                .then(function (response) {
                        window.alert('Account Successfully Deleted!');
                        $location.path('/home');
                        console.log(response)
                    },

                    function (err) {
                        window.alert('Deletion Failed!');
                        console.log("Error!\n");
                        console.log(err)
                    })
        };

        $scope.disabledButtonHandler = function() {

            $scope.disabledButton = !($scope.disabledButton);
            $scope.disabledReadonly = !($scope.disabledReadonly);
            $scope.confirm_pass_value = !($scope.confirm_pass_value);
        }

    });