"use strict";

function dirToRouteMiddleWare ( path = "" , paths = '') {
    path = path.replace(/\\/g , '/');
    var parseDir = path.split('/');
    var validTypeCheck = [
        'String' ,
        'Number'
    ];
    var regexp = '';
    for (var index = 0; index < parseDir.length; index++) {
        var routeItem = parseDir[index];
        if(/\[\.\.\.(.*?)\]/.test(routeItem)){
            routeItem = routeItem.replace(/\[\.\.\.(.*?)\]/, (str,name) => {
                return ":" + name + '/*';
            });
            parseDir [index] = routeItem; 
        }
        if(/\[(.*?)\]/.test(routeItem)){
            routeItem = routeItem.replace(/\[(.*?)\]/, (str,name) => {
                return ":" + name;
            });
            parseDir[index] = routeItem; 

            for (var type of validTypeCheck) {
                regexp = new RegExp(':' + type + '(' + '(.*?)' + ')' ,'gi');
                if(regexp.test(routeItem)){ 
                    routeItem = routeItem.replace( regexp , function strReplace(str){
                        
                    });
                }                
            }
        }
    };
    return parseDir.join('/');
};

module.exports = dirToRouteMiddleWare;
