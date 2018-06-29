'use strict';
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

                .state('createCustomer', {
                    url: "/createCustomer",
                    views: {
                        'public': {
                            templateUrl: "templates/Customer/create/createCustomer.html",
                            controller: 'createCustomerCtrl'
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
                            //console.log(user);
                            let profile = user['@type'];
                            //console.log("User type: " + profile);
                            return menuService.getMenuByType(profile).then(function (response) {
                                return response
                            })
                        }
                    }


                })
                //  Home
                .state('secure.homeCustomer', {
                    url: "/home",
                    views: {
                        'content': {
                            templateUrl: 'templates/common/home/homeCustomer.html',
                            controller: 'homeCtrl'
                        }
                    },
                    data: {
                        requiredLogin: true,
                        access: ['Customer']

                    }
                })
                //  Home
                .state('secure.homeAdmin', {
                    url: "/home",
                    views: {
                        'content': {
                            templateUrl: 'templates/common/home/homeAdmin.html',
                            controller: 'homeCtrl'
                        }
                    },
                    data: {
                        requiredLogin: true,
                        access: ['Admin']

                    }
                })
                //  Home
                .state('secure.homeTeamCoordinator', {
                    url: "/home",
                    views: {
                        'content': {
                            templateUrl: 'templates/common/home/homeTeamCoordinator.html',
                            controller: 'homeCtrl'
                        }
                    },
                    data: {
                        requiredLogin: true,
                        access: ['TeamCoordinator']

                    }
                })
                //  Home
                .state('secure.homeTeamLeader', {
                    url: "/home",
                    views: {
                        'content': {
                            templateUrl: 'templates/common/home/homeTeamLeader.html',
                            controller: 'homeCtrl'
                        }
                    },
                    data: {
                        requiredLogin: true,
                        access: ['TeamLeader']

                    }
                })
                .state('secure.homeTeamMember', {
                    url: "/home",
                    views: {
                        'content': {
                            templateUrl: 'templates/common/home/homeTeamMember.html',
                            controller: 'homeCtrl'
                        }
                    },
                    data: {
                        requiredLogin: true,
                        access: ['TeamMember']
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
                    },
                    resolve: {
                        stateMachines: function (model) {
                            return model.getStateMachines().then(function (stateMachines) {
                                return stateMachines
                            })
                        },
                        targetTypes: function (model) {
                            return model.getTargetTypes().then(function (targetTypes) {
                                return targetTypes
                            })
                        }
                    }

                })
                .state('secure.listTarget', {
                    url: "/listTarget",
                    views: {
                        'content': {
                            templateUrl: 'templates/Admin/target/listTarget.html',
                            controller: 'listTargetCtrl'
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
                            controller: 'modifyTargetCtrl'
                        }
                    },
                    data: {
                        requiredLogin: true,
                        access: ['Admin']
                    },
                    resolve: {
                        stateMachines: function (model) {
                            return model.getStateMachines().then(function (stateMachines) {
                                return stateMachines
                            })
                        },
                        targetTypes: function (model) {
                            return model.getTargetTypes().then(function (targetTypes) {
                                return targetTypes
                            })
                        }
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
                    },
                    resolve: {
                        userTypes: function (model) {
                            return model.getUserType().then(function (userTypes) {
                                return userTypes
                            })
                        }
                    }
                })
                .state('secure.dashboard', {
                    url: "/dashboard",
                    views: {
                        'content': {
                            templateUrl: 'templates/Dashboard/dashboard.html',
                            controller: 'dashboardController'
                        }
                    },
                    data: {
                        requiredLogin: true,
                        access: ['TeamMember', 'TeamCoordinator', 'TeamLeader']
                    },
                    resolve: {
                        difficulties: function (model) {
                            return model.getDifficulties().then(function (difficulties) {
                                return difficulties
                            })
                        },
                        teams: function (model) {
                            return model.getTeams().then(function (teams) {
                                return teams
                            })
                        },
                        priorities: function (model) {
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
                        },
                        teamleaders: function (model) {
                            return model.getFreeTeamLeaders().then(function (teamleaders) {
                                return teamleaders
                            })
                        },
                        teammembers: function (model) {
                            return model.getFreeTeamMembers().then(function (teammembers) {
                                return teammembers
                            })
                        }
                    }
                })
                .state('secure.listTeam', {
                    url: "/listTeam",
                    views: {
                        'content': {
                            templateUrl: 'templates/Team/readTeam.html',
                            controller: 'readTeamCtrl'
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
                .state('secure.reopenedTickets', {
                    url: "/reopenedTickets",
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
                        priorities: function (model) {
                            return model.getPriority().then(function (priorities) {
                                return priorities;
                            });
                        },
                        tags: function (model) {
                            return model.getTags().then(function (tags) {
                                return tags;
                            });
                        },
                        activeTargets: function (model) {
                            return model.getActiveTargets().then(function (activeTargets) {
                                return activeTargets;
                            });
                        },
                        visibilities: function (model) {
                            return model.getVisibilities().then(function (visibilities) {
                                return visibilities;
                            });
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
                            controller: 'ReadTicketCtrl'
                        }
                    },
                    data: {
                        requiredLogin: true,
                        access: ['ALL']

                    },
                    resolve: {
                        activeTargets: function (model) {
                            return model.getActiveTargets().then(function (activeTargets) {
                                return activeTargets;
                            })
                        },
                        tags: function (model) {
                            return model.getTags().then(function (tags) {
                                return tags;
                            });
                        },
                        priorities: function (model) {
                            return model.getPriority().then(function (priorities) {
                                return priorities;
                            });
                        },
                        visibilities: function (model) {
                            return model.getVisibilities().then(function (visibilities) {
                                return visibilities;
                            });
                        }
                    }
                })

            $urlRouterProvider.otherwise('/Login');

            $locationProvider.html5Mode({
                enabled: false,
                requireBase: false
            }).hashPrefix('');
        }])