angular.module('ticketsystem.modelService', [])
    .service('model', function (httpService, restService) {
            return {
                // TODO Rimuovere?
                getProducts() {
                    return new Promise(function (resolve, reject) {
                        httpService.get('./mocks/products.json').then(
                            function (products) {
                                resolve(products.data);
                            },
                            function (error) {
                                console.error("Error loading Products")
                                resolve([])
                            })
                    })
                },
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
                 *  Function gets the targets from the database.
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
                 *  Function gets the targets from the mock.
                 *  @returns {Promise} Source Types list
                 */
                getSourceTypes() {
                    return new Promise(function (resolve, reject) {
                        httpService.get('./mocks/source_types.json').then(
                            function (sourceTypes) {
                                resolve(sourceTypes.data);
                            },
                            function (error) {
                                console.error("Error loading Source Types")
                                resolve([])
                            })
                    })
                },

                /**
                 *  Function gets the TeamLeaders from the database.
                 *  @returns {Promise} Team Leaders list
                 */
                getTeams() {
                    return new Promise(function (resolve, reject) {
                        httpService.get(restService.teamLeader).then(
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
                 *  Function gets the tags from the mock.
                 *  @returns {Promise} Tags list
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
                 *  Function gets the categories from the mock.
                 *  @returns {Promise} Categories list
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
                 *  Function gets the visibility values from the mock.
                 *  @returns {Promise} Visibility values list
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
                 *  Function gets the ticket types from the mock.
                 *  @returns {Promise} Ticket types list
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
                 *  Function gets the priority values from the mock.
                 *  @returns {Promise} Priority values list
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