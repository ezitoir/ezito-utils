'use strict';

function elementAttributesToRectProps( node ){
    const allAttributes = node.attributes;
    const attributesObject = {}
    for (const key in allAttributes) { 
        if (Object.hasOwnProperty.call(allAttributes, key)) {  
            attributesObject[allAttributes[key].name] = allAttributes[key].value 
        } 
    } 
    return attributesObject;
}

module.exports = elementAttributesToRectProps;