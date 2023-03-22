'use strict;'

const EventEmitter = function(){ 
    if(this instanceof Window || this.constructor.name !== 'EventEmitter' || this.constructor !== EventEmitter.prototype.constructor) throw new Error();
    
    
    let fn_list = [];
    const $$this = this ;
    this.emit = function (type , ...args ){ 
        fn_list.forEach(function(item){
            if( item.type === type ){
                return item.callback.call($$this , ...args)
            }
        })
    };
    this.on = function ( type , callback ){
        type = type.trim();
        fn_list.push({ type , callback });
        return callback;
    };
    this.removeAllListeners = function (type){
        type = type.trim();
        fn_list = fn_list.filter(function( item ){
            return item.type === type
        })
    };
    this.removeListener = function (type , callback){
        type = type.trim();
        fn_list = fn_list.filter(function( item ){
            return item.callback === callback && item.type === type 
        })
    }
    this.clear = this.removeListener ;
    this.clearAll = this.removeAllListeners ;
};

/**
 * 
 */
module.exports = EventEmitter ;