'use strict';
angular.module('ticketsystem.loginService',[])
    .service('loginService',[
        function() {

            this.logged = null;

            this.set= function(obj){
                this.logged = obj;
            };

            this.get = function(){
                return this.logged;
        };


    }

]);