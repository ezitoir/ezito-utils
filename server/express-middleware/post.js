

module.exports = function( fn ){
    return function (req, res , next ){
        const type = req.method.toLowerCase();
        if(type !== 'post') return next(new Error({ status : 404 })); 
        return fn.call( this , req ,res , next );
    }
}