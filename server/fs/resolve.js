const path = require('path');
const fs = require('fs');
const toPosixPath =require('./to-posix-path');
const getRootDir = require('./get-root');
const getHomeDir = require('./home-dir');
const existsSync  = require('./exists');
const isFile = require('./is-file');
const getTrace = require('./private');
const enyCheck = require('./eny-check');



 
/**
 * 
 * @param { string } nodePath 
 * @param {object = { baseDir , paths : {[]} , pathResolver}} option 
 * @returns 
 */
const resolve = function ( file_path , option = { baseDir : undefined , paths : {} , retrunDir : false , targetFile : undefined }){
    const isNodePathExistsToModuleDir = function (file){  
        try {
            return require.resolve(file);
        } catch (e) {} 
        return false;
    };
    function returnDir( file_path ){
        return isFile( file_path ) ? path.dirname(file_path) : file_path 
    }; 
    const isGlobalPath = function (file_path){
        try {
            return file_path.trim()[0] !== '.' && file_path.trim()[0] !== '/' && file_path.trim()[1] !== '/'
        } catch (error) {
            return false;
        }
    }
    function createError(fp){
        const error = new Error('');
        error.message = `File-System not found ( "${fp}" ) || `;
        error.code = 404 ;
        error.name = 'FILE-SYSTEM RESOLVE ERROR ';
        return error;
    }

    file_path = toPosixPath(file_path);
    const caller_path = toPosixPath(path.dirname(getTrace()[1].getFileName()));
    const root = toPosixPath(getRootDir());
    const home_dir = toPosixPath(getHomeDir());
    const base_dir = toPosixPath(path.resolve(caller_path , option.baseDir || process.cwd()));
    const paths = option.paths || {};
    const return_dir = option.retrunDir || false ;
    var localFileName = '';

    if(Object.keys(paths).length === 0){
        if(option.relative === true && isGlobalPath(file_path)) return createError(file_path);  
        // example : resolve('react') . 
        if(isGlobalPath(file_path) && option.baseDir === undefined  && (localFileName=isNodePathExistsToModuleDir(file_path))){
            if(existsSync(localFileName))return return_dir ? returnDir(localFileName) : localFileName;
        } 
        // example : resolve('src/public/index.js') . 
        if(isGlobalPath(file_path) && option.baseDir === undefined  && (localFileName=isNodePathExistsToModuleDir(path.join(root,file_path)))){
            if(existsSync(localFileName))return return_dir ? returnDir(localFileName) : localFileName;
        } 
        // example : resolve('index.js' , { baseDir : './src' })
        if(isGlobalPath(file_path) && option.baseDir !== undefined && (localFileName=isNodePathExistsToModuleDir(path.join(base_dir,file_path)))){
            if(existsSync(localFileName))return return_dir ? returnDir(localFileName) : localFileName;
        }
        
        // example : resolve('./app.js');
        if(!isGlobalPath(file_path) && option.baseDir === undefined && (localFileName=isNodePathExistsToModuleDir(path.join(caller_path,file_path)))){
            if(existsSync(localFileName))return return_dir ? returnDir(localFileName) : localFileName;
        }
        
        // example : resolve('./app.js' , { baseDir : './src' || 'src' });
        if(!isGlobalPath(file_path) && option.baseDir !== undefined && (localFileName=isNodePathExistsToModuleDir(path.join(base_dir,file_path)))){
            if(existsSync(localFileName)) return return_dir ? returnDir(localFileName) : localFileName;
        }

        // example : resolve('components' , { baseDir : 'D://project/src' })
        if(isGlobalPath(file_path)){ 
            var lst = {};
            if(existsSync(file_path)){ 
                return return_dir ? returnDir(path.resolve(file_path)) : path.resolve(file_path);
            } 
            else { 
                if( option.baseDir !== undefined ){
                    if(existsSync(path.join(base_dir , file_path))) {
                        lst = fs.lstatSync(path.join(base_dir , file_path));
                        return return_dir ? returnDir(path.join(base_dir , file_path)) : path.join(base_dir , file_path);    
                    }
                }
                else {
                    if(existsSync(path.join(root , file_path))){  
                        lst = fs.lstatSync(path.join(root , file_path)); 
                        return return_dir ? returnDir( path.join(root , file_path)) : path.join(root , file_path);
                    }
                } 
            }
        }
        if( isNodePathExistsToModuleDir(path.resolve(home_dir , file_path))){
            return return_dir === true ? returnDir(path.resolve( home_dir , file_path)) : path.resolve( home_dir , file_path); 

        }
    }
    else {
        const get_paths = Object.entries(paths);
        for (const [ key , value ] of get_paths) { 
            var newValue = value instanceof Array ? value : [ value ];
            for (const fp of newValue ) { 
                const orgPath = resolve(fp , { retrunDir : true });
                if(enyCheck(orgPath)){  
                    if(key === file_path.slice(0 , key.length )){
                        const new_file_path = file_path.slice( key.length ); 
                        const newModule = resolve(new_file_path , { baseDir : orgPath });
                        if(enyCheck(newModule)){
                            return newModule;
                        }
                    }
                }
            }
        }
    }

    
    return createError(file_path)
};
module.exports = resolve;