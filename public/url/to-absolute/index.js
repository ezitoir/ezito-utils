'use strict';


const toAbsoulute = function( url , domain = undefined ){
    url = url.trim()[0] !== '/' ? '/' + url.trim() : url ;
    if( typeof window !== 'undefined'){
        // CSR 
        const { protocol  , host , pathname , origin , port , search , hash } = window.location ;
        return origin !== undefined ? origin  + url : protocol + '//' + host + url ;
    }
    else if( typeof process !== 'undefined' && typeof window === 'undefined' ){
        // SSR
        let localDomain = 'http://localhost';
        if( typeof window === "undefined" && typeof process !== "undefined" ){
            if( process.env.DOMAIN !== undefined ){
                localDomain = process.env.DOMAIN ;
            }
        }
        return  ( domain ? domain : localDomain ) + url ;
    }
}

module.exports = toAbsoulute;

