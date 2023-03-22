
    const getLocalStorage = function( name ){
        if( typeof process === 'undefined' && typeof window === 'object' ){
            return window.localStorage.getItem(name);
        }
        return undefined;
    }
    const setLocalStorage = function( name , value ){
        if( typeof process === 'undefined' && typeof window === 'object' ){
            return window.localStorage.setItem(name , value);
        }
        return undefined;
    }

    module.exports = { 
            get : getLocalStorage ,
            set : setLocalStorage , 
    }