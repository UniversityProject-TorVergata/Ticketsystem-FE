'use strict';

angular.module('ticketsystem.home', ['ngRoute'])

    .controller('homeCtrl', function ($scope, $modal, $log) {

        var modalInstance;

        $scope.whoAreWe = function () {

            modalInstance = $modal.open({
                templateUrl: '/modal/modal-who-are-we.html',
                controller: ModalInstanceCtrl,
                scope: $scope,
                backdrop: 'static',
            });

            modalInstance.result.then(function () {

            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        }

    });