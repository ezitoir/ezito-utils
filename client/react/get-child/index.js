"use strict";



import React from 'react';

// import utils convert commonJS to esModule
import arrayDeepFlatten from '../../../component-utils/array-deep-flatten';

function getChild ( children , callback ){

    let list = [] ;

    if( React.isValidElement( children )){
        React.Children.map( children , function(child){
            if( React.isValidElement( child )){
                if( callback.call( this , child )){
                    list.push(child);
                }
                list.push(getChild( child.props.children , callback ));
            }
        });
    }
    else if( children instanceof Array ){
        children.map(function(child){
            if( React.isValidElement( child )){
                if( callback.call( this , child )){ 
                    list.push(child);
                }
                list.push(getChild( child.props.children , callback ));
            }
        });
    }

    return arrayDeepFlatten(list) ;
}

export default getChild;
