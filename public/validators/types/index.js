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
const EzitoTypes = {};

EzitoTypes.string = function stringCheck (param){
    return isString(param);
};
EzitoTypes.function = function functionCheck(param){
    return isFunction(param);
};
EzitoTypes.class = function (param){
    return isClass(param);
};
EzitoTypes.boolean = function (param){
    return isBoolean(param);
};
EzitoTypes.array = function (param , validator = []){
    function Validator(args){
        var counter = 0
        for (const iterator of validator) {   
            if(!iterator(args[counter])) return false;
            counter++;
        }
        return true;
    }
    if(Validator(param, validator)) return isArray(param)
    return false;
};


EzitoTypes.number = function (param){
    return isNumber(param);
};
EzitoTypes.arrowFunction = function (param){
    return isArrowFunction(param);
};
EzitoTypes.asyncFunction = function (param){
    return isAsyncFunction(param);
};
EzitoTypes.object = function objectCheck(param){
    return isObject(param)
};
EzitoTypes.symbol = function objectCheck(param){
    return isSymbol(param)
};
EzitoTypes.oneOfType = function oneOfTypeCheck(...args){
    return function oneOfCheckCreator(param) { 
        for (const iterator of args) { 
            if(iterator(param)) return true; 
        } 
        return false;
    }
}


module.exports = EzitoTypes;