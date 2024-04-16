'use strict';

const isString = require('ezito-utils/public/is/string');
const isFunction = require('ezito-utils/public/is/function');
const isArrowFunction = require('ezito-utils/public/is/arrow-function');
const isAsyncFunction = require('ezito-utils/public/is/async-function');

const isClass = require('ezito-utils/public/is/class'); 
const isArray = require('ezito-utils/public/is/array');
const isBoolean = require('ezito-utils/public/is/boolean');
const isNumber = require('ezito-utils/public/is/number');
const isObject = require('ezito-utils/public/is/object'); 
const isSymbol = require('ezito-utils/public/is/symbol');
const isPromise  = require('ezito-utils/public/is/promise');


const EzitoTypes = {};
 
/**
 * @param {any} param 
 * @returns {boolean}
 */
EzitoTypes.string = function stringCheck (param){
    return isString(param);
};

/**
 * @param {any} object 
 * @returns {boolean}
 */
EzitoTypes.promise = function (object){
    return isPromise(object);
}

/**
 * @param {any} param 
 * @returns {boolean}
 */
EzitoTypes.function = function functionCheck(param){
    return isFunction(param);
};

/**
 * @param {any} param 
 * @returns {boolean}
 */
EzitoTypes.class = function (param){
    return isClass(param);
};

/**
 * @param {any} param 
 * @returns {boolean}
 */
EzitoTypes.boolean = function (param){
    return isBoolean(param);
};

/**
 * @param {any} param 
 * @param {function} validator
 * @returns {boolean}
 */
EzitoTypes.array = function (param , validator){ 
    function Validator(_args , _validator){
        for (const iterator of param) {   
            if(isArray(_validator)){
                if(!isArray(iterator)) return false;
                if(iterator.length !== _validator.length ) return false;
                for (let index = 0; index < _validator.length; index++) {
                    if(!_validator[index](iterator[index])) return false;
                }
            }
            else { 
                if(isFunction(_validator) && !_validator(iterator)) return false;
            }
        }
        return true;
    }
    if(isArray(param) && Validator(param, validator)) return isArray(param)
    return false;
};


/**
 * @param {any} param 
 * @returns {boolean}
 */
EzitoTypes.number = function (param){
    return isNumber(param);
};
/**
 * @param {any} param 
 * @returns {boolean}
 */
EzitoTypes.arrowFunction = function (param){
    return isArrowFunction(param);
};
/**
 * @param {any} param 
 * @returns {boolean}
 */
EzitoTypes.asyncFunction = function (param){
    return isAsyncFunction(param);
};
/**
 * @param {any} param 
 * @returns {boolean}
 */
EzitoTypes.object = function objectCheck(param){
    return isObject(param);
};
/**
 * @param {any} param 
 * @returns {boolean}
 */
EzitoTypes.symbol = function objectCheck(param){
    return isSymbol(param);
};
/**
 * @param {any} param 
 * @returns {boolean}
 */
EzitoTypes.undefined = function objectCheck(param){
    return typeof param === "undefined" || param === undefined;
};
/**
 * @param {...any} args 
 * @returns {function}
 */
EzitoTypes.oneOfType = function oneOfTypeCheck(...args){
    return function oneOfCheckCreator(param) { 
        for (const iterator of args) { 
            if(iterator(param)) return true; 
        } 
        return false;
    }
}


module.exports = EzitoTypes;