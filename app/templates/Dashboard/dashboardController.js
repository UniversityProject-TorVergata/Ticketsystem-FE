'use strict';

angular.module('dashboard', [])
    .controller('dashboardController', function ($scope, $window, $state, restService, storageService, httpService, util) {

      //TODO stati hardcoded, modificare in seguito
      //modificare per rendere tutto dinamico
      $scope.executionTickets = [];
      $scope.resolvedTickets = [];
      $scope.closedTickets = [];

      $scope.myTeamLeader = {};

      $scope.toChange = {};

      /*
          Siccome i ticket closed possono essere tantissimi, vengono visualizzati
          nella dashboard solo quelli chiuso OGGI, confrontando la data dell'ultimo
          cambiamento di stato con quella odierna
       */


      var prepareDashboard = function () {

        httpService.get(restService.readMyAssignedTickets + '/' + JSON.parse(localStorage.getItem('userInformation')).id)
            .then(function (response) {
              resetTicketsArrays($scope);
              for (let i = 0; i < Object.keys(response.data).length; i++) {
                if (response.data[i].stateMachine.currentState == "EXECUTION")
                  $scope.executionTickets.push(response.data[i]);
                else if (response.data[i].stateMachine.currentState == "CLOSED")
                  $scope.closedTickets.push(response.data[i]);
                else
                  $scope.resolvedTickets.push(response.data[i]);
              }
            }, function error(response) {

            });

        httpService.get(restService.getTeamLeaderByTeamID + '/' + JSON.parse(localStorage.getItem('userInformation')).team.id)
            .then(function (response) {
              $scope.myTeamLeader = response.data;
            }, function error(response) {

            })

      };


      prepareDashboard();

      $scope.changeStateToResolved = function () {
        if ($scope.toChange.difficulty == "LOW") {
          $window.alert("The ticket is not allowed to enter in 'RESOLVED' state")
        } else {

          let confirmation;
          if (confirm("Are you sure to change the ticket state to RESOLVED?")) {
            confirmation = true;
          } else {
            confirmation = false;
          }

          if (confirmation) {
            httpService.post(restService.changeTicketState + '/' + $scope.toChange.id + '/Action3/' + JSON.parse(localStorage.getItem('userInformation')).id)
                .then(function (data) {
                      prepareDashboard();
                    },
                    function (err) {
                    });
          }
        }
      };

      $scope.changeStateToPending = function (ticket) {

        let confirmation;
        if (confirm("Are you sure to change the ticket state to PENDING?")) {
          confirmation = true;
        } else {
          confirmation = false;
        }

        ticket.resolverUser = $scope.myTeamLeader;

        if (confirmation) {
          httpService.post(restService.changeTicketState + '/' + ticket.id + '/Action1/' + ticket.resolverUser.id)
              .then(function (data) {
                    prepareDashboard();
                  },
                  function (err) {
                  });
        }
      };


      $scope.changeStateToClosed = function () {

        if ($scope.toChange.difficulty != "LOW") {
          $window.alert("The ticket is not allowed to enter in 'CLOSED' state")
        } else {

          let confirmation;
          if (confirm("Are you sure to change the ticket state to CLOSED?")) {
            confirmation = true;
          } else {
            confirmation = false;
          }

          if (confirmation) {
            httpService.post(restService.changeTicketState + '/' + $scope.toChange.id + '/Action2/' + JSON.parse(localStorage.getItem('userInformation')).id)
                .then(function (data) {
                      prepareDashboard();
                    },
                    function (err) {
                    });
          }
        }
      };

      $scope.showImage = function (item, index) {
        util.postBase64(item).then(result => {
          // Append the <a/> tag and remove it after automatic click for the download
          document.body.appendChild(result);
          result.click();
          document.body.removeChild(result);
        })
      }

    });

function resetTicketsArrays(scope) {
  scope.executionTickets = []
  scope.closedTickets = []
  scope.resolvedTickets= []
}