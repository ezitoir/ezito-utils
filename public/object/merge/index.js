"use strict";
function merge( targetContextObject = null | Object , object = Object){

    // check param types
    if(!(typeof targetContextObject === "object")){
        return object; 
    } 
    if(!(typeof object === "object")){
        return targetContextObject; 
    }
    

    // copy of context
    var new_object = Object.assign({}, targetContextObject);
    
    Object.entries(object).map(function([ key , value ]){
        if(new_object.hasOwnProperty( key )){
            if( value instanceof Object && value.constructor === Object ){
                new_object[key] = merge( new_object[key] , value );
            }
            else {
                new_object[key] = value;
            }
        }
        else { 
            new_object[key] = value;
        }
    });
    return new_object;
};

module.exports = merge;


