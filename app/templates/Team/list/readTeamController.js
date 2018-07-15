'use strict';
/**
 *  The module manages the created team and allows to show their information and to delete them as well.
 */
angular.module('ticketsystem.readTeam', ['ngRoute', 'ui.bootstrap'])

    .controller('readTeamCtrl', function ($scope, restService, httpService, $state, problemArea) {

        //  Select Values
        $scope.problemArea = problemArea;

        //  Modal variables
        $scope.selectedMembers = [];
        $scope.selectedLeader = {};

        /**
         * @ngdoc           function
         * @name            readTeams
         * @description     Function reads all the teams in the database via an HTTP GET
         */
        $scope.readTeams = function () {
            //  HTTP GET
            httpService.get(restService.getTeams)
                .then(function (response) {
                    $scope.teamsList = response.data;
                }, function error(response) {
                    $scope.errorResponse = "Error Status: " + response.statusText;
                    console.log(response);
                });
        };

        /**
         * @ngdoc           function
         * @name            deleteTeam
         * @description     Function deletes a selected team via an HTTP DELETE and updates the view of the table.
         *
         * @param id        id number of the ticket to be deleted.
         */
        $scope.deleteTeam = function (id) {
            httpService.delete(restService.createTeam, id)
                .then(function (data) {
                        window.alert("Team deleted with success!");
                        $scope.readTeams();
                    },
                    function (err) {
                        window.alert("Error while deleting team!");
                        $scope.errorMessage = "error!";
                        console.log(err);
                    })
        };

        /**
         * @ngdoc           function
         * @name            getLeaderById
         * @description     Function reads the team leader of a team via an HTTP GET
         */
        $scope.getLeaderById = function (id) {
            //  HTTP GET
            httpService.get(restService.getLeaderByTeamId + '/' + id)
                .then(function (response) {
                    $scope.selectedLeader = response.data;
                }, function error(response) {
                    $scope.errorResponse = "Error Status: " + response.statusText;
                });
        };

        /**
         * @ngdoc           function
         * @name            getMembersById
         * @description     Function reads all the team members of a team via an HTTP GET
         */
        $scope.getMembersById = function (id) {
            //  HTTP GET
            httpService.get(restService.getMembersByTeamId + '/' + id)
                .then(function (response) {
                    $scope.selectedMembers = response.data;
                }, function error(response) {
                    $scope.errorResponse = "Error Status: " + response.statusText;
                });
        };

        $scope.control = function (item) {
            console.log(item.id)
        };
    });