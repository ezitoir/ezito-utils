

const Mutation = (function( client , mutation ){
    if ( client == undefined || mutation == undefined ) return false ;
    

    return function ( node , ...options ){
        let callback = null;
        let option = { childList: true, subtree: true, attributes: true, characterData: true , } ; /* deafult value  */
        

        if( typeof options[0] == 'function' ){
            callback = options[0];
            if(typeof options[1] == 'object'){
                option = options[1];
            }
        }
        else if (typeof options[0] == 'object'){
            option = options[0];
            if(typeof options[1] == 'function'){
                callback = options[1];
            }
        }



        let mutation = new ResizeObserver(function(mutationList) {
            mutationList.forEach(function(mutation) { 
                if( callback ){
                    let filter = callback.call( mutation , mutation );
                    if( typeof filter == 'object' ){
                         
                    }
                }
            });
        });
        
        mutation.observe( node , option );
        return mutation;
    }

})( typeof window == 'undefined' ? undefined : window , typeof ResizeObserver != 'undefined'  ? ResizeObserver : undefined );

export default Mutation ;