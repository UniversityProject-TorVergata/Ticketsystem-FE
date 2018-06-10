'use strict';

angular.module('ticketsystem.createTeam', ['ngRoute','ui.bootstrap'])

    .controller('createTeamCtrl', function ($scope, restService, httpService, $location, problemArea) {

        // Variables
        $scope.membersList = [];
        $scope.leadersList = [];
        $scope.problemArea = problemArea;
        $scope.selectedMembers = [];
        $scope.tempMembers = [];
        $scope.selectedLeader = [];
        $scope.tempLeader = [];
        $scope.teamsList = [];
        $scope.edit = [];


        $scope.leader = {};
        $scope.members = [];
        $scope.area = {};
        $scope.team = {};
        $scope.editTeam = {};

        $scope.control = function (item) {
            console.log(item.id)
        };

        /**
         *  Function reads all the team leaders in the database via an HTTP GET
         */
        $scope.readTeamLeaders = function () {
            //  HTTP GET
            httpService.get(restService.getTeamLeaders)
                .then(function (response) {
                    $scope.leadersList = response.data;
                }, function error(response) {
                    $scope.errorResponse = "Error Status: " + response.statusText;
                });
            //console.log($scope.leadersList[1]);
        };

        /**
         *  Function reads all the team members in the database via an HTTP GET
         */
        $scope.readTeamMembers = function () {
            //  HTTP GET
            httpService.get(restService.getTeamMembers)
                .then(function (response) {
                    $scope.membersList = response.data;
                    console.log($scope.membersList);
                }, function error(response) {
                    $scope.errorResponse = "Error Status: " + response.statusText;
                });
            //console.log($scope.membersList[1]);
        };

        /**
         *  Function creates a team in the database via an HTTP POST and update internal user's team
         */
        $scope.createTeam = function (team, member) {
                team.problemArea = team.problemArea.name;
                console.log(team.problemArea);
                console.log(team.teamLeader);
                console.log(member);

                team.teamMemberList = [];
                team.teamMemberList = $scope.members;

                //team.teamMemberList.push(member);

                //  HTTP POST
                httpService.post(restService.createTeam, team)
                    .then(function(data) {
                        window.alert("Team created!");
                        console.log(data);
                        $location.path('/homeTeamCoordinator');
                    },
                        function(err){
                            window.alert("Error!")
                            $scope.errorMessage = "error!"
                        })
            };

        /**
         *  Function reads all the teams in the database via an HTTP GET
         */
        $scope.readTeams = function () {
            //  HTTP GET
            httpService.get(restService.getTeams)
                .then(function (response) {
                    $scope.teamsList = response.data;
                    console.log($scope.teamsList);
                }, function error(response) {
                    $scope.errorResponse = "Error Status: " + response.statusText;
                });
            //console.log(JSON.stringify($scope.teamLeader));
            //console.log(JSON.stringify($scope.membersList[1]));

        };

        /**
         *  Function deletes a selected team via an HTTP DELETE and updates the view of the table.
         *  @param id   id number of the ticket to be deleted.
         */
        $scope.deleteTeam = function (id) {
            httpService.delete(restService.createTeam, id)
                .then(function (data) {
                        $scope.readTeams();
                        window.alert("Team deleted")
                    },
                    function (err) {
                        $scope.errorMessage = "error!"
                    })
        };

        /**
         *  Function used for saving an edited team.
         *  @param item     selected item
         *  @param index    iterator offset
         */
        $scope.modifyTeam = function (item, index) {
            $scope.edit = resetIndexes($scope.edit);
            $scope.editTeam = angular.copy(item);
            $scope.edit[index] = true;
            $scope.index=index;
        };

        /**
         *  Function resets the index used for the 'Modify' function.
         *  @param arrayOfIndexes   items' indexes
         *  @returns {*}   reset items' indexes
         */
        function resetIndexes(arrayOfIndexes) {
            angular.forEach(arrayOfIndexes, function (value, key) {
                arrayOfIndexes[key] = false;
            })
            return arrayOfIndexes;
        };

        //Funzione jQuery per visualizzare oggetto in table
        /* $(document).ready(function () {
            var html = "<table border='1|1'>";
            for (var i = 0; i < rows.length; i++) {
                html+="<tr>";
                html+="<td>"+rows[i].name+"</td>";

                html+="</tr>";

            }
            html+="</table>";
            $("div").html(html);
        }); */
    });