"use strict";





function getType( object ){
    if(typeof object === 'function' && object.constructor === Function && Object.prototype.toString.call(object) === '[object Function]' ){
        return 'function';
    }
    else if( typeof object === 'object' && object.constructor === Promise && object.then.constructor === Function && Object.prototype.toString.call(object) === '[object Promise]'){
        return 'promise';
    }
    else if( Object.prototype.toString.call(object) === '[object AsyncFunction]' ){
        return 'async';
    }
    else if( typeof object === "string" ){
        return "string";
    }
    else if(typeof object === "number" ) {
        return "number";
    }
    else if(typeof object === "undefined" ){
        return "undefined"
    }
}

module.exports = getType ;