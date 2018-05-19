angular.module('ticketsystem.restService', [])
    .constant("CONNECTION", {
        url: "http://localhost:8200/ticketsystem"
    })

    .service('restService', function (CONNECTION) {
        return {
            //"login": CONNECTION.url + '/loginUser',
            //"signup": CONNECTION.url + '/createUser',
            "createTicket": CONNECTION.url + '/createTicket',
            "createUser": CONNECTION.url + '/registered_user'
        }
    })
    .service('httpService', function ($http) {
        return {
            get: function (url, header) {

                return $http({
                    "url": url,
                    "method": "GET",
                    "headers": header
                });
            },
            post: function (url, data, header) {
                var head = "";
                if (header) head = header;
                return $http({
                    "method": "POST",
                    "url": url,
                    "headers": head,
                    "data": data
                });
            }

        }
    })