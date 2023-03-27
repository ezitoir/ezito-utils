
const fs = require('fs');
const path = require('path');
const resolve = require('ezito-utils/server/fs/resolve');
const isDir = require('ezito-utils/server/fs/is-directory');
const isFile = require('ezito-utils/server/fs/is-file');
const getTrace = require('ezito-utils/public/trace'); 
const getSize = require('ezito-utils/server/fs/get-size');
const getExt = require('ezito-utils/server/fs/get-extention'); 

function getInfo(full_path){
    return {
        ext : isFile(full_path) ? getExt(full_path) : '',
        fullPath : full_path,
        size : isFile(full_path) ? getSize(full_path) : 0 ,
        isFile : isFile(full_path) ,
        fileName : isFile(full_path) ? path.basename(full_path) : '',
        fnWithOutExt : isFile(full_path) ? path.basename(full_path).slice( 0 ,  isFile(full_path).length ): '',
    }
}

function checkExt( ext_list = [] , ext ){
    if( ext_list instanceof Array && ext_list.length > 0){
        if(!(ext_list.includes(ext) || ext_list.includes('.' + ext))){
            return false ;
        }
    }
    return true ;
}

const readDirectory = function (dir , option = { deep : Infinity , justFile : false , justDir : false , ext : null } , cb ){
    option = { deep : Infinity , justFile : false , justDir : false , ext : null , ...option };
    const dir_path = resolve(path.resolve(path.dirname(getTrace(1).getFileName()) , dir) , { retrunDir : true }); 
    const scan_dir = fs.readdirSync(dir_path);
    const list = new Array();

  
    for (const iterator of scan_dir) {
        const full_path = path.join(dir_path , iterator);
        const fi = getInfo(full_path);
  
        if(isFile(full_path)){
            if(!option.isDir){
                if(checkExt( option.ext ,  fi.ext )) 
                if( typeof cb === 'function' ){
                    cb(full_path , fi);
                } 
                else {
                    list.push(full_path);
                } 
            }
        }
        else if(isDir(full_path)){
            if(!option.justFile){
                if(typeof cb === "function"){
                    cb( full_path , fi );
                }
                list.push(full_path);
            }
            if(option.deep === Infinity && isDir(full_path)){ 
                list.push(...readDirectory(full_path, option , cb));
            } 
        }
    }
    
    return list
};
module.exports = readDirectory;