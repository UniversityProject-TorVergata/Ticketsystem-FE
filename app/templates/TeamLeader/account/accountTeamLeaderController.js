'use strict';

angular.module('ticketsystem.accountTeamLeader', ['ngRoute'])

    .controller('accountTeamLeaderCtrl', function ($scope, restService, httpService, $location, storageService) {

        $scope.user = JSON.parse(storageService.get("userData"));
        $scope.disabledButton = true;
        $scope.disabledReadonly = true;

        var config = {
            headers : { 'Content-Type': 'application/json', }
        };

        $scope.changeAccountInformation = function() {

            if(angular.isUndefined($scope.user) || (
                angular.isUndefined($scope.user.fiscal_code) ||
                angular.isUndefined($scope.user.name) ||
                angular.isUndefined($scope.user.surname) ||
                angular.isUndefined($scope.user.address) ||
                angular.isUndefined($scope.user.email) ||
                angular.isUndefined($scope.user.username) ||
                angular.isUndefined($scope.user.password)) ) {

                window.alert('It is necessary to fill all the fields!')
            }
            else {

                httpService.put(restService.updateUser, $scope.user.id, $scope.user, config)
                    .then(function (response) {
                            window.alert('Account Successfully Updated!');
                            $location.path('/homeTeamLeader');
                            storageService.save("userData", JSON.stringify($scope.user));
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
        }

    });