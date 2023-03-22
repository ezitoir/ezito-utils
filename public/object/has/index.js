"use strict";

function has( object , key ){
    if(object.hasOwnProperty(key)){
        return object[key];
    }
    return undefined;
}


module.exports = has;