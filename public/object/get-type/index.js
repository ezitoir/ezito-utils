"use strict";


function getFunctionType(fn){ 
    try {
        if(!fn) return false;
        var fn_string = Object.prototype.toString.call(fn) === '[object Function]';
        var fn_async_string = Object.prototype.toString.call(fn) === '[object AsyncFunction]';
        var constructor = fn instanceof Function.prototype.constructor ;
        if(!constructor && !fn_string && !fn_async_body_function) return false;
        var fn_body = Function.prototype.toString.call(fn).trim().toLowerCase();
        var fn_body_class_string = fn_body.slice(0 , 'class'.length) !== 'class'; 
        var fn_async_body_function = fn_body.slice( 0 , 'async'.length) === 'async';
        var fn_arrow_function = fn_body.slice(0 ,'function'.length ) !== 'function';
        if(fn_async_body_function){
            fn_body = fn_body.slice('async'.length).trim();
            fn_arrow_function = fn_body.slice(0,'function'.length) !== 'function'
        }
        if(fn_body_class_string === constructor ){
            if(fn_string || fn_async_string){
                if(fn_async_body_function){
                    if(fn_arrow_function){
                        return 'async-arrow-function';
                    }
                    return 'async-function';
                }
                if(fn_arrow_function) return 'arrow-function';
                return 'function';
            }  
        }
        else if(!fn_body_class_string){ 
            return 'class';
        }
     } catch (error) {  
        return false; 
    }
}



function getType( object ){ 
    if(getFunctionType(object)){
        return getFunctionType(object);
    }

    if( 
        typeof object === 'object' && 
        object.constructor === Promise && 
        object.then.constructor === Function && 
        Object.prototype.toString.call(object) === '[object Promise]'
    ){
        return 'promise';
    } 

    if( typeof object === "string" && Boolean(object.trim) === true){
        return "string";
    }

    if(typeof object === "number") {
        return "number";
    } 
    if(typeof object === "boolean" && ( object || !object)) {
        return "boolean";
    } 
    if(typeof object === "object" ){
        return "object"
    }
}

module.exports = getType ;
