'use strict';
angular.module('ticketsystem.stringFilter',[])
    .filter('formatEnumeration',function() {
        return function (input) {
            console.log(typeof input);
            var newInput = "";
            if (!!input) {
                var words = input.split("_");
                for (var i = 0, len = words.length; i < len; i++)
                    words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1).toLowerCase();
                newInput = words.join(" ");
            }
            else
                return "";

            return newInput;
        }
        /*
        var camelCaseFilter = function (input)
        {
            var array = [];
            angular.forEach(object, function (word) {
            var words = input.split("_");
            for ( var i = 0, len = words.length; i < len; i++ )
                words[i] = words[i].charAt(0).toUpperCase() + words[i].slice( 1 );
            return words.join('_');

        };
        return camelCaseFilter;*/
    });