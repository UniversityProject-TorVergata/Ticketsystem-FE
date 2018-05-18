angular.module('ticketsystem.router', [])
    .config(['$routeProvider','$locationProvider', function ($routeProvider,$locationProvider) {

        $routeProvider
            .when('/signupUser', {
                templateUrl: 'templates/signupUser/signupUser.html',
                controller: 'SignupUserCtrl'
            })
            .when('/loginUser', {
                templateUrl: 'templates/loginUser/loginUser.html',
                controller: 'LoginUserCtrl'
            })
            .when('/signupCompany', {
                templateUrl: 'templates/signupCompany/signupCompany.html',
                controller: 'SignupCompanyCtrl'
            })
            .when('/loginCompany', {
                templateUrl: 'templates/loginCompany/loginCompany.html',
                controller: 'LoginCompanyCtrl'
            })
            .when('/createTicket', {
                templateUrl: 'templates/createTicket/createTicket.html',
                controller:  'CreateTicketCtrl'
            })
            .when('/home', {
                templateUrl: 'templates/home/home.html',
                controller:  'HomeCtrl'
            })
            .otherwise({redirectTo: '/home'});

        $locationProvider.html5Mode({
            enabled: false,
            requireBase: false
        }).hashPrefix('');
    }])