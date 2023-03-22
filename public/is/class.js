 
function isClass(fn){
  const toString = Function.prototype.toString
  
  function fnBody (fn) {
    return toString.call(fn).replace(/^[^{]*{\s*/, '').replace(/\s*}[^}]*$/, '')
  }

  function _isClass (fn) {
    if (typeof fn !== 'function') {
      return false
    }

    if (/^class[\s{]/.test(toString.call(fn))) {
      return true
    }

    // babel.js classCallCheck() & inlined
    const body = fnBody(fn)
    return (/classCallCheck\(/.test(body) || /TypeError\("Cannot call a class as a function"\)/.test(body))
  }
  try {
      const fn_string = Object.prototype.toString.call(fn) === '[object Function]';
      const fn_find_class = Function.prototype.toString.call(fn).trim().toLowerCase().slice(0 , 5 ) === 'class';
      const is_function = typeof fn === "function" ;
      if(!fn) return false;
      return fn_find_class == fn_string == is_function && typeof fn === "function" && _isClass(fn); 
  }
  catch(error){
      return false
  }
};

module.exports = isClass;
