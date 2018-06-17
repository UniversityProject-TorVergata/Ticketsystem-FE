'use strict';

angular.module('ticketsystem.homeAdmin', ['ngRoute'])
    .controller('homeAdminCtrl', function ($scope,  $modal, $log) {

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

var ModalInstanceCtrl = function ($scope, $modalInstance) {

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };

};