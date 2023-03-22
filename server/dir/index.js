"use strict";  

const fs = require('fs');
const Path = require('path');
const getStack = require('ezito/utils/public/trace');
const Directory = { ...Path , ...fs };

Array.prototype.at = function(index){
    if( index === -1){
        return this[this.length -1];
    }
    return this[index];
}
const searchPath  = function ( path ){ 
    if( path instanceof Array ) return path.join(path); 
    const stack = getStack().list;
    const index = stack.map( ( paths , index ) => ( paths.getFileName() === __filename ) ? index : -1 ).filter( index => index !== -1 ).at(-1) + 1;
    if( typeof path === "string" ) return Path.resolve(Path.dirname(stack[index].getFileName()), path);
}
const paramsValidator = function ( path = [] , ...options ){  
    let isCallBack = options !== null ? typeof options[0] === 'function' ? options[0] : typeof options[1] === 'function' ? options[1] : null  : null ;
    let isOptions = options !== null ? typeof options[0] === 'object' ? options[0] : options[0] : typeof options[1] === 'object' ? options[1] ? options[1] : {} : {} ;
    return [ isCallBack , isOptions ];
};

const Dir = {
    readSync : function ( systemFilePath = [] , ...options ){  
        let path = searchPath(systemFilePath);
        let [ isCallBack , isOptions ] = paramsValidator( systemFilePath , ...options)
        let error =  `Eziot | Utils Dir.readSync . dir "${ path }" notfound.`;
        if(!fs.existsSync( path )){
            if( isCallBack != null ){
                return isCallBack.call(Path, '' , new Error(error) , );
            }
            else { 
                return new Error(error);
            }
        }

        let mainDir = path;
        let dirFiles = fs.readdirSync(mainDir);
        let info = Object();
        let resultFilter = true ;
        let stats = {};
        return dirFiles.filter( file => {
            stats = fs.statSync(this.path.join(mainDir , file ));
            resultFilter = true ;
            
            info = {
                fullPath : this.path.resolve( process.cwd() , this.path.join(mainDir , file ) ) ,
                fileName : this.path.basename(this.path.resolve( process.cwd() , this.path.join(mainDir , file ) )),
                dirName : mainDir ,
                ext : this.path.extname(this.path.join(mainDir , file )),
                isFile : stats.isFile(), 
                size : stats.size,
            };

            if(isOptions != null ){
                if(isOptions.filter){ 
                    if( typeof isOptions.filter === 'function'){
                        resultFilter = isOptions.filter.call( Directory ,  info );
                    }
                    else if( typeof isOptions.filter === 'object' ){
                        Object.entries(isOptions.filter).map(function([ key , value ]){
                            if( info[key] !== undefined ){
                                if( value instanceof Array ){
                                    if(!(value.includes(info[key]))){
                                        resultFilter = false ;
                                    }
                                }
                                else if(!(info[key] === value )) {
                                    resultFilter = false ;
                                }
                            } 
                        });
                    }
                    resultFilter = Boolean( resultFilter );
                }
            }
            
             
            
            if( typeof isCallBack === 'function' && resultFilter === true){
                isCallBack.call( Directory , info );
            }

            return resultFilter ;
        }); 
    },
    readAllSync : function ( systemFilePath = [] , ...options ){
        let path = searchPath(systemFilePath);
        let [ isCallBack , isOptions ] = paramsValidator( systemFilePath , ...options) ;
        if(!fs.existsSync(path)){ 
            if(isCallBack){ 
                return isCallBack.call(this , '' , new Error('Eziot | Helper Dir.readAllSync dir notfound !'))
            }
            else {
                return new Error('Eziot | Helper Dir.readAllSync dir notfound !');
            }
        }
 
        let stats = fs.statSync(path);
        let dirs = fs.readdirSync(path);
        let resultDir = '';

        dirs = dirs.filter( dir => { 
            resultDir = Path.join( path , dir );
            stats = fs.statSync(resultDir);
            if(stats.isDirectory()){ 
                if(typeof isCallBack == 'function'){
                    isCallBack.call( Directory , { fullPath : resultDir , isDir : true } );
                }
                return Dir.readAllSync([ resultDir ] , isCallBack , isOptions ); 
            }
            else if(stats.isFile()){
                if(typeof isCallBack == 'function'){
                    isCallBack.call( Directory , { 
                        fullPath : resultDir ,
                        fileName : Path.basename(resultDir) ,
                        ext : Path.extname(resultDir),
                        isFile : true 
                    });
                }
            };
            return false;
        });
        return dirs.map( dr =>{
            return Path.join( path , dr);
        }); 
    },
    readFileSync : function ( systemFilePath , ...options ){ 
        let path = searchPath(systemFilePath);
        let [ isCallBack , isOptions ] = paramsValidator( systemFilePath , ...options)
        let error = false;
        let data = null;
        if(!fs.existsSync(path)){
            if(isCallBack){ 
                return isCallBack.call(this , '' , new Error('Eziot | Helper Dir.readAllSync dir notfound !'))
            }
            else {
                return new Error('Eziot | Helper Dir.readAllSync dir notfound !');
            }
        }
        else {
            data = fs.readFileSync(path).toString();
        }
        if( typeof isCallBack == 'function' ){
            return isCallBack.call( Directory , { data   , error } );
        }
        return fs.readFileSync(path).toString();
    },
    isFile : function(systemFilePath){ 
        let path = searchPath(systemFilePath);
        if(fs.existsSync(Path.join (... path.length ? path : [path] ))){
            let s = fs.statSync(Path.join (... path.length ? path : [path] ));
            return s.isFile();
        }
        return false ;
    },
    setCorrectDir : function( dir = String ){
        if(!(typeof dir === 'string' )) throw { TypeError : `param type not accept. giving ${ typeof dir }`};
        return dir = this.path.join(...dir.split(/\\/g)); 
    },
    copyFolder : function (directory , to , callback = () => {} , copyFiles = false ){
        const dir = Dir ;
        const path = Path;
        if(!dir.fs.existsSync(dir.path.resolve(to))){
            dir.fs.mkdirSync(dir.path.resolve(to), { recursive : true });
        }
 
        dir.readAllSync(dir.path.resolve(directory), function({ fullPath , isFile }){

            const sep = (dir.path.posix.win32 !== undefined && dir.path.posix.win32 !== null && process.platform === 'win32') ? dir.path.win32.sep : dir.path.sep ;           
            const cp_path = copyFiles === true ? dir.path.resolve(to) : dir.path.join(dir.path.resolve(to),dir.path.basename(dir.path.resolve(directory))); 
            const cp_full_name = dir.path.join (
                cp_path , 
                dir.path.resolve(fullPath).split(dir.path.resolve(directory)).at(1)
            );
             
          
            dir.path.dirname(cp_full_name).split(cp_path).filter( x => x != '').splice(sep).forEach(function(split_name){  
                if(!dir.fs.existsSync(dir.path.join(cp_path , split_name))){
                    dir.fs.mkdirSync( dir.path.join(cp_path , split_name) , { recursive : true }); 
                } 
            });
            
            if(dir.fs.lstatSync(dir.path.resolve(fullPath)).isFile()) return dir.fs.copyFileSync(
                fullPath ,
                cp_full_name
            )
        }); 
    } ,
    copyFolderFiles : function (directory , to , callback = () => {}){
        const dir = Dir ;
        const path = Path;
        dir.readSync(directory, function({ fullPath , isFile }){
            const copyName =  path.join(to , fullPath.split( directory ).at(1));
            if(isFile){
                if(isFile){
                    fs.copyFileSync(fullPath , copyName);
                    callback(copyName);
                }
            } 
        })
    } ,
    getParentDir : function (...args){
        return Path.dirname(Path.resolve(...args ));
    },
    join : (...args) => Path.join(...args) ,
    path : Path,
    fs : fs,
}; 
module.exports = Dir ;
