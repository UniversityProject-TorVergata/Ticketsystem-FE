angular.module('ticketsystem.router', [])
    .config(['$routeProvider','$locationProvider', function ($routeProvider,$locationProvider) {

        $routeProvider
            .when('/createUser', {
                templateUrl: 'templates/createUser/createUser.html',
                controller: 'createUserCtrl'
            })
            .when('/loginUser', {
                templateUrl: 'templates/loginUser/loginUser.html',
                controller: 'LoginUserCtrl'
            })
            .when('/createTicket', {
                templateUrl: 'templates/createTicket/createTicket.html',
                controller:  'CreateTicketCtrl'
            })
            .when('/home', {
                templateUrl: 'templates/home/home.html',
                controller:  'HomeCtrl'
            })

            .when('/homeThirdPartyCustomer', {
                templateUrl: 'templates/homeThirdPartyCustomer/homeThirdPartyCustomer.html',
                controller:  'homeThirdPartyCustomerCtrl'
            })
            .when('/accountThirdPartyCustomer', {
                templateUrl: 'templates/accountThirdPartyCustomer/accountThirdPartyCustomer.html',
                controller:  'accountThirdPartyCustomerCtrl'
            })
            .when('/createProduct', {
                templateUrl: 'templates/createProduct/createProduct.html',
                controller:  'createProductCtrl'
            })
            .when('/homeCompanyAdmin', {
                templateUrl: 'templates/homeCompanyAdmin/homeCompanyAdmin.html',
                controller:  'homeCompanyAdminCtrl'
            })

            .otherwise({redirectTo: '/home'});

        $locationProvider.html5Mode({
            enabled: false,
            requireBase: false
        }).hashPrefix('');
    }])