'use strict';
var isAsyncFunction = require('ezito-utils/public/is/async-function');
var isPromise = require('ezito-utils/public/is/promise');
if(!Object.hasOwnProperty.call(global || globalThis, 'it')){
    Object.defineProperty(global || globalThis,'it',{
        value : function(_if , cb){
            if(isAsyncFunction(cb) || isPromise(cb)){ 
                return new Promise(async (resolve, regect)=>{
                    if(_if) return resolve(await cb());
                    resolve(false);
                });
            }
            if(_if) return cb();
            return false;
        },
        configurable : false,
        writable : false,
        enumerable : true
    });
}

if(!Object.hasOwnProperty.call(global || globalThis, 'fi')){
    /// !if
    Object.defineProperty(global || globalThis,'fi',{
        value : function(_if , cb){
            if(isAsyncFunction(cb) || isPromise(cb)){
                return new Promise(async (resolve, regect)=>{
                    if(_if) return resolve(await cb());
                    resolve(true);
                });
            }
            if(!_if) return cb();
            return true;
        },
        configurable : false,
        writable : false,
        enumerable : true
    }); 
}
if(!Object.hasOwnProperty.call(global || globalThis, 'requireDefault')){
    /// !if
    Object.defineProperty(global || globalThis,'requireDefault',{
        value : function _interopRequireDefault(obj)  {
            return ((obj && obj.__esModule ) || (obj && obj.default ))? obj : { default: obj }; 
        },
        configurable : false,
        writable : false,
        enumerable : true
    }); 
}