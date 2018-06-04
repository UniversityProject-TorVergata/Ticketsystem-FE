var app = angular.module('modal', ['ui.bootstrap']);

/**
 *  Controller used for the modal
 */
app.controller("modalAccountFormController", ['$scope', '$modal', '$log',

    /**
     *  Function used to show the modal popup
     *  @param $scope   general $scope
     *  @param $modal   general $modal
     *  @param $log     general $log
     */
    function ($scope, $modal, $log) {

        //  showEditForm: modal for editing ticket
        $scope.showEditForm = function (item) {
            $scope.message = "Show Form Button Clicked";
            console.log($scope.message);
            $scope.formItem=item;   //  save the item to modify it

            var modalInstance = $modal.open({
                templateUrl: '/modal/modal-form.html',
                controller: ModalInstanceCtrl,
                scope: $scope,
                resolve: {
                    userForm: function () {
                        return $scope.userForm;
                    }
                }
            });

            modalInstance.result.then(function (selectedItem) {
                $scope.selected = selectedItem;
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        };
        //  showInfoForm:   modal for see the details about the ticket
        $scope.showInfoForm = function (item) {
            $scope.message = "Show Form Button Clicked";
            console.log($scope.message);
            $scope.formItem=item;
            console.log(item);


            var modalInstance = $modal.open({
                templateUrl: '/modal/modal-info.html',
                controller: ModalInstanceCtrl,
                scope: $scope,
                resolve: {
                    userForm: function () {
                        return $scope.userForm;
                    }
                }
            });

            modalInstance.result.then(function (selectedItem) {
                $scope.selected = selectedItem;
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        };

        $scope.showInfoTeam = function (item) {
            $scope.formItem = item;

            var modalInstance = $modal.open({
                templateUrl: '/modal/modal-info-team.html',
                controller: ModalInstanceCtrl,
                scope: $scope,
                resolve: {
                    userForm: function () {
                        return $scope.userForm;
                    }
                }
            });

            modalInstance.result.then(function (selectedItem) {
                $scope.selected = selectedItem;
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        };

    }]);

var ModalInstanceCtrl = function ($scope, $modalInstance, userForm) {
    $scope.form = {};
    $scope.submitForm = function () {
        if ($scope.form.userForm.$valid) {
            console.log('user form is in scope');
            $scope.saveTicket($scope.editTicket,$scope.index);
            $modalInstance.close('closed');
        } else {
            console.log('userform is not in scope');
        }
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
};