
/**
 *  @ngdoc module
 *  @name  ticketsystem.modelService
 *  @description The module manages mocks and select values who needs to be got from database.
 */
angular.module('ticketsystem.modelService', [])

    /**
     *  @ngdoc  service
     *  @module  ticketsystem.modelService
     *  @name   model
     *  @description   Service returns all the data that needs to be shown in select and table.
     */
    .service('model', function (httpService, restService) {
            return {

                /**
                 *  @ngdoc  function
                 *  @name getFreeTeamLeaders
                 *  @description Function gets the free team leaders.
                 *  @returns {Promise}  free team leaders
                 */
                getFreeTeamLeaders() {
                    return new Promise(function (resolve, reject) {
                        httpService.get(restService.getFreeTeamLeaders).then(
                            function (leaders) {
                                resolve(leaders.data);
                            },
                            function (error) {
                                console.error("Error loading free team leaders")
                                resolve([])
                            })
                    })
                },
                /**
                 *  @ngdoc  function
                 *  @name getFreeTeamMembers
                 *  @description Function gets the free team members.
                 *  @returns {Promise}  free team members
                 */
                getFreeTeamMembers() {
                    return new Promise(function (resolve, reject) {
                        httpService.get(restService.getTeamMembers).then(
                            function (members) {
                                resolve(members.data);
                            },
                            function (error) {
                                console.error("Error loading free team members")
                                resolve([])
                            })
                    })
                },
                /**
                 *  @ngdoc  function
                 *  @name getStateMachines
                 *  @description Function gets the finite state machines.
                 *  @returns {Promise}  finite state machines list.
                 */
                getStateMachines() {
                    return new Promise(function (resolve, reject) {
                        httpService.get(restService.getStateMachines).then(
                            function (stateMachines) {
                                resolve(stateMachines.data);
                            },
                            function (error) {
                                console.error("Error loading finite state machines")
                                resolve([])
                            })
                    })
                }
                ,
                /**
                 *  @ngdoc  function
                 *  @name getDifficulties
                 *  @description Function gets the difficulty values.
                 *  @returns {Promise}  difficulty values
                 */
                getDifficulties() {
                    return new Promise(function (resolve, reject) {
                        httpService.get('./mocks/difficulty.json').then(
                            function (difficulties) {
                                resolve(difficulties.data);
                            },
                            function (error) {
                                console.error("Error loading Difficulty values")
                                resolve([])
                            })
                    })
                },
                /**
                 *  @ngdoc  function
                 *  @name getTargetTypes
                 *  @description Function gets the target type values.
                 *  @returns {Promise}  target type values list
                 */
                getTargetTypes() {
                    return new Promise(function (resolve, reject) {
                        httpService.get('./mocks/targetTypes.json').then(
                            function (targetTypes) {
                                resolve(targetTypes.data);
                            },
                            function (error) {
                                console.error("Error loading target type values")
                                resolve([])
                            })
                    })
                },
                /**
                 *  @ngdoc  function
                 *  @name getUserType
                 *  @description Function gets the allowed user types.
                 *  @returns {Promise}  user types list
                 */
                getUserType() {
                    return new Promise(function (resolve, reject) {
                        httpService.get('./mocks/userType.json').then(
                            function (userTypes) {
                                resolve(userTypes.data);
                            },
                            function (error) {
                                console.error("Error loading User Types")
                                resolve([])
                            })
                    })
                },
                /**
                 *  @ngdoc  function
                 *  @name getTargets
                 *  @description Function gets the targets from the database
                 *  @returns {Promise}  targets list
                 */
                getTargets() {
                    return new Promise(function (resolve, reject) {
                        //  HTTP GET
                        httpService.get(restService.readTargets)
                            .then(function (response) {
                                resolve(response.data);
                            }, function error(response) {
                                console.error("Error loading Targets")
                                resolve([])
                            });
                    })
                },
                /**
                 *  @ngdoc  function
                 *  @name getActiveTargets
                 *  @description Function gets the targets that are active from the database.
                 *  @returns {Promise}  targets list
                 */
                getActiveTargets() {
                    return new Promise(function (resolve, reject) {
                        //  HTTP GET
                        httpService.get(restService.readActiveTargets)
                            .then(function (response) {
                                resolve(response.data);
                            }, function error(response) {
                                console.error("Error loading Active Targets")
                                resolve([])
                            });
                    })
                },
                /**
                 *  @ngdoc  function
                 *  @name getTeams
                 *  @description Function gets the TeamLeaders from the database.
                 *  @returns {Promise}  Team Leaders list
                 */
                getTeams() {
                    return new Promise(function (resolve, reject) {
                        httpService.get(restService.employedTeamLeader).then(
                            function (teams) {
                                resolve(teams.data);
                            },
                            function (error) {
                                console.error("Error loading Team Leaders")
                                resolve([])
                            })
                    })
                },
                /**
                 *  @ngdoc  function
                 *  @name getTags
                 *  @description Function gets the tags from the mock..
                 *  @returns {Promise}  Tags list
                 */
                getTags() {
                    return new Promise(function (resolve, reject) {
                        httpService.get('./mocks/tags.json').then(
                            function (tags) {
                                resolve(tags.data);
                            },
                            function (error) {
                                console.error("Error loading Tags")
                                resolve([])
                            })
                    })
                },
                /**
                 *  @ngdoc  function
                 *  @name getCategories
                 *  @description Function gets the categories from the mock.
                 *  @returns {Promise}  Categories list
                 */
                getCategories() {
                    return new Promise(function (resolve, reject) {
                        httpService.get('./mocks/categories.json').then(
                            function (categories) {
                                resolve(categories.data);
                            },
                            function (error) {
                                console.error("Error loading Categories")
                                resolve([])
                            }
                        )
                    })

                },
                /**
                 *  @ngdoc  function
                 *  @name getVisibilities
                 *  @description Function gets the visibility values from the mock.
                 *  @returns {Promise}  Visibility values list
                 */
                getVisibilities() {
                    return new Promise(function (resolve, reject) {
                        httpService.get('./mocks/visibility.json').then(
                            function (visibilities) {
                                resolve(visibilities.data);
                            },
                            function (error) {
                                console.error("Error loading Visibilities")
                                resolve([])
                            }
                        )
                    })

                },
                /**
                 *  @ngdoc  function
                 *  @name getTicketTypes
                 *  @description Function gets ticket types from the mock.
                 *  @returns {Promise}  Ticket typeslist
                 */
                getTicketTypes() {
                    return new Promise(function (resolve, reject) {
                        httpService.get('./mocks/ticket_type.json').then(
                            function (ticketTypes) {
                                resolve(ticketTypes.data);
                            },
                            function (error) {
                                console.error("Error loading Ticket Types")
                                resolve([])
                            }
                        )
                    })
                },
                /**
                 *  @ngdoc  function
                 *  @name getPriority
                 *  @description Function gets the priority values from the mock.
                 *  @returns {Promise}  Priority values list
                 */
                getPriority() {
                    return new Promise(function (resolve, reject) {
                        httpService.get('./mocks/priority.json').then(
                            function (ticketTypes) {
                                resolve(ticketTypes.data);
                            },
                            function (error) {
                                console.error("Error loading Priority")
                                resolve([])
                            }
                        )
                    })
                },
                /**
                 *  @ngdoc  function
                 *  @name getArea
                 *  @description Function gets the problem areas for a Team.
                 *  @returns {Promise} Problem areas list
                 */
                getArea() {
                    return new Promise(function (resolve, reject) {
                        httpService.get('./mocks/problemArea.json').then(
                            function (problemArea) {
                                resolve(problemArea.data);
                            },
                            function (error) {
                                console.error("Error loading Problem Areas")
                                resolve([])
                            }
                        )
                    })
                }
            }
        }
    )