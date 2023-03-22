"use strict";
 

function equals( context = null | Array , array = null | Array ) {
    // if the other array is a falsy value, return
    if(!(array instanceof Array)) throw {  TypeError : `param type not accept. giving ${typeof array}.`};
    if(!(context instanceof Array)) throw {  TypeError : `param type not accept. giving ${typeof context}.` };
        // compare lengths - can save a lot of time 
    if (context.length != array.length) return false;
    for (var i = 0, l=context.length; i < l; i++) {
        // Check if we have nested arrays
        if (context[i] instanceof Array && array[i] instanceof Array) { 
            if (!context[i].equals(array[i])) return false;       
        }           
        else if (context[i] != array[i]) { 
            // Warning - two different object instances will never be equal: {x:20} != {x:20}
            return false ;
        }           
        }
    return true;
}

module.exports = equals ;