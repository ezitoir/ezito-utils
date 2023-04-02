


 
function isFunction(fn){ 
    if(!fn || typeof fn !== "function") return false;
    try {  
        const is_function = typeof fn === "function";
        const fn_async_string = Object.prototype.toString.call(fn) === '[object AsyncFunction]';
        const fn_body_string = Function.prototype.toString.call(fn).trim().toLowerCase().slice(0 , 5 ) !== 'class' ;
        const is_async = Function.prototype.toString.call(fn).trim().toLowerCase().slice( 0 , 'async'.length) === 'async';
        const constructor = fn instanceof (async function (){}).constructor; 
        return is_function == fn_async_string == fn_body_string == is_async == constructor 
    } catch (error) { 
        return false;
    }
};
  
module.exports = isFunction;
  

   