module.exports = function(){
    var orig = Error.prepareStackTrace;
    Error.prepareStackTrace = function(_, stack){ return stack; };
    var err = new Error;
    try {
        Error.captureStackTrace(err, arguments.callee );
        var stack = err.stack;
        Error.prepareStackTrace = orig;
        return stack;
    } catch (error) {
        let stack = (new Error).stack;
        Error.prepareStackTrace = orig; 
        return stack;
    }
};