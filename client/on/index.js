

const On = (function( is ){
    if(!is) return 0 ;

    
    if( typeof Node.prototype.on === 'undefined' ) {
        Object.defineProperty( NodeList.prototype , 'on' , {
            value : function ( ...argumant ){
                return this.elements.array.map( el=>el.on( ...argumant));
            },
        });
        Object.defineProperty( Node.prototype , 'on' , {
            value : function ( type , callback , option ){ 
                return this.addEventListener( String(type).trim() , callback ,  ...option);
            },
        });      
    }
    
    return function ( node , type , callback = ()=>{} , ...options ){
        if( typeof type == 'string' ){
            if(node.on === undefined ){
                if( node.addEventListener ){
                    return node.addEventListener( type , callback , ...options );
                }
                return 0;
            }
            return node.on( type , callback , options);
        }
        else if (typeof type == 'object' ){
            return Object.keys( type).map( function(key){
                if(node.on === undefined){
                    if( node.addEventListener ){
                        return node.addEventListener( key , type[key] , ...options );
                    }
                    return 0;
                }
                return node.on( key , type[key] , ...options);
            });
        }
    }
})( typeof window == 'undefined' ? false : true );


module.exports = On;
