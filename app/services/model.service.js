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
            }


        }
    })