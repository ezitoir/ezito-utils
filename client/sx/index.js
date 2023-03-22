



/**
 * 
 * 
 * sx is
 */
const mediaQuery = require('../media-query');
 
const Sx = (function(is){
    if(!is) return {};

/**    let xs = '(max-width: 540px)';
    let sm = '(min-width: 540px) and (max-width: 720px)';
    let md = '(min-width: 720px) and (max-width: 960px)';
    let lg = '(min-width: 960px) and (max-width: 1140px)';
    let xl = '(min-width: 1140px)';
 */
    
    let xs = '(min-width: 1px)';
    let sm = '(min-width: 540px) ';
    let md = '(min-width: 720px) ';
    let lg = '(min-width: 960px) ';
    let xl = '(min-width: 1140px)';
    let callback = function( objectCallback , context = Element ){ 
        if(typeof objectCallback != 'object') return ;

        let xs = '(min-width: 1px)';
        let sm = '(min-width: 540px) ';
        let md = '(min-width: 720px) ';
        let lg = '(min-width: 960px) ';
        let xl = '(min-width: 1140px)';

        mediaQuery(xs , {
            up : function(){
                if(objectCallback.xs){
                    if( typeof objectCallback.xs.up == 'function'){
                        objectCallback.xs.up.call( context , );
                    }
                }
            },
            down : function(){
                if(objectCallback.xs){
                    if( typeof objectCallback.xs.down == 'function'){
                        objectCallback.xs.down.call( context , );
                    }
                }
            }
        } , context);

        mediaQuery(sm , {
            up : function(){
                if(objectCallback.sm){
                    if( typeof objectCallback.sm.up == 'function'){
                        objectCallback.sm.up.call( context , );
                    }
                }
            },
            down : function(){
                if(objectCallback.sm){
                    if( typeof objectCallback.sm.down == 'function'){
                        objectCallback.sm.down.call( context , );
                    }
                }
            }
        } , context);

        mediaQuery(md , {
            up : function(){
                if(objectCallback.md){
                    if( typeof objectCallback.md.up == 'function'){
                        objectCallback.md.up.call( context , );
                    }
                }
            },
            down : function(){
                if(objectCallback.md){
                    if( typeof objectCallback.md.down == 'function'){
                        objectCallback.md.down.call( context , );
                    }
                }
            }
        } , context);

        mediaQuery(lg , {
            up : function(){
                if(objectCallback.lg){
                    if( typeof objectCallback.lg.up == 'function'){
                        objectCallback.lg.up.call( context , );
                    }
                }
            },
            down : function(){
                if(objectCallback.lg){
                    if( typeof objectCallback.lg.down == 'function'){
                        objectCallback.lg.down.call( context , );
                    }
                }
            }
        } , context);

        mediaQuery(xl , {
            up : function(){
                if(objectCallback.xl){
                    if( typeof objectCallback.xl.up == 'function'){
                        objectCallback.xl.up.call( context , );
                    }
                }
            },
            down : function(){
                if(objectCallback.xl){
                    if( typeof objectCallback.xl.down == 'function'){
                        objectCallback.xl.down.call( context , );
                    }
                }
            }
        } , context);

    };

    Object.defineProperty( callback , 'sizing' , {
       value : {
           xs , sm , md , lg , xl 
       }
    });

    Object.defineProperty( callback , 'renderToString' , {
        value : function ({ xs , sm , md , lg , xl }){
            if(xs)
            xs = `@media ${callback.sizing.xs} {${xs}}`;
            if(sm)
            sm = `@media ${callback.sizing.sm} {${sm}}`;
            if(md)
            md = `@media ${callback.sizing.md} {${md}}`;
            if(lg)
            lg = `@media ${callback.sizing.lg} {${lg}}`;
            if(xl)
            xl = `@media ${callback.sizing.xs} {${xl}}`;
            let result = { xs , sm , md , lg , xl };
            let context = {
                toString : function(){ 
                    return Object.entries(result).map(function([ key , value ]){
                        if(value) return value;
                    }).join('\r\n');
                } ,
                ...result
            }
            return context; 
        }
    });
    return callback;
})( typeof window == 'undefined' ? false : true );
  

module.exports = Sx;