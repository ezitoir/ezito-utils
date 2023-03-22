'use strict';


module.exports = function( fn , object = undefined ){
    if(typeof object !== "object" ) throw new Error('param error');
    return function (req, res , next ){
        if(!Object.entries(object).every(function([ key , value ]){
            key = key.toLowerCase();
            return req.headers[key] === value ;
        })) return next(new Error({ status : 404 }));
        return fn.call( this , req ,res , next );
    }
}