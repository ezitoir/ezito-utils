'use strict';

const returnTypes = {
    context : undefined,
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
    each (callback ){
        var next = false;
        function stop(){
            next = true ;
        }
        for (var item in this){
            if(Number(item) >=  0){
                callback(this[item].value , stop);
                if(next) break;
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
     * @returns {returnTypes}
     */
    reverse(){
        var arr = [];
        for (var item in this){
            if(Number(item) >=  0){
                arr.push(this[item].value);
            }
        }
        return ArrayToNodeList(arr.reverse());
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
                    callback(this[item].value.value , this[item].value );
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
    valuesWithKey(callback){
        var key ;
        var result = {};
        var value ;
        for (var item in this){
            if(Number(item) >=  0){
                value = this[item].value.value;

                if(typeof callback == "function"){
                    key = callback(value , this[item].value);
                    result[key] = value;
                }

                if(callback instanceof Array){
                    key = callback.pop();
                    result[key] = value;
                }
            }
        }
        return result
    },
    

    /** 
     * @param {function} callback 
     * @returns {object}
     */
    joinWithKey(callback){
        var key ;
        var result = {};
        for (var item in this){
            if(Number(item) >=  0){
                if(typeof callback == "value"){
                    key = callback(this[item].value);
                    result[key] = this[item].value;
                }
                if(callback instanceof Array){
                    key = callback.pop();
                    result[key] = this[item].value;
                }
            }
        }
        return result
    },

    /**
     * @returns {Array} 
     */
    toArray(){
        var arr =[]
        for (var item in this){
            if(Number(item) >=  0){
                arr.push(this[item].value)
            }
        }
        return arr;
    }
};

















/**
 * @param {Array} list 
 * @returns {returnTypes};
 */
function ArrayToNodeList (list = [] ) {
    
    var obj_return = {};
    list.map((x, xi) => obj_return[xi] = { value: x } );
    obj_return.frist = { value: list[0] }; 
    obj_return.last = { value: list[list.length - 1 ] };
    obj_return.length = { value: list.length };
    obj_return.item = { value: returnTypes.item.bind(obj_return) };
    obj_return.each = { value : returnTypes.each.bind(obj_return) };
    obj_return.forEach = obj_return.each; 
    obj_return.values = { value : returnTypes.values.bind(obj_return) };
    obj_return.filter = { value : returnTypes.filter.bind(obj_return) };
    obj_return.joinWithKey = { value : returnTypes.joinWithKey.bind(obj_return) };
    obj_return.map = { value : returnTypes.map.bind(obj_return) };
    obj_return.valuesWithKey = { value : returnTypes.valuesWithKey.bind(obj_return) };
    obj_return.reverse = { value : returnTypes.reverse.bind(obj_return) };
    obj_return.toArray = { value : returnTypes.toArray.bind(obj_return) };

    return Object.create(document.createDocumentFragment().childNodes ,  obj_return );
};

module.exports = ArrayToNodeList;