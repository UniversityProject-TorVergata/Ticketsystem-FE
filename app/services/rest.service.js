angular.module('ticketsystem.restService', [])
    .constant("CONNECTION", {
        url: "http://localhost:8200"
    })

    .service('restService', function (CONNECTION) {
        return {
            //"login": CONNECTION.url + '/loginUser',
            "create": CONNECTION.url + '/createTicket',
            "createUser": CONNECTION.url + '/ticketsystem/registered_user'
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