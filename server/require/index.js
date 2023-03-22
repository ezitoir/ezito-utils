"use strict";
const resolve = require('ezito/utils/server/fs/resolve');
const path = require('path');
 
/**
 * 
 * 
 * 
 * 
 */
 const Require = {
    Default : function (...module_path) {  
        module_path = path.join(...module_path);
        
        try {
            _require = require(resolve(module_path));
        } catch (error) {
            return new Error(error.code) ;
        }
        
        if( _require.default ){
            return _require.default;
        }
        else {  
            return _require;
        }
    },
    withCards : function( ...module_path ){
        const path = require('path'); 
        let _require = require(require.resolve(path.join(...module_path)));
        let _default = Object() ;
        let _cards = Object();
        if( _require.default !== undefined ){
            _default = _require.default ;
            _require.default = null ;
            _cards = _require ;
        }
        else {
            _default = _require ;
        }
        return {..._cards , default : _default };
    },
};
module.exports = Require; 