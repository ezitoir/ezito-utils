'use strict';

const isFunction = require( "ezito-utils/public/is/function");
const isHttp = require( "ezito-utils/public/is/http");
const trace = require('ezito-utils/public/trace');
const isArray = require( "ezito-utils/public/is/array");

module.exports = function ( fn ){
    const error = trace.createErrorOption(1,"parametr type error [fn] must be have function type")
    if(!isFunction(fn)){
        throw error;
    }
    
    return function (req ,res ,next){
        if(!isHttp.request(req)){
            throw (trace.createErrorOption(1,"req param must be have http request type"))
        }
        if(!isHttp.response(res)){
            throw (trace.createErrorOption(1,"res param must be have http response type"))
        }
        const type = req.method.toLowerCase();
        if(type !== 'post') {
            if(isFunction(next)){
                return next(new Error({ status : 405 })); 
            }
        }
        return fn.call( this , req , res , next );
    }
}