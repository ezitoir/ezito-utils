'use strict';

module.exports = function isArray( array){
    if(array === undefined || !(array instanceof Array) || !Boolean(array.map)) return false;
    return true;
}