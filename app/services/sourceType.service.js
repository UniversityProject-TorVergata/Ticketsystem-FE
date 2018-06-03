// TODO Cancellabile?

'use strict';
angular.module('ticketsystem.sourceTypeService',[])
    .service('sourceTypeService',[
        function() {

            this.sourceType = null;

            this.set= function(obj){
                this.sourceType = obj;
            };

            this.get = function(){
                return this.sourceType;
            };
        }
    ]);