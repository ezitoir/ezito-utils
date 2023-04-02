'use strict';

function isFunction(fn){ 
  try {
      if(!fn) return false; 
      const isFnString = ['[object Function]' , '[object AsyncFunction]'].includes(Object.prototype.toString.call(fn));
      const isFnNotClass = Function.prototype.toString.call(fn).trim().toLowerCase().slice(0 , 5 ) !== 'class' ;
      const constructor = fn instanceof Function.prototype.constructor ; 
      if(isFnString && isFnNotClass && constructor) return true; 
  } catch (error) {  
  }
  
  return false; 
};

module.exports = isFunction;
 