"use strict";

 

function dirToRouteMiddleWare ( path , paths = '') {
    paths = paths.replace(/\\/g , '/');
    let route = path.replace(/\[\.\.\.(.*?)\]/g , function(t){ 
        return t.replace('[...','[').replace(']',']/*');
    })
    .replace(/\\/g,'/').replace(/\[(.*?)\]/g, function(t){
        return ("[" + t.slice(1 , t.length -1 ).replace(/\W/g, function(x){
            return ':';
        })+"]").replace(/\[/g , ':').replace(/\]/g , '');
    });

    return route.slice((paths || '').length);
};

module.exports = dirToRouteMiddleWare;
