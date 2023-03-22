'use strict';


module.exports = function (phone , length = 10 ){
    if(typeof phone !== 'undefined' && typeof phone.match === 'function' ) return phone.match(/^\d{11}$/);
    return false ;
}