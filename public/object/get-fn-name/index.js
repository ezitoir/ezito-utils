'use strict';
const isFunction = require('ezito-utils/public/is/function');
const makeError = require('ezito-utils/public/make-error');

module.exports = function getFunctionName(fn){
    if(!isFunction(fn)) throw makeError(
        '[PARAM-TYPE-ERROR]' ,
        'fn param must be have function type' ,
        1
    );
    var pureFn = Function.prototype.toString.call(fn).slice('function'.length).trim();
    var name = pureFn.slice(0 , pureFn.indexOf('('));
    return name;
}