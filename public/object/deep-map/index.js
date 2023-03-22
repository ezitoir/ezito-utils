'use strict';

/**
 * created by ezito development
 * @param {object} object 
 * @param {fnnction} callback 
 * @returns 
 */
function deepMap ( object = null | Object, callback = null | Function ){
    if( typeof object !== 'object' || typeof callback !== 'function' ) return false; 
    return Object.entries(object).map(function([ key , value ]){
        callback.call(object ,  key , value );
        if( typeof value === 'object' && value.constructor === Object ){
            return deepMap( value );
        }
    });
}

module.exports = deepMap ;
