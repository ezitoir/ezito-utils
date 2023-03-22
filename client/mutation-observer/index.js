
/* 
example 
        Mutation( this.ref.current , function( m ){
            return {
                attributes : ( n ) =>{
                     
                },
                child : ({ add , remove })=>{
                    console.log( added)
                    console.log( added)
                }
            }
        });
        this.ref.current.appendChild( document.createElement('li'));
*/


(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = global || self, factory(global.$e = {}));
  }(this, (function (exports) {
    'use strict';
    exports.watchDOMNodeChange = (function( client , mutation ){
        if(typeof MutationObserver === 'undefined') return () =>{
            console.log('this browers not supported from MutationObserver');
            return false;
        }
        if ( client == undefined || mutation == undefined ) return false ;
        
        return function ( node , ...options ){
            let callback = null;
            let option = { childList : true, subtree: true, attributes: true, characterData: true , attributeOldValue : true , context : false } ; /* deafult value  */
            
    
            if( typeof options[0] == 'function' ){
                callback = options[0];
                if(typeof options[1] == 'object'){
                    option = {...option , ...options[1]} ;
                }
            }
            else if (typeof options[0] == 'object'){
                option = { ...option , ...options[0]};
                if(typeof options[1] == 'function'){
                    callback = options[1];
                }
            }
    
    
           
            let mutation = new MutationObserver(function(mutationList) {
                mutationList.forEach(function(mutation) { 
                    if( callback ){
                        let filter = callback.call( node , mutation );
                        if( typeof filter == 'object' ){ 
                            switch(mutation.type) {
                                case "attributes":
                                    if( typeof filter.attributes == 'function' ){
                                        filter.attributes.call( option.context || mutation , { name : mutation.attributeName , value : mutation.attributeOldValue } , )
                                    }
                                break;
                                case "childList": 
                                    if( typeof filter.child == 'function' ){
                                        let added =  [].slice.call(mutation.addedNodes).filter(function (v, i, self) {  return i == self.indexOf(v);; }) ;
                                        let removed =  [].slice.call(mutation.removedNodes).filter(function (v, i, self) {  return i == self.indexOf(v);; }) ; 
    
                                        let eventChangeNode = filter.child.call( option.context || mutation , { 
                                            add : added , remove : removed
                                        });
    
                                        if( typeof eventChangeNode == 'object' ){
                                            if(typeof eventChangeNode.add == 'function' ){
                                                eventChangeNode.add.call( option.context || mutation , added );
                                            }
                                            if(typeof eventChangeNode.remove == 'function' ){
                                                eventChangeNode.remove.call( option.context || mutation , removed );
                                            }
                                        }
                                    }
                                break;
                            }
                        }
                    }
                });
            });
            
            mutation.observe( node , option );
            return mutation;
        }
    
    })( typeof window == 'undefined' ? undefined : window , typeof MutationObserver != 'undefined'  ? MutationObserver : undefined );
})));