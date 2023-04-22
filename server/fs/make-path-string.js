'use strict';
var isFile = require('./is-file');
var getExt = require('./get-extention');

module.exports = function makePathStrig(file_path){
    var newFilePath = new String(file_path);
    Object.defineProperty(newFilePath,'isFile' , {
        value : isFile(file_path),
        writable : false
    });
    Object.defineProperty(newFilePath,'ext' , {
        value : isFile(file_path) ? getExt(file_path) : '',
        writable : false 
    });
    return newFilePath;
}