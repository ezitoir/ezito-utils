'use strict';

const returnTypes = {

    frist : undefined,
    last : undefined,
    length : undefined,

    /**
     * @param {number} index 
     * @returns {Node} 
     */
    item ( index ) {
        return this[+index || 0].value;
    },
    

    /**
     * @param {function} callback 
     * @returns {undefined}
     */
    each (callback){
        for (var item in this){
            if(Number(item) >=  0){
                callback(this[item].value);
            }
        }
    },

    /** 
     * @param {function} callback 
     * @returns {returnTypes}
     */
    map(callback){
        var arr = [];
        for (var item in this){
            if(Number(item) >=  0){
                arr.push(callback(this[item].value));
            }
        }
        return ArrayToNodeList(arr);
    },

    /** 
     * @param {function} callback 
     * @returns {returnTypes}
     */
    filter(callback){
        var arr = [];
        var is ;
        for (var item in this){
            if(Number(item) >=  0){
                is = callback(this[item].value);
                if(is) arr.push(this[item].value);
            }
        }
        return ArrayToNodeList(arr);
    },

    /** 
     * @param {function} callback 
     * @returns {returnTypes}
     */
    values(callback){
        var arr = [];
        
        if(typeof callback === "function" ){
            for (var item in this){
                if(Number(item) >=  0){ 
                    callback(this[item].value.value , this[item].value);
                }
            } 
        }

        
        for (var item in this){
            if(Number(item) >=  0){ 
                arr.push(this[item].value.value);
            }
        }
        return ArrayToNodeList(arr);
    },
    /** 
     * @param {function} callback 
     * @returns {object}
     */
    valuesWithKey(callback){},
    /** 
     * @param {function} callback 
     * @returns {object}
     */
    joinWithKey(callback){ 
        var key ;
        var result = {};
        this.map(function(item){
            key = callback(item);
            result[key] = item;
        });
        return result
    }
};



module.exports = returnTypes;