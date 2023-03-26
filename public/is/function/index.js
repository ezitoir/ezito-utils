 
function isFunction(fn){ 
  try {
      if(!fn) return false; 
      const fn_string = Object.prototype.toString.call(fn) === '[object Function]';
      const fn_async_string = Object.prototype.toString.call(fn) === '[object AsyncFunction]';
      const fn_body_string = Function.prototype.toString.call(fn).trim().toLowerCase().slice(0 , 5 ) !== 'class' ;
      const constructor = fn instanceof Function.prototype.constructor ; 
      return fn_body_string === constructor === (fn_string || fn_async_string) && typeof fn === "function";
  } catch (error) {  
      return false; 
  }
};

module.exports = isFunction;
 