'use strict';


function isPromise(object){
    try {
        if(typeof object === 'object' 
    && object.constructor === Promise 
    && object.then.constructor === Function 
    && Object.prototype.toString.call(object) === '[object Promise]'){
        return true;
    }
    } catch (error) {
        return false;   
    }
}