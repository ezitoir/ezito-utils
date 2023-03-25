"use strict";

/**
 * 
 * @param {object} object 
 * @param {string} key 
 * @param {function | valueType any[]} valueType 
 * @returns 
 */
function has(object , key , valueType = undefined ){

    if('object' !== typeof object) return false;
    if(object.hasOwnProperty(key) === true){
        if( typeof valueType === "function"){
            return valueType(object[key])
        }
        else {
            if(typeof valueType !== "undefined"){ 
                return typeof object[key] === valueType.trim();
            }
        }
        return true
    }
    return false;
}


module.exports = has;