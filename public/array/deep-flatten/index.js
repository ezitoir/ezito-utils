"use strict";


function deepFlatten ( context = null | Array() ){
    if(!(context instanceof Array ) && !Array.isArray(context)) throw new Error('param is not array') ;
    
    return (function () {
        var result = []; 
        this.forEach(function (item) {
            if (Array.isArray(item)) {
                result = result.concat(deepFlatten(item));  
            } else {
                result.push(item);
            }
        });
        return result;
    }).call( context , );
}


module.exports = deepFlatten ;
