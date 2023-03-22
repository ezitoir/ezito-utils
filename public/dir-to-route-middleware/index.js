"use strict";

 

function Converter ( path , paths = String()) {
    paths = paths.replace(/\\/g , '/');
    let route = path.replace(/\[\.\.\.(.*?)\]/g , function(t){ 
        return t.replace('[...','[').replace(']',']/*');
    }).replace(/\\/g,'/').replace(/\[(.*?)\]/g, function(t){
        return ("[" + t.slice(1 , t.length -1 ).replace(/\W/g, function(x){
            return ':';
        })+"]").replace(/\[/g , ':').replace(/\]/g , '');
    }).split(paths)[1]; 
    return route;
};

module.exports = Converter;