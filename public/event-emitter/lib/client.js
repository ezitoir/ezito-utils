'use strict';


/**
  * create by ezitoir development
  */
function EventEmitter (){
    if(!this || (this.constructor.name !== 'EventEmitter' || this.constructor !== EventEmitter.prototype.constructor)){
        var err =  new Error();
        err.message = 'EventEmmiter must called by new syntax';
        throw err;
    };
    
    const privateProperty = { 
        listeners : 0 ,
        maxListeners : 10 ,
        getListenersCount : function(name){
            return this.eventsList.list.filter( item => {
                return item.eventName === name;
            }).length;
        },
        removeListener : function(name,listener){
            var newList = [];
            for (const event of privateProperty.eventsList.list) { 
                if( event.eventName !== name || (event.eventName == name && event.listener !== listener)){ 
                    newList.push(event);
                }
            }
            privateProperty.eventsList.list = newList;
            newList = undefined;
            return 1;
        },
        removeAllListener : function(name){
            var newList = [];
            for (const event of privateProperty.eventsList.list) { 
                if(event.eventName !== name ){ 
                    newList.push(event);
                }
            }
            privateProperty.eventsList.list = newList;
            newList = undefined;
            return 1;
        },
        eventsList : {
            add : function (name , listener){
                var filterList = this.list.filter( item => {
                    return item.eventName === name;
                });
                if(filterList.length >= privateProperty.maxListeners) console.warn(
                    ` MaxListenersExceededWarning: Possible EventEmitter memory leak detected. ${privateProperty.maxListeners} ali listeners added to [EventEmitter]. Use emitter.setMaxListeners() to increase limit `
                );
                this.list.push({
                    eventName : name ,
                    listener
                });
                return listener;
            },
            list : [] ,
        },
        emit : function( name , ...args){
            for (const event of privateProperty.eventsList.list) { 
                if( event.eventName === name){ 
                    event.listener.call('' , ...args);
                }
            }
            return true;
        }
    };
    const eventEmitter = this;
    /** 
     * @param {string | symbol} eventName 
     * @param {function} listener 
     * @returns {function listener}
     */
    eventEmitter.on = eventEmitter.addListener = function ( eventName , listener ){
        if(typeof listener !== "function") throw new Error('TypeError [ERR_INVALID_ARG_TYPE]');
        return privateProperty.eventsList.add(
            eventName ,
            listener
        ); 
    }; 
    /**
     * alias off
     * @param {string | symbol} eventName 
     * @param {function} listener 
     */
    eventEmitter.removeListener = function( eventName , listener){
        return privateProperty.removeListener(eventName , listener);
    };
    /**
     * 
     * @param {string | symbol} eventName 
     */
    eventEmitter.removeAllListeners = function(eventName){
        return privateProperty.removeAllListener(eventName);
    };
    /**
     * 
     * @param {string | symbol} eventName 
     * @param  {...any} args 
     */
    eventEmitter.emit = function (eventName , ...args){
        return privateProperty.emit(eventName , ...args);
    };
    eventEmitter.once;
    /**
     * @returns events name
     */
    eventEmitter.eventNames = function (){

    };
    eventEmitter.getMaxListeners = function(){
        return privateProperty.maxListeners;
    };
    eventEmitter.listenerCount = function (eventName){
        return privateProperty.getListenersCount(eventName);
    };
    eventEmitter.listeners;
    eventEmitter.off = eventEmitter.removeListener;
    eventEmitter.setMaxListeners = function (n){
        privateProperty.maxListeners = n;
    };
 
}

module.exports = EventEmitter;