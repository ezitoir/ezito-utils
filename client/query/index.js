require('ezito-utils/client/node-prototype'); 
const ArrayToNodeList = require('ezito-utils/client/array-to-node-list'); 
const NodeAttrToCssSelector = require('ezito-utils/client/node-attr-to-css-selector'); 
const returnTypes = require('ezito-utils/client/array-to-node-list/types');


/**
 * @param {<Node ,Element , String >} node
 * @param {String} query 
 * @param  {...any} children 
 * @returns {returnTypes}
 */

const Query = function ( node , query = null , ...children ) {
    // check if node is function return window load event
    if (typeof node == 'function' && 'call' in node ) {
        return window.addEventListener('DOMContentLoaded' , function (e) {
            return node.call( this , e );
        });
    };

    if( typeof query == 'string') query = query.trim();
    let query_list = [] ,  child_objects = {};
    






    // check if string 
    if (typeof node == 'string' ) {
        let attribute = query ;
        /** create element with text example <div/> ... */
        if (node.match(/<[^>]+[^<]\/>/g) != null ){ 
            //return CreateElement(node ,  attribute || {} , ...children );
        }
        else {
            query_list = [].slice.call(document.querySelectorAll(node)); 
        }
    }
    else {
        if ( node instanceof Node ) {
            query_list = [ node ] ;
        }
        else if( node instanceof NodeList ){
            query_list = [].slice.call( node );
        }

        if( typeof query == 'string' ){
            let temp_query = query.trim() , temp_query_list = []; 
             
            query_list.map( parent => { 
                let attrTemp  = String();
                if( temp_query[0] === ">" ){
                    let random  = Math.round(Math.random() * 100 * Math.random() * 100 );
                    let random2 = Math.round(Math.random() * 100 *Math.random() * 100 );
                    attrTemp =  `Ezito-temp${random}abcd${random2}` ;
                    query = query.slice( 1 , query.length );
                    parent.attr( attrTemp , "1" );
                    query = NodeAttrToCssSelector(parent) + " > " + query;
                    
                }
                try { 
                    temp_query_list.push([].slice.call( parent.querySelectorAll(query) ));
                } catch (e) {
                }
                parent.attr({ attrTemp : null });
            });
            
            
            if( temp_query_list.length > 0 ){ 
                function flatDeep(arr, d = 1) {
                    return d > 0 ? arr.reduce((acc, val) => acc.concat(Array.isArray(val) ? flatDeep(val, d - 1) : val), []) : arr.slice();
                };
                query_list = flatDeep( temp_query_list );
            }
        }
    }  
    (query_list = query_list.filter(function (v, i, self) {  return i == self.indexOf(v);  })).forEach(function (x, i) { child_objects[i] = { value : x };});




     
    return  ArrayToNodeList( query_list );

};

module.exports = Query;
