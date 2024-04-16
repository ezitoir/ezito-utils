'use strict';
const trace = require("../");


/**
 * @class
 */
class EzitoError extends Error {
    constructor () {
      const { name = null ,  message ,  code , lineNumber , fileName , columnNumber , functionName , methodName , evelOrgin} = arguments[0] || trace.createErrorOption(1,"UknowError");
      super(message);
      Error.captureStackTrace(this, this.constructor);
      this.name = name ? name : this.constructor.name
      this.message = message;
      this.code = code,
      this.fileName = fileName;
      this.offset = fileName + ":" + lineNumber + ":" + columnNumber;
      this.lineNumber = lineNumber;
      this.columnNumber = columnNumber;
      this.functionName = functionName;
      this.methodName = methodName;
      this.evelOrgin = evelOrgin;
      const findLineNumber = this.stack.toString().indexOf(`${lineNumber}:${columnNumber}`) + (`${lineNumber}:${columnNumber}`).length;
      this.stack = this.stack.slice(0 , findLineNumber) ;
    }
}


 
module.exports = EzitoError;


