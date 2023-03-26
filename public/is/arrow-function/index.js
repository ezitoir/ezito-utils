 
function isArrowFunction(fn){ 
    try {
        const fn_string = Object.prototype.toString.call(fn) === '[object Function]';
        const is_fn = Function.prototype.toString.call(fn).trim().toLowerCase().slice(0 ,'function'.length ) !== 'function';
        if(!fn) return false; 
        return fn_string === is_fn && typeof fn === "function" ;
    } catch (error) {
        return false;
    }
};

module.exports = isArrowFunction;
