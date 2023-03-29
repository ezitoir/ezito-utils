'use strict';
const isFunction = require('ezito-utils/public/is/function');
const isString   = require('ezito-utils/public/is/string');
const makeError  = require('ezito-utils/public/make-error');

module.exports = function getFunctionName(fn){
    if(!isFunction(fn) && !isString(fn)) throw makeError(
        '[PARAM-TYPE-ERROR]' ,
        'fn param must be have function | string type' ,
        1
    );
    var pureFn = isString(fn) ? fn : Function.prototype.toString.call(fn).slice('function'.length).trim();
    var name = pureFn.slice(0 , pureFn.indexOf('('));
    return name;
}