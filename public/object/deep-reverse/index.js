'use strict';




 
function deepReverse( object = null | Object | Array ){
    // check type param
    if(typeof object !== 'object' || object.constructor !== Object && object.constructor !== Array ) throw { TypeError : 'param type error' };

 

    // check array 
    if(Array.isArray(object)){
        return object.reverse().map(function(item){
            if(item.constructor === Object || item.constructor === Array){
                return deepReverse(item);
            } 
            return item;
        });
    }
    else {
        let new_object = Object({});
        Object.entries(Object.assign({},object)).reverse().forEach(function([ key , value ]){
            if ( value.constructor === Object || value.constructor === Array ) {
                new_object[key] = deepReverse(value);
            }
            else {
                new_object[key] = value;
            }
        });
        return new_object ;
    }
}

module.exports = deepReverse;
 
// example console.dir(deepReverse({ hello : [ 'a' , 'b'] , 'l' : [ 'd' , 's' , { k : 'p' , 'rr' : 'e'}]} ));
 