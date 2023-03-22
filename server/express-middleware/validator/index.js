'use strict';
 

/**
 * 
 * @param {string} pName 
 * @returns 
 */
const body = function(pName){
    const name = String(pName).toLowerCase() ;
    const config = {
        msg  : undefined ,
        length : undefined ,
        email : undefined ,
        phone : undefined ,
        notEmpty : undefined ,
        number : undefined ,
    };
    
    const validator = {
        length : ( value ) => {
            if(typeof config.length === "function" ){
                return config.length.call( this , value );
            }
            else if( typeof config.length === "object" ){
                let is = true ;
                if(config.length.min && Number(config.length.min)){ 
                    is = String(value).length >= config.length.min ;
                }
                if(config.length.max && Number(config.length.max) && is ){
                    is = String(value).length <= config.length.max ;
                }
                return is;
            }
            return String(value).length === config.length ;
        } ,
        email : (email) => {
            return String(email).toLowerCase().match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                ); 
        },
        number : function(value){
            let is = !!Number(value);
            if(typeof config.length === "function" ){
                return config.length.call( this , value );
            }
            else if( typeof config.length === "object" ){ 
                if(config.length.min && Number(config.length.min) && is){ 
                    is = value >= config.length.min ;
                }
                if(config.length.max && Number(config.length.max) && is ){
                    is = value <= config.length.max ;
                } 
            }
            return is;
        },
        phone : function(reqular){
            
        },
        notEmpty : function( value ){
            return String(value).trim() !== "";
        },
    };

    const fn = function(req,res,next){
        try {
            if(!req.validator){
                Object.defineProperty( req , 'validator' , {
                    value : { 
                        error : [] , 
                        done : true ,
                    } ,
                    writable : true
                });
            }
            
            if(!req.body[name]){ 
                req.validator.error.push({
                    name ,
                    message : config.msg
                });
            }
            else {
                var nValue = req.body[name];
                Object.entries(config).forEach(([ key , value])=>{
                    if(value){
                        let is = validator[key] ? validator[key].call( this , nValue ) : true ;
                        if(!is){
                            req.validator.error.push({
                                name ,
                                message : config.msg
                            });
                            req.validator.done  = false ;
                        }
                    }
                });
            };

        } catch (error) {
            req.validator.error.push({
                name : "unknow" ,
            })
        };
        if(req.validator.error.length){
            req.validator.done = false;
        }
        next();
    };

    /**
     * 
     * @param {string} message 
     * @returns 
     */
    fn.withMessage = function(message){
        config.msg = message;
        return fn;
    };
    /**
     * 
     * @param {Number | Object.min & Object.max } length 
     * @returns 
     */
    fn.withLength = function(length){
        config.length = length ;
        return fn;
    }; 
    fn.isEmail = function(){
        config.email = true;
        return fn;
    };
    fn.isNumber = function(){
        config.number = true ;
        return fn;
    }
    fn.notEmpty = function(){
        config.notEmpty = true;
        return fn;
    };
    return fn ;
};




/**
 * 
 * @param {string} name // file name
 */
const files = function(name){
    let withMessage = false ;
    const validator =  {
        withSize : function(value){
            return value ;
        },
    };
    const config = {
        withSize : false ,
    };

    const fn = function(req,res,next){
        const validatored = false ;
        Object.entries(config).forEach(function([ key , value ]){
            if( value ){
                if(!validator[key](value)( req.files ? req.files[name] : null )){
                    validatored = true ;
                }
            }
        });
        if( !req.files ) validatored = true ;

        if(
            (req.files && typeof req.files === 'object' && !req.files[name] )
            || 
            validatored
        ){
            if( req.validator && req.validator.error instanceof Array ){
                req.validator.error.push(
                    {
                        name ,
                        message : !!withMessage === true ? withMessage : undefined 
                    }
                )
            }
            else {
                if(!req.validator) req.validator = { error : [] };
                req.validator.error = [
                    {
                        name ,
                        message : !!withMessage === true ? withMessage : undefined 
                    }
                ];
            }
        }
        else {
            console.log(req.files && typeof req.files === 'object')
        }
    };

    /**
     * 
     * @param {string} message_text 
     */
    fn.withMessage = function(message_text){
        withMessage = message_text ;
        return fn;
    };

    return fn;
};


const check = function(req){
    if(req && req.validator && req.validator.error.length > 0 ) return req.validator.error;
    return false;
};

const mergeValidators = function ( validatorList ){
    if(!( validatorList instanceof Array )) throw new Error('param error');

    return function ( req ){
        validatorList.map(function(validator){
            if(!( typeof validator === "function" )) throw new Error('validator error');

            validator(req,null,()=>{});
        });

    };
};

/**
 * 
 * @param {Array} validatorList 
 * @returns 
 */
const createValidator = function(validatorList){
    if(!(validatorList instanceof Array)) throw new Error('param error');
    
    return function(fn){
        if(!(typeof fn === "function")) throw new Error('param error , fn must be function middleware.');

        return function(req,res,next){ 
            validatorList.map(function(validator){
                if(!( typeof validator === "function" )) throw new Error('validator error');
    
                validator(req,null,()=>{});
            });
            fn(req,res,next)
        }
    }
};
/**
 * example
 * 
 * 
 * 
 * 
import { createValidator , body , check } from 'ezito/utils/server/express-middleware/validator';
const whitValidator = createValidator([
    body('name').withMessage('error for name')
]);
async function AddSampleWork( req ,res , next ){
    if(check(req)) return res.send(req.validator)
    res.send({
        done : true
    })
};
export default whitValidator(Post(WitCookies(AddSampleWork)));
 */

module.exports = { body , files , check , mergeValidators , createValidator };