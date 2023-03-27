const path = require('path');
const fs = require('fs');
const has = require('../../../public/object/has');
const makeError = require('../../../public/make-error');
const toPosixPath =require('../to-posix-path');
const getRootDir = require('../get-root');
const getHomeDir = require('../home-dir');
const existsSync  = require('../exists');
const isFile = require('../is-file');
const isDirectory = require('../is-directory');
const getTrace = require('../private/get-trace');
const enyCheck = require('../eny-check');
const isGlobalPath = require('../is-global-path');
var returnDir = require('../return-dir');
var commonJsExt = require('../common-js-ext'); 
 
/**
 * 
 * @param { string } nodePath 
 * @param {object = { baseDir = string , paths : {[]} , pathResolver}} option 
 * @returns 
 */
const resolve = function ezitoFsResolver(file_path , option = { baseDir : null , paths : undefined , retrunDir : false } , error = true){
  
    file_path = toPosixPath(file_path);
    var traceCallerNumber = getTrace()[1].getFileName() ===  __filename ? 2 : 1;
    const caller_path = toPosixPath(path.dirname(getTrace()[traceCallerNumber].getFileName()));
    
    const root = toPosixPath(getRootDir());
    const home_dir = toPosixPath(getHomeDir());
    const paths = option.paths || {};
    const return_dir = (option && option.retrunDir) || false;
    var newError = {};
    // example resolve('src/utils/eny.js');
    // example resolve('path');
    // example resolve('index.js');
    // example resolve('react');
    if(isGlobalPath(file_path) && !has(option , 'baseDir' , "string") && !has(option ,'paths' ,'object')){
        var pathRootResolve = path.resolve(root , file_path);
        var pathHomeDirResolve = path.resolve(home_dir , file_path);
        
        if(isFile(pathRootResolve)){
            return return_dir ? returnDir(pathRootResolve) : pathRootResolve;
        }
        if(isFile(pathHomeDirResolve)){
            return return_dir ? returnDir(pathHomeDirResolve) : pathHomeDirResolve;
        }
        if(isDirectory(pathRootResolve)){
            return pathRootResolve;
        }
        if(isDirectory(pathHomeDirResolve)){
            return pathHomeDirResolve;
        }
        newError = makeError(
            '[RESOLVE-SYSTEM-FILE-NOT-FOUND-ERROR]' , 
            `Directory or File notfound at directory <[\r
                ${pathRootResolve} \r
                ${pathHomeDirResolve}
            \r]>`, 
            traceCallerNumber
        );        
    }

    // example resolve('index' , { baseDir : 'src' });
    else if(isGlobalPath(file_path) && has(option , 'baseDir' , "string") && !has(option ,'paths' ,'object')){
        if(!isGlobalPath(option.baseDir)) return makeError.throw(makeError(
            '[RESOLVE-OPTION-ERROR]',
            'resolve option.baseDir must be global directory and not file must be directory example = resolve("index.js",{baseDir : "src/api"})' ,
            traceCallerNumber
        ));
        var baseDir = resolve(option.baseDir);
        if(baseDir instanceof Error){
            if(error) throw newError;
            return newError;
        }
        var newFilePath = path.resolve(baseDir , file_path);
        
        if(isFile(newFilePath)){
            return newFilePath;
        }
        if(isDirectory(newFilePath)){
            return newFilePath;
        }
        
        newError = makeError(
            '[RESOLVE-SYSTEM-FILE-NOT-FOUND-ERROR]' ,
            `Directory or File notfound at directory <[\r
                ${newFilePath} \r 
            \r]>`,
            traceCallerNumber
        );
    }

    // example resolve('./index.js')
    else if(!isGlobalPath(file_path) && !has(option , 'baseDir' , "string") && !has(option ,'paths' ,'object')){
        var newFilePath = path.resolve(caller_path, file_path);
        if(isFile(newFilePath)){
            return newFilePath;
        }
        if(isDirectory(newFilePath)){
            return newFilePath
        }
        newError = makeError(
            '[RESOLVE-SYSTEM-FILE-NOT-FOUND-ERROR]' ,
            `Directory or File notfound at directory <[\r
                ${newFilePath} \r 
            \r]>`,
            traceCallerNumber
        );
    }

    // example resolve('./index.js' , { baseDir : 'src' })
    else if(!isGlobalPath(file_path) && has(option , 'baseDir' , "string") && !has(option ,'paths' ,'object')){
        if(!isGlobalPath(option.baseDir)) {
            newError = (makeError(
                '[RESOLVE-OPTION-ERROR]',
                'resolve option.baseDir must be global directory and not file must be directory example = resolve("index.js",{baseDir : "src/api"})' ,
                traceCallerNumber
            ));
            if(error) throw newError;
            return newError;
        } 
        var baseDir = resolve(option.baseDir);
        if(baseDir instanceof Error){
            if(error) throw newError;
            return newError;
        }

        var newFilePath = path.resolve(baseDir, file_path);
        if(isFile(newFilePath)){
            return newFilePath;
        }
        if(isDirectory(newFilePath)){
            return newFilePath
        }
        newError = makeError(
            '[RESOLVE-SYSTEM-FILE-NOT-FOUND-ERROR]' ,
            `Directory or File notfound at directory <[\r
                ${newFilePath} \r 
            \r]>`,
            traceCallerNumber
        );
    } 


    if(newError instanceof Error){
        if(error) throw newError;
        return newError;
    }


    if(has(option,'baseDir','string') || has(option, paths,'object')){
        const get_paths = Object.entries(paths);

        for (const [ key , value ] of get_paths) {
            var newValue = value instanceof Array ? value : [ value ];
            var newKey = key.slice(0 ,key.indexOf('/'))
            for (const fp of newValue ) { 
                const orgPath = resolve(fp,{},error); 
                if(key === file_path.slice(0 , key.length )){
                    const new_file_path = file_path.slice( key.length ); 
                    const newModule = resolve(new_file_path , { baseDir : orgPath });
                    return newModule;
                }
                else if(file_path === newKey) { 
                    if(!(orgPath instanceof Error)) return orgPath;
                }
            }
        } 
    }


    newError =  makeError(
        '[RESOLVE-SYSTEM-FILE-NOT-FOUND-ERROR]' ,
        `Directory or File notfound at directory <[\r
            ${file_path} \r 
        \r]>`,
        traceCallerNumber 
    );
    if(error) throw newError;
    return newError;
};
resolve.resolveModule = function (file_path , option , error = true){
    var newFilePath = resolve(file_path, option , false);
    console.log(file_path)
    if(newFilePath instanceof Error){
        if(error) throw newFilePath;
        return newFilePath;
    }
    var result = isDirectory(newFilePath , function ( is ){
        if(isFile(newFilePath)) return newFilePath;
        if(is) {
            for (const iterator of commonJsExt) {
                if(isFile(path.join(newFilePath , 'index' + iterator ))){
                    return path.join(newFilePath , 'index' + iterator )
                }
            }
        }
        return makeError(
            '[MODULE-NOT-FOUND]' ,
            `Module notfound at directory <${ newFilePath }>`, 
            1
        )
    });
    if( result instanceof Error && error == true ){
        throw result;
    }
    return result;
}
module.exports = resolve;
