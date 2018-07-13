'use strict';

angular.module('ticketsystem.createTeam', ['ngRoute', 'ui.bootstrap'])

    .controller('createTeamCtrl', function ($scope, restService, httpService, $state, problemArea,
                                            teamleaders, teammembers) {

        //  Select values
        $scope.problemArea = problemArea;
        $scope.membersList = teammembers;
        $scope.leadersList = teamleaders;

        /**
         * @ngdoc           function
         * @name            createTeam
         * @description     Function creates a team in the database via an HTTP POST and update internal user's team
         */
        $scope.createTeam = function (team, members) {

            if (angular.isUndefined(team.name) ||
                angular.isUndefined(team.problemArea) ||
                members.length < 1) {

                window.alert("Fill in all the fields!");

            }
            else {

                team.problemArea = team.problemArea.name;
                team.teamMemberList = members;

                //  HTTP POST
                httpService.post(restService.createTeam, team)
                    .then(function (data) {
                            window.alert("Team created!");
                            console.log(data);
                            $state.reload();
                        },
                        function (err) {
                            window.alert("Error!")
                            $scope.errorMessage = "error!"
                        });
            }
        };

    });