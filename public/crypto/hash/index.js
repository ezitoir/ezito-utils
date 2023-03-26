'use strict';
/**
 * 
 * @param {Number} length 
 * @returns {string}
 */
module.exports = function( length = 10 ){
    function init(){
        return (Math.random() + 1).toString(36).substring(2);
    };
    if( length <= 10 ) return init().slice(0 , length );
    let random = '' ;
    do { 
        if( length - 10 >= 0 ){  
            random += init().slice(0 , 10);
        }
        else {  
            random += init().slice(0 , length);
        }
    } while((length-=10) > 0);
    return random;
}