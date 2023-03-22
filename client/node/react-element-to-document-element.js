'use strict';
const isReactElement = require('ezito/utils/public/is/react/element');

/** 
 *  example :
 *  const newelement = ractElementToDocElement( ReactElement );
 *  document.head.appendChild(newelement) 
 */
/** 
 * @param {ReactElement} reactElement 
 * @returns {Element}
 */
function prepareReactElement( reactElement ){
    const newElement = document.createElement( reactElement.type );
    const children = reactElement.props.children;
    
    if( children ){
        if(isReactElement(children)){

        }
        else if( children instanceof Array && children.length ){
            for (const child of children) {
                if( isReactElement(child)){

                }
                else {

                }
            }
        }
        else {
            newElement.innerHTML = children
        }
    }

    for (const key in reactElement.props) {
        if (Object.hasOwnProperty.call( reactElement.props, key) && key !== 'children') { 
            newElement.setAttribute( key ,  reactElement.props[key])
        }
    }

    return newElement;
}

module.exports = prepareReactElement;