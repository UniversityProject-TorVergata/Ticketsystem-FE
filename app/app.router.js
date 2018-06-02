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
            .when('/accountThirdPartyCustomer', {
                templateUrl: 'templates/accountThirdPartyCustomer/accountThirdPartyCustomer.html',
                controller:  'accountThirdPartyCustomerCtrl'
            })
            .when('/product', {
                templateUrl: 'templates/Admin/product/createProduct.html',
                controller:  'createProductCtrl'
            })
            .when('/listProduct', {
                templateUrl: 'templates/Admin/product/listProduct.html',
                controller:  'createProductCtrl'
            })
            .when('/Admin', {
                templateUrl: 'templates/Admin/home/homeAdmin.html',
                controller:  'homeCompanyAdminCtrl'
            })

            .when('/accountCompanyAdmin', {
                templateUrl: 'templates/accountCompanyAdmin/accountCompanyAdmin.html',
                controller:  'accountCompanyAdminCtrl'
            })
            .when('/listProduct', {
                templateUrl: 'templates/Admin/product/listProduct.html',
                controller:  'createProductCtrl'
            })
            .when('/modifyProduct', {
                templateUrl: 'templates/Admin/product/modifyProduct.html',
                controller:  'createProductCtrl'
            })
            .when('/assignTicket', {
                templateUrl: 'templates/TeamCoordinator/teamCoordinator.html',
                controller:  'AssignTeamCtrl',
                resolve: {
                    teams: function (model) {
                        return model.getTeams().then(function (teams) {
                            return teams
                        })
                    }
                }
            })
            .otherwise({redirectTo: '/Login'});

        $locationProvider.html5Mode({
            enabled: false,
            requireBase: false
        }).hashPrefix('');
    }])