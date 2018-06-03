// TODO Cancellabile?

'use strict';
angular.module('ticketsystem.productService',[])
    .service('productService',[
        function() {

            this.target = null;

            this.set= function(obj){
                this.target = obj;
            };

            this.get = function(){
                return this.target;
            };


        }

    ]);