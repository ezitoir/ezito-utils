'use strict';
const isFunction = require('ezito-utils/public/is/function');
const isClass = require('ezito-utils/public/is/class');
const isString = require('ezito-utils/public/is/string');
const isNumber = require('ezito-utils/public/is/number');
const isBoolean = require('ezito-utils/public/is/number');
/**
 * 
 */
function isObject(param){
    return (
        param !== undefined && 
        param !== null && 
        !isFunction(param) &&
        !isClass(param) &&
        !isString(param) &&
        !isBoolean(param) && 
        !isNumber(param) && 
        param !== NaN
    );
}
Object.defineProperty(isBoolean.prototype,'similar',{
    value : require('ezito-utils/public/is/object/similar'),
    writable : false ,
    configurable : false
}); 
module.exports.__esModule = true;
module.exports = isObject;
module.exports['default']= module.exports;