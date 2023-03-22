'use strict';

 

function filter ( object = {} , filter = {} , context = null ){

    // * function
    let all = filter['*'];
    // new object
    let newObject = {} ;
    // result of callback
    let result = null ;

    Object.entries(object).map( function([ key , value ]){
 
        if(filter.hasOwnProperty(key)){
            if( typeof filter[key] === 'function'){
                result = filter[key].call( context || object , key , value); 
                if( result ){ 
                    if( typeof result === 'object' ){ 
                        newObject[ result.key ? result.key : key ] = result.value ? result.value : value;
                    }
                    else {
                        newObject[ key ] = value; 
                    }
                }   
            }
            else {
                if( filter[key] ){
                    newObject[result.key] = value; 
                }
            }
        }
        else {
            newObject[key] = value;
        }

        if( typeof all == 'function' && key !== "*" ){ 
            let result = all.call( context || object , key , value ); 
            if( result === false ){
                delete newObject[key]
            }
        }

        return 0;
    });


    Object.entries(filter).map(function([ key , value ]){
 
        if(!object.hasOwnProperty(key)){
            if( typeof filter[key] == 'function'){
                result = filter[key].call( context || object , key , undefined );
                if( typeof result === 'object' ){
                    newObject[result.key ? result.key : key ] = result.value ? result.value : undefined;
                }
                else {
                    if( result ){
                        newObject[key] = result;
                    }
                }
            }
            else {
                if( filter[key] ){
                    newObject[key] = value; 
                }
            } 
        }
        return 0;
    });

    return newObject;
}

module.exports = filter ;
