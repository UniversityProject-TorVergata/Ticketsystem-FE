angular.module('ticketsystem.restService', [])
    .constant("CONNECTION", {
        url: "http://localhost:8200/ticketsystem"
        //url: "https://stormy-lake-55984.herokuapp.com/ticketsystem"
    })

    .service('restService', function (CONNECTION) {
        return {
            //"login": CONNECTION.url + '/loginUser',
            "createTicket": CONNECTION.url + '/ticket',
            "createUser": CONNECTION.url + '/registered_user',
            "getUser": CONNECTION.url + '/registered_user',
            "deleteUser": CONNECTION.url + '/registered_user',
            "createProduct": CONNECTION.url + '/product'
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
            },
            delete: function (url, data, header) {
                var head = "";
                if (header) head = header;
                return $http({
                    "method": "DELETE",
                    "url": url+"/"+data,
                    "headers": header
                });
            }
        }
    })