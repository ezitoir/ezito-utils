'use strict';


function duplicateRemove( array = null | Array() ){
    if(!( array instanceof Array || array.constructor !== Array.prototype.constructor )) throw { TypeError : "params type" };
    return array.filter(function (v, i, self){return i==self.indexOf(v);});
}
module.exports = duplicateRemove;