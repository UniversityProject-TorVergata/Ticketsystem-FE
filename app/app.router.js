angular.module('ticketsystem.router', ['ui.router'])
    .config(['$stateProvider', '$urlRouterProvider', '$locationProvider',
        function ($stateProvider, $urlRouterProvider, $locationProvider) {

            $stateProvider

                .state('Login', {
                    url: "/Login",
                    views: {
                        'public': {
                            templateUrl: "templates/common/Login/Login.html",
                            controller: 'LoginCtrl'
                        }
                    },
                    data: {
                        requiredLogin: false,
                        access: ['']
                    }
                })

                .state('secure', {
                    url: "/secure",
                    abstract: true,
                    views: {
                        'sidebarMenu': {
                            templateUrl: "templates/common/sidebarMenu/sidebar.html",
                            controller: 'SidebarCtrl'
                        }
                    },
                    data: {
                        requiredLogin: true
                    },
                    resolve: {
                        menu: function (menuService) {
                            let user = JSON.parse(localStorage.getItem('userInformation'))
                            console.log(user);
                            let profile = user['@type'];
                            console.log("User type: " + profile);
                            return menuService.getMenuByType(profile).then(function (response) {
                                return response
                            })
                        }
                    }


                })

                //  Account Info
                .state('secure.accountInfo', {
                    url: "/accountInfo",
                    views: {
                        'content': {
                            templateUrl: 'templates/common/accountInfo/accountInfo.html',
                            controller: 'accountInfoCtrl'
                        }
                    },
                    data: {
                        requiredLogin: true,
                        access: ['ALL']

                    }
                })
                .state('secure.createTarget', {
                    url: "/createTarget",
                    views: {
                        'content': {
                            templateUrl: 'templates/Admin/target/createTarget.html',
                            controller: 'createTargetCtrl'
                        }
                    },
                    data: {
                        requiredLogin: true,
                        access: ['Admin']
                    }
                })
                .state('secure.listTarget', {
                    url: "/listTarget",
                    views: {
                        'content': {
                            templateUrl: 'templates/Admin/target/listTarget.html',
                            controller: 'createTargetCtrl'
                        }
                    },
                    data: {
                        requiredLogin: true,
                        access: ['Admin']
                    }
                })
                .state('secure.modifyTarget', {
                    url: "/modifyTarget",
                    views: {
                        'content': {
                            templateUrl: 'templates/Admin/target/modifyTarget.html',
                            controller: 'createTargetCtrl'
                        }
                    },
                    data: {
                        requiredLogin: true,
                        access: ['Admin']
                    }
                })
                .state('secure.createUser', {
                    url: "/createUser",
                    views: {
                        'content': {
                            templateUrl: 'templates/Admin/createUser/createUser.html',
                            controller: 'createUserCtrl'
                        }
                    },
                    data: {
                        requiredLogin: true,
                        access: ['Admin']
                    }
                })
                .state('secure.assignTicket', {
                    url: "/assignTicket",
                    views: {
                        'content': {
                            templateUrl: 'templates/TeamCoordinator/list/teamCoordinator.html',
                            controller: 'AssignTeamCtrl'
                        }
                    },
                    data: {
                        requiredLogin: true,
                        access: ['TeamCoordinator']
                    },
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
                .state('secure.assignTeamMember', {
                    url: "/assignTeamMember",
                    views: {
                        'content': {
                            templateUrl: 'templates/TeamLeader/list/teamLeader.html',
                            controller: 'TeamLeaderCtrl'
                        }
                    },
                    data: {
                        requiredLogin: true,
                        access: ['TeamLeader']
                    },
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
                        }
                    }
                })
                .state('secure.createTeam', {
                    url: "/createTeam",
                    views: {
                        'content': {
                            templateUrl: 'templates/Team/createTeam.html',
                            controller: 'createTeamCtrl'
                        }
                    },
                    data: {
                        requiredLogin: true,
                        access: ['TeamCoordinator']
                    },
                    resolve: {
                        problemArea: function (model) {
                            return model.getArea().then(function (problemArea) {
                                return problemArea
                            })
                        }
                    }
                })
                .state('secure.listTeam', {
                    url: "/listTeam",
                    views: {
                        'content': {
                            templateUrl: 'templates/Team/readTeam.html',
                            controller: 'createTeamCtrl'
                        }
                    },
                    data: {
                        requiredLogin: true,
                        access: ['TeamCoordinator']
                    },
                    resolve: {
                        problemArea: function (model) {
                            return model.getArea().then(function (problemArea) {
                                return problemArea
                            })
                        }
                    }
                })
                .state('secure.createTicket', {
                    url: "/createTicket",
                    views: {
                        'content': {
                            templateUrl: 'templates/Ticket/create/createTicket.html',
                            controller: 'CreateTicketCtrl'
                        }
                    },
                    data: {
                        requiredLogin: true,
                        access: ['Customer']

                    },
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
                        tags: function (model) {
                            return model.getTags().then(function (tags) {
                                return tags
                            })
                        }
                    }
                })
                .state('secure.ticket', {
                    url: "/Ticket",
                    views: {
                        'content': {
                            templateUrl: 'templates/Ticket/create/createTicket.html',
                            controller: 'CreateTicketCtrl'
                        }
                    },
                    data: {
                        requiredLogin: true,
                        access: ['ALL']

                    },
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
                        tags: function (model) {
                            return model.getTags().then(function (tags) {
                                return tags
                            })
                        }
                    }
                })
                .state('secure.readTicket', {
                    url: '/readTicket',
                    views: {
                        'content': {
                            templateUrl: 'templates/Ticket/list/readTicket.html',
                            controller: 'CreateTicketCtrl'
                        }
                    },
                    data: {
                        requiredLogin: true,
                        access: ['ALL']

                    },
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
                        tags: function (model) {
                            return model.getTags().then(function (tags) {
                                return tags
                            })
                        }
                    }
                })

            $urlRouterProvider.otherwise('/Login');

            $locationProvider.html5Mode({
                enabled: false,
                requireBase: false
            }).hashPrefix('');
        }])