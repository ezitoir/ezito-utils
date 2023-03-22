if (!Object.prototype.watch) {
    Object.defineProperty(Object.prototype, "watch", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function (p, h, $this = null) {
            var ov = this[p], n = ov,
                getter = function () {
                    return n;
                },
                setter = function (nv) {
                    ov = n;
                    var obj = Object.assign({}, this);
                    obj[p] = nv;
                    return n = h.call($this || this, p, ov, nv, obj);
                };
            if (delete this[p]) {
                Object.defineProperty(this, p, {
                    get: getter,
                    set: setter,
                    enumerable: true,
                    configurable: true
                });
            };
            return this;
        },
    });
}
 

const queryMatchEvent = ( match , callback , $this , ...arg) => {

    match.addEventListener('change', (_arg) => {
        try{
            if(_arg.matches ){
                return callback.call( $this , { match : true , ...arg });
            }else{
                return callback.call( $this , { match : false , ...arg});
            }
        }catch( err ){
            console.log(err)
        }
    });
};


const useMediaQuery = ( query = '' , callback , $this = ''  , ...arg )=>{
    const timeInterval = setInterval(()=>{
        try {
            if ( window ){
                clearInterval( timeInterval );
                if( ! arg ) arg = { }
                const match = query.toLocaleLowerCase().split('and').map((x)=>window.matchMedia( query ));
                
                try {
                    if( typeof callback == 'function' ){
                    
                        let _it = match.filter(( mtch )=>{
                            queryMatchEvent( mtch , callback , $this , ...arg);
                            return mtch.matches == true ;
                        });
                        return callback.call($this , { match : _it , ...arg });
                    }
                    else if( typeof callback == 'object' ){
                        callback = { yes : callback.yes || (()=>{}) , no : callback.no || (()=>{}) };
                        const new_func = ({ match } , ...arg)=>{
                            if(match){
                                callback.yes.call( $this , ...arg );
                            }
                            else{
                                callback.no.call( $this , ...arg );
                            }
                        };
                        let _itt = match.filter(( mtch )=>{
                            queryMatchEvent( mtch , new_func , $this ,...arg);
                            return mtch.matches == true ;
                        });
                        if( _itt.length > 0 ){ 
                            return callback.yes.call( $this , ...arg);
                        }
                        return callback.no.call( $this , ...arg);
    
                    }
                } catch (error) {
                    console.log(error)
                }
            }
            
        } catch (error) {
            
        }
    },1);
    return null ;
}

export default useMediaQuery;