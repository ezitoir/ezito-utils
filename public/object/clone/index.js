'use strict';

function cloneObject(obj) {
    var copy;
 
    if (null == obj || "object" != typeof obj) return obj;
 
    if (obj instanceof Date) {
        copy = new Date();
        copy.setTime(obj.getTime());
        return copy;
    }
 
    if (obj instanceof Array) {
        copy = [];
        for (var i = 0, len = obj.length; i < len; i++) {
            copy[i] = cloneObject(obj[i]);
        }
        return copy;
    }
 
    if (obj instanceof Object) {
        copy = {};
        for (var attr in obj) {
            if (obj.hasOwnProperty(attr)) copy[attr] = cloneObject(obj[attr]);
        }
        return copy;
    }

    throw new Error("Unable to copy obj! Its type isn't supported.");
}

if( typeof structuredClone === "function"){
    module.exports = function (object , option){
        try {
            return structuredClone(object,option);
        } catch (error) {
            return cloneObject(object , option)
        }
    }
}
else {
    module.exports = cloneObject;
}