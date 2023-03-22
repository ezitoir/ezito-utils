 





const useMediaQuery = (function(){



    function queryMatchEvent( matchs = [] , callback , context, ...arg){

        if( matchs.length > 0){
            matchs[0].addEventListener( 'change', (_arg) => { 
                let check_all_matches = matchs.filter((mtch)=>mtch.matches==true);
    
                if(check_all_matches.length == matchs.length){
                    return callback.up.call( context , { matches : true , ...arg });
                }
                else{
                    return callback.down.call( context , { matches : false , ...arg});
                }
            });
        }
    };




    function createObjectCallback ( callback = null ){
    
        if( callback == null || callback == undefined ) return false;
    
        if( typeof callback == 'function') {
            return {
                up : ( ...arg ) => {
                    callback.call( this , { matches : true ,  ...arg });
                },
                down : (...arg ) => {
                    callback.call( this , { matches : false ,  ...arg })
                }
            }
        }
        else if ( typeof callback == 'object' ){ 
            return {
                up : ( ...arg )=>{
                    callback.up = typeof callback.up != 'function' ?  function(){} : callback.up;
                    callback.up.call( this ,{ matches : true ,  ...arg } );
                },
                down : (...arg )=>{
                    callback.down = typeof callback.down != 'function' ?  function(){} : callback.down; 
                    callback.down.call( this , { matches : false ,  ...arg })
                }
            }
        }
    }
 


    return function ( query = String() , callback , context = ''  , ...arg ){
        const match = query.toLocaleLowerCase().split('and').map((x) => window.matchMedia( query ));
    
        callback = createObjectCallback( callback , context , ...arg );
        if( !callback ) throw Error("callback is valid !");
    
        if( match.length > 0 ){
            let check_all_matches = match.filter((mtch)=>mtch.matches==true);
            if( check_all_matches.length == match.length  ){
                callback.up.call( context , { matches : true,  ...arg }); 
            }
            else {
                callback.down.call( context , { matches : false ,  ...arg }); 
            }
            queryMatchEvent( match , callback , context , ...arg );
        }  
        return null ;
    }
})( typeof window == 'undefined' ? false : true );

module.exports = useMediaQuery;