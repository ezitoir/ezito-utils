'use strict';


module.exports = function( fn , object = undefined ){
    if(typeof object !== "object" && object.length ) throw new Error('param error');
     
    return function (req, res , next ){
        const type = req.method.toLowerCase();
        object = object.map( item => item.toLowerCase()); 
        if(!object.includes(type)) return next(new Error({ status : 404 }));
        return fn.call( this , req ,res , next );
    }
}