'use strict';

(function(is){
    if(!is) return false ;
    return function validTag(name = null | String ){
        if(typeof name !== 'string') throw { TypeError : 'param error.'};
        return Object.prototype.toString.call(document.createElement(name)).toLowerCase().indexOf('unknown') > -1 ;
    };

})( typeof window ?? null);
