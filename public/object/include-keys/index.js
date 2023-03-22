"use strict";


function includeKeys ( object = null | Object ,  keys = null | Array | String  , callback = null | Function ){
    // check type for keys accept Array list of key or string key 
    if(!(keys instanceof Array ) && !(typeof keys === 'string')) throw { ErrorType : "param type erorr" , message : "keys nust instanceof Array!" };

    keys = (typeof keys === 'string' ? keys.split(" ") : keys ).filter(function (params) {
        return params.trim() !=='';
    });

    let result = keys.map(function(key){
        if( key.indexOf('/') > -1 ){
            return includeKeys( object , key.split('/'));
        } 
        if( object.hasOwnProperty(key) === true ){
            object = object[key];
            return object;
        }
        return 0;
    });
    if(result.length === keys.length){ 
        if( Object.toString(callback) === '[object Function]' || typeof callback === 'function')
        return callback.call( this , result.pop())
        return result.pop();
    } 
}


module.exports = includeKeys ;
