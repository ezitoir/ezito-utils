"use strict";

/**
 * @param {Object} object 
 * @param { Array | String } keys 
 * @param { undefined | null | function} callback 
 * @returns 
 */
function includeKeys ( object = Object ,  keys = Array | String  , callback = undefined | null | Function ){
    let result = [];
    // check type for keys accept Array list of key or string key 
    if(!(keys instanceof Array ) && !(typeof keys === 'string')) throw { ErrorType : "param type erorr" , message : "keys nust instanceof Array!" };

    keys = (typeof keys === 'string' ? keys.split(" ") : keys ).filter(function (params) {
        return params.trim() !=='';
    });
    

    for (const checkKeys of keys) { 
        if(checkKeys.indexOf('/') > -1){ 
            result.push(includeKeys(object , checkKeys.split('/')));
        }
        result.push(Object.hasOwnProperty.call(object , checkKeys))
    }

    result = result.filter ( is => is === true);
    if(result.length === keys.length) return true;
    return false;
}


module.exports = includeKeys ;
