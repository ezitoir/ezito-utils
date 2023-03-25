'use strict';
const getTrace = require('./../trace');

function makeError (type , message, id = 0){
    var trace = getTrace(1 + id);
    var lineNumber = trace.getLineNumber();
    var fileName = trace.getFileName();
    var functionName = trace.getFunctionName();
    var error = new Error;
    if(typeof Component !== 'undefined'){
        error.stack = error.stack.substring(error.stack.indexOf('\n') + (1 + id))
    }
    else if (typeof chrome !== 'undefined' || typeof process !== 'undefined'){

        for (let index = 0; index < 2; index++) {
            error.stack = error.stack.replace(/\n[^\n]*/, '') ;
        }

        for (let index = 1; index < id ; index++) {
            error.stack = error.stack.replace(/\n[^\n]*/, '') ; 
        }

        error.stack = (
            type +
            (message ? (': ' + message) : '') +
            error.stack.substring(5)
        );
    } 
    
    // error.name = type ;
    // error.message = message;
    error.line = lineNumber;
    error.fileName = fileName;
    error.functionName = functionName;
    return error;
}

makeError.throw = function (type,message,id = 0){
    if(type instanceof Error) throw type;
    var newError = makeError(
        type ,
        message ,
        id + 2
    );
    throw newError;
}
module.exports = makeError;