'use strict';


const ArrayToNodeList = function (list = [] ) {
    var obj_return = {};
    list.map( (x, xi) => obj_return[xi] = { value: x } );
    obj_return.item = { value: function (i) { return this[+i || 0] } };
    obj_return.frist = { value: list[0] }; 
    obj_return.last = { value: list[list.length - 1 ] };
    obj_return.length = { value: list.length };
    obj_return.each = {
        value : function ( fn ){
            list.forEach(fn);
        }
    }
    return Object.create(document.createDocumentFragment().childNodes ,  obj_return );
};

module.exports = ArrayToNodeList;