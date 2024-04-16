'use strict';

const getBrowers = require('ezito-utils/client/get-browers');


var haveCaptureStackTrace = 'captureStackTrace' in Error;
function FireFoxStackParser(error , hasName){
    function CallSite({ functionName , lineNumber , fileName , charStart }){
        this.getFunctionName = function(){
            return functionName;
        }
        this.getLine = function(){
            return lineNumber;
        }
        this.getFileName = function(){
            return fileName
        }
        this.charStart = function(){
            return charStart
        }
    };
    var stack = error.stack.split('\n');
    var functionName = '';
    var fristFunctionNameSlice = '';
    var fileName   = '';
    var lineNumber = 0;
    var charStart  = 0;
    for (let index = 0; index < stack.length; index++) {
        fristFunctionNameSlice = stack[index].split('@')[0].replace(/\\/,'/').split('/');
        if(fristFunctionNameSlice.at(-1) === '<'){
            functionName = fristFunctionNameSlice[ fristFunctionNameSlice.length - 2];
        }
        else {
            functionName = fristFunctionNameSlice[ fristFunctionNameSlice.length - 1]; 
            if(!functionName && stack.indexOf('@') > -1){
                functionName = '<anymous>'
            }            
        }
        if(stack[index]){
            lineNumber = stack[index].split('@').at(1).replace(/\\/,'/').split('/').at(-1).split(':')[1];
            charStart  = stack[index].split('@').at(1).replace(/\\/,'/').split('/').at(-1).split(':')[2];
            fileName   = stack[index].split('@').at(1).replace(/\\/,'/').split('/') ;
            fileName.shift();
            fileName.shift();
        }
        stack[index] = new CallSite({ functionName , lineNumber , fileName , charStart });
    }
    error.stack = stack;
};

function V8StackParser (error){
    function CallSite({ functionName , lineNumber , fileName , charStart }){
        this.getFunctionName = function(){
            return functionName;
        }
        this.getLine = function(){
            return lineNumber;
        }
        this.getFileName = function(){
            return fileName
        }
        this.charStart = function(){
            return charStart
        }
    };
    stack = error.stack;
    var message = error.message; 
    var stackList = stack.split('\n');  
    var newStack = [];
    var fileName = '';
    var functionName = '';
    var charStart = 0;
    var lineNumber = '';
    for (let index = 0; index < stackList.length; index++) {
        stackList[index] = stackList[index].trim();
        if(stackList[index].slice(0,'Error'.length) === 'Error' && index === 0){ 
            if(message && message === stackList[index].slice('Error :'.length)){
                /// message
            }
        }
        else { 
            functionName = stackList[index].match(/at(.*?)\(/).at(1).trim();
            charStart = Number(
                stackList[index].match(/\((.*?)\)/).at(1).slice(
                    stackList[index].match(/\((.*?)\)/).at(1).trim().lastIndexOf(':') + 1,
                )
            );
            lineNumber = stackList[index].match(/\((.*?)\)/).at(1).slice(
                0 ,
                stackList[index].match(/\((.*?)\)/).at(1).trim().lastIndexOf(':')
            );
            lineNumber = Number(lineNumber.slice(lineNumber.lastIndexOf(':') + 1));

            fileName = stackList[index].match(/\((.*?)\)/).at(1).trim();
            fileName = fileName.slice(0 , fileName.lastIndexOf(lineNumber + ':' + charStart) -1);
            

            newStack.push(new CallSite({ functionName , line , fileName , charStart }));
        }

    } 
    error.stack = newStack;
}

function errorConfig(){ 
    if(!haveCaptureStackTrace && !('captureStackTrace' in Error)){
        Object.defineProperty(Error,"captureStackTrace",{
            value : function (error , constructor ){
                var constructorBody = typeof constructor === "function" ? Function.prototype.toString.call(constructor) : false;
                var hasName = 'function name () {'.match(/function\s+(.*?)\(/).length > 1 ? 'function name () {'.match(/function\s+(.*?)\(/).at(1).trim() : false;
                var isFireFox = getBrowers().fireFox;
                if( error instanceof Error){
                    if(isFireFox) return FireFoxStackParser(error , hasName);
                    return V8StackParser(error, hasName);
                }
            }
        });
    }
}

function stackTrace (index){
    errorConfig();
    var orig = Error.prepareStackTrace;
    Error.prepareStackTrace = function(_, stack){ return stack; };
    var error = new Error;
    var stack = {}; 
    Error.captureStackTrace(error , stackTrace);
    stack = error.stack;
    Error.prepareStackTrace = orig;

    return {
        list : stack ,
        stack ,
        error ,
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
        getFunction(){
            if( typeof index === "number" )
            return stack[index].getFunction();
            else
            return stack.map(function( item){
                return item.getFunction();
            });
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
}



stackTrace.createErrorOption = function createErrorOption(stackNumber = 1 , message = '' , code = 1){
    var trace = stackTrace(stackNumber + 1);
    return {
        message,
        code,
        fileName : trace.getFileName(),
        lineNumber : trace.getLineNumber(), 
        functionName : trace.getFunctionName(),
        methodName : trace.getMethodName(),
        columnNumber : trace.getColumnNumber(),
    }
}

module.exports = stackTrace