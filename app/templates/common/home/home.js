'use strict';

angular.module('ticketsystem.home', ['ngRoute'])

    .controller('homeCtrl', function ($scope, $modal, $log) {

        var modalInstance;

        /**
         * @mgdoc           function
         * @name            aboutUs
         * @description     This function sets a modal to show developer team information
         */
        $scope.aboutUs = function () {
            modalInstance = $modal.open({
                templateUrl: '/modal/modal-about-us.html',
                controller: ModalInstanceCtrl,
                scope: $scope,
                backdrop: 'static',
            });

            modalInstance.result.then(function () {

            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        };

        /**
         * @mgdoc           function
         * @name            termsOfUse
         * @description     This function sets a modal to show the terms of use
         */
        $scope.termsOfUse = function () {
            modalInstance = $modal.open({
                templateUrl: '/modal/modal-terms-of-use.html',
                controller: ModalInstanceCtrl,
                scope: $scope,
                backdrop: 'static',
            });

            modalInstance.result.then(function () {

            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        };

        /**
         * @mgdoc           function
         * @name            termsOfUse
         * @description     This function sets a modal to show the privacy policy
         */
        $scope.privacyPolicy = function () {
            modalInstance = $modal.open({
                templateUrl: '/modal/modal-privacy-policy.html',
                controller: ModalInstanceCtrl,
                scope: $scope,
                backdrop: 'static',
            });

            modalInstance.result.then(function () {

            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        };

        /**
         * @mgdoc           function
         * @name            termsOfUse
         * @description     This function sets a modal to show the FAQs
         */
        $scope.faq = function () {
            modalInstance = $modal.open({
                templateUrl: '/modal/modal-faq.html',
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