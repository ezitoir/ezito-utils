 
/**
 * 
 */
module.exports = function( index = null ){
    var orig = Error.prepareStackTrace;
    Error.prepareStackTrace = function(_, stack){ return stack; };
    var err = new Error;
    var stack = {};
    try {
        Error.captureStackTrace(err, arguments.callee );
        stack = err.stack;
        Error.prepareStackTrace = orig;
        stack;
    } catch (error) {
        stack = (new Error).stack;
        Error.prepareStackTrace = orig;  
    } 
    
    
    if( stack instanceof Array){
        stack.shift();
    }
    else {
        return stack.split('\n');
    }
    
 
    return {
        list : stack ,
        getThis(){
            if( typeof index === "number" )
            return stack[index].getThis();
            else
            return stack.map(function( item){
                return item.getThis();
            })
        } ,
        getTypeName(){
            if( typeof index === "number" )
            return stack[index].getTypeName();
            else
            return stack.map(function( item){
                return item.getTypeName();
            })
        } ,
        getFunction( ){
            if( typeof index === "number" )
            return stack[index].getFunction();
            else
            return stack.map(function( item){
                return item.getFunction();
            })
        } ,
        getFunctionName( ){
            if( typeof index === "number" )
            return stack[index].getFunctionName();
            else
            return stack.map(function( item){
                return item.getFunctionName();
            })
        } ,
        getMethodName( ){
            if( typeof index === "number" )
            return stack[index].getMethodName();
            else
            return stack.map(function( item){
                return item.getMethodName();
            })
        } ,
        getFileName( ){
            if( typeof index === "number" )
            return stack[index].getFileName();
            else
            return stack.map(function( item){
                return item.getFileName();
            })
        } ,
        getLineNumber( ) {
            if( typeof index === "number" )
            return stack[index].getLineNumber();
            else
            return stack.map(function( item){
                return item.getLineNumber();
            })
        } ,
        getColumnNumber( ){
            if( typeof index === "number" )
            return stack[index].getColumnNumber();
            else
            return stack.map(function( item){
                return item.getColumnNumber();
            })

        } ,
        getEvalOrigin( ){ 
            if( typeof index === "number" )
            return stack[index].getEvalOrigin();
            else
            return stack.map(function( item){
                return item.getEvalOrigin();
            })
        } ,
        isToplevel( ){
            if( typeof index === "number" )
            return stack[index].isToplevel();
            else
            return stack.map(function( item){
                return item.isToplevel();
            })
        } ,
        isEval( ){
            if( typeof index === "number" )
            return stack[index].isEval();
            else
            return stack.map(function( item){
                return item.isEval();
            })
        } ,
        isNative( ){
            if( typeof index === "number" )
            return stack[index].isNative();
            else
            return stack.map(function( item){
                return item.isNative();
            })
        } ,
        isConstructor(index){
            if( typeof index === "number" )
            return stack[index].isConstructor();
            else
            return stack.map(function( item){
                return item.isConstructor();
            })
        }
    } 
};