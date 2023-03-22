const Cookies = require('cookies');
const { default : DeCrypte } = require('ezito/utils/server/crypto/de');
const { default : EnCrypte } = require('ezito/utils/server/crypto/en');
/**
 * 
 * @param {Function} fn
 * @param {Array} keys 
 * @returns 
 */
module.exports = function ( fn , keys = undefined ){
    return function ( req ,res , next ){
        keys = Boolean(keys) === false ? ['keyboard cat'] : keys ; 
        var cookies = new Cookies( req , res, { keys });
        Object.defineProperty( req , 'cookies' , { value : cookies , writable : false });
        Object.defineProperty( req ,'cookie' , {
            value : {
                /** 
                 * @param {string} name 
                 * @param {string} value 
                 * @param {object} options 
                 * @param {boolean} options.signed
                 * @param {boolean,object} options.encrypt
                 * @returns 
                 */
                add : function( name , value , options = { signed : true , encrypt : false }){
                    const localOptions = { signed : true , ... options };
                    if( cookies.get(name , options) === undefined ){   
                        if(Boolean(localOptions.encrypt)){ 
                            if( typeof localOptions.encrypt === "object" ){ 
                                value = EnCrypte( value , localOptions.encrypt)
                            }
                            else {
                                value = EnCrypte(value);
                            }
                        }
                        delete localOptions.encrypt;
                        cookies.set( name , value , localOptions);
                        return true ; 
                    }
                    return false;
                } ,
                remove : function(name){
                    let localOptions = {  maxAge : 0 }; 
                    cookies.set(name , '', localOptions );
                    return true;
                } ,
                get : function( name , options = { signed : true , encrypt : false }){
                    let localOptions = { signed : true , ...options };
                    let value = cookies.get( name , localOptions );
                    if(Boolean(localOptions.encrypt)){ 
                        if( typeof localOptions.encrypt === "object" ){ 
                            value = DeCrypte( value , localOptions.encrypt)
                        }
                        else {
                            value = DeCrypte(value);
                        }
                    }
                    return value ;
                }
            }
        })
        return fn.call( this , req ,res , next );
    }
}