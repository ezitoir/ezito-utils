'use strict';
var isFile = require('ezito-utils/server/fs/is-file');
var path = require('path')
module.exports = function returnDir(file_path){
    return isFile( file_path ) ? path.dirname(file_path) : file_path ;
};
