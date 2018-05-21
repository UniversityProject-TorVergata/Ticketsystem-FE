'use strict';
angular.module('ticketsystem.productService',[])
    .service('productService',[
        function() {

            this.product = null;

            this.set= function(obj){
                this.product = obj;
            };

            this.get = function(){
                return this.product;
            };


        }

    ]);