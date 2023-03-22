'use strict';
const attributesObject = require('ezito/utils/client/node/attributes-to-object');

/**
 * example :
 * 
 * const objectedElement = preparedocElementToReactElement( DocumentElement );
 * const reactElement = React.createElement( objectedElement.name , objectedElement.props , ...objectedElement.children);
 */
/**
 * 
 * 
 * @param {Elemenet} node 
 * @returns {name,props,children}
 */
function prepareDocElementToReactElement( node ){
    if(!(node instanceof Element) && !node.tagName) return ;

    const tagName = node.tagName;
    const allAttributesProps = attributesObject(node);
    const allChildren = node.childNodes;
    let children = [];
    for (const childIndex in allChildren) { 
        if (Object.hasOwnProperty.call(allChildren, childIndex)) { 
            if(allChildren[childIndex] instanceof Element && allChildren[childIndex].tagName){ 
                children.push(prepareReactElement(allChildren[childIndex]))
            }
            else {
                if(allChildren[childIndex] instanceof Text && String(allChildren[childIndex]) == '[object Text]'){ 
                    children.push(allChildren[childIndex].data)
                }
                else {
                    children.push(allChildren[childIndex])
                }
            }
        } 
    }
    
    return {
        name : tagName ,
        props : allAttributesProps ,
        children ,
    };
}

module.exports = prepareDocElementToReactElement;