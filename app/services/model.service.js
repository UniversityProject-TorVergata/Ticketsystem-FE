angular.module('ticketsystem.modelService', [])
    .service('model', function (httpService) {
        return {
            getProducts() {
                return new Promise(function(resolve, reject){
                    httpService.get('./mocks/products.json').then(
                        function(products) {
                            resolve(products.data);
                        },
                        function(error){
                            console.error("Error loading Products")
                            resolve([])
                        })
                })
            },
            getSourceTypes() {
                return new Promise(function(resolve, reject){
                    httpService.get('./mocks/source_types.json').then(
                        function(sourceTypes) {
                            resolve(sourceTypes.data);
                        },
                        function(error){
                            console.error("Error loading Source Types")
                            resolve([])
                        })
                })
            },
            getTeams() {
                return new Promise(function(resolve, reject){
                    httpService.get('./mocks/teams.json').then(
                        function(teams) {
                            resolve(teams.data);
                        },
                        function(error){
                            console.error("Error loading Products")
                            resolve([])
                        })
                })
            },
            getTags() {
                return new Promise(function(resolve, reject) {
                    httpService.get('./mocks/tags.json').then(
                        function(tags) {
                            resolve(tags.data);
                        },
                        function(error) {
                            console.error("Error loading Tags")
                            resolve([])
                        })
                })
            },
            getTicketTypes() {
                return new Promise(function(resolve, reject) {
                    httpService.get('./mocks/ticket_type.json').then(
                        function(ticketTypes) {
                            resolve(ticketTypes.data);
                        },
                        function(error) {
                            console.error("Error loading Ticket Types")
                            resolve([])
                        }
                    )
                })
            }
        }
    })