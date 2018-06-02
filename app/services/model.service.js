angular.module('ticketsystem.modelService', [])
    .service('model', function (httpService, restService) {
            return {
                // TODO Rimuovere
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
                }
                ,
                getTeams() {
                    return new Promise(function (resolve, reject) {
                        httpService.get(restService.teamLeader).then(
                            function (teams) {
                                resolve(teams.data);
                            },
                            function (error) {
                                console.error("Error loading Products")
                                resolve([])
                            })
                    })
                }
                ,
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
                }
                ,
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
                getVisibilities() {
                    return new Promise(function (resolve, reject) {
                        httpService.get('./mocks/visibility.json').then(
                            function (visibilities) {
                                resolve(visibilities.data);
                            },
                            function (error) {
                                console.error("Error loading Categories")
                                resolve([])
                            }
                        )
                    })

                },
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
                }
            }
        }
    )