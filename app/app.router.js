angular.module('ticketsystem.router', [])
    .config(['$routeProvider','$locationProvider', function ($routeProvider,$locationProvider) {

        $routeProvider
            .when('/createCustomer', {
                templateUrl: 'templates/Customer/create/createCustomer.html',
                controller: 'createCustomerCtrl'
            })
            .when('/Login', {
                templateUrl: 'templates/Login/Login.html',
                controller: 'LoginCtrl'
            })
            .when('/Ticket', {
                templateUrl: 'templates/Ticket/create/createTicket.html',
                controller:  'CreateTicketCtrl',
                resolve: {
                    targets: function (model) {
                        return model.getTargets().then(function (targets) {
                            return targets
                        })
                    },
                    sourceTypes: function (model) {
                        return model.getSourceTypes().then(function (sourceTypes) {
                            return sourceTypes
                        })
                    },
                    ticketTypes: function (model) {
                      return model.getTicketTypes().then(function (ticketTypes) {
                          return ticketTypes
                      })
                    },
                    tags: function(model) {
                        return model.getTags().then(function (tags) {
                            return tags
                        })
                    },
                    categories: function(model) {
                        return model.getCategories().then(function (categories) {
                            return categories
                        })
                    },
                    priorities: function(model) {
                        return model.getPriority().then(function (priorities) {
                            return priorities
                        })
                    },
                    visibilities: function(model) {
                        return model.getVisibilities().then(function (visibilities) {
                            return visibilities
                        })
                    }
                }
            })
            .when('/readTicket', {
                templateUrl: 'templates/Ticket/list/readTicket.html',
                controller:  'CreateTicketCtrl',
                resolve: {
                    products: function (model) {
                        return model.getProducts().then(function (products) {
                            return products
                        })
                    },
                    sourceTypes: function (model) {
                        return model.getSourceTypes().then(function (sourceTypes) {
                            return sourceTypes
                        })
                    },
                    ticketTypes: function (model) {
                        return model.getTicketTypes().then(function (ticketTypes) {
                            return ticketTypes
                        })
                    },
                    tags: function(model) {
                        return model.getTags().then(function (tags) {
                            return tags
                        })
                    },
                    categories: function(model) {
                        return model.getCategories().then(function (categories) {
                            return categories
                        })
                    }
                }
            })

            .when('/homeCustomer', {
                templateUrl: 'templates/Customer/home/homeCustomer.html',
                controller:  'homeCustomerCtrl'
            })
            .when('/homeTeamCoordinator', {
                templateUrl: 'templates/TeamCoordinator/home/homeTeamCoordinator.html',
                controller:  'homeTeamCoordinatorCtrl'
            })
            .when('/accountCustomer', {
                templateUrl: 'templates/Customer/account/accountCustomer.html',
                controller:  'accountCustomerCtrl'
            })
            .when('/createTarget', {
                templateUrl: 'templates/Admin/target/createTarget.html',
                controller:  'createTargetCtrl'
            })
            .when('/listTarget', {
                templateUrl: 'templates/Admin/target/listTarget.html',
                controller:  'createTargetCtrl'
            })
            .when('/modifyTarget', {
                templateUrl: 'templates/Admin/target/modifyTarget.html',
                controller:  'createTargetCtrl'
            })
            .when('/homeAdmin', {
                templateUrl: 'templates/Admin/home/homeAdmin.html',
                controller:  'homeAdminCtrl'
            })

            .when('/accountAdmin', {
                templateUrl: 'templates/Admin/account/accountAdmin.html',
                controller:  'accountAdminCtrl'
            })
            .when('/assignTicket', {
                templateUrl: 'templates/TeamCoordinator/list/teamCoordinator.html',
                controller:  'AssignTeamCtrl',
                resolve: {
                    teams: function (model) {
                        return model.getTeams().then(function (teams) {
                            return teams
                        })
                    },
                    priorities: function(model) {
                        return model.getPriority().then(function (priorities) {
                            return priorities
                        })
                    },
                }
            })
            .otherwise({redirectTo: '/Login'});

        $locationProvider.html5Mode({
            enabled: false,
            requireBase: false
        }).hashPrefix('');
    }])