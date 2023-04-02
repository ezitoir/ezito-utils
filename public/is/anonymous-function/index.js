'use strict';


 
function isAnonymousFunction(fn){ 
    if(!fn || typeof fn !== 'function') return false;
    try {
        const fnBlockString = Function.prototype.toString.call(fn).trim();
        const fnTypeIndex = ['[object Function]' , '[object AsyncFunction]' ].indexOf(Object.prototype.toString.call(fn));
        const fnTypeName  = ['function' , 'async function'];
        const isNotClass  = fnBlockString.slice(0 , 'class'.length) !== 'class';
        const isHaveName  = fnBlockString.slice(
            fnBlockString.indexOf(fnTypeName[fnTypeIndex]) + fnTypeName[fnTypeIndex].length ,
            fnBlockString.indexOf('(')
        );
        if(fnTypeIndex > -1){
            if(isHaveName.trim() === "" && fnBlockString.slice(0 , fnTypeName[fnTypeIndex].length) === fnTypeName[fnTypeIndex] && isNotClass && fn instanceof Function.prototype.constructor ) return true;
        } 
    } catch (error) {}
    return false;
};

module.exports = isAnonymousFunction;
