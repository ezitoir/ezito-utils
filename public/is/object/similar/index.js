'use strict';

function isSimilar( object , stepObject ){
    for (const key in object) {
        if (Object.hasOwnProperty.call(stepObject, key)) {
            if(typeof object[key] === "object"){
                var is = isSimilar( object[key] , stepObject[key]) ;
                if(!is) return is;
            }
            else {
                if(object[key] != stepObject[key]){
                    if( typeof object[key] == "string" && typeof stepObject[key] == "string"){
                        if( object[key].toLowerCase() != stepObject[key].toLowerCase()){
                            return false
                        }
                    }
                    else{
                        return false;
                    }
                }
            }
        }
        else {
            return false;
        }
    }
    return true
};

module.exports = isSimilar;