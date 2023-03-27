'use strict';
var isFile = require('./is-file');
var path = require('path')
module.exports = function returnDir(file_path){
    return isFile( file_path ) ? path.dirname(file_path) : file_path ;
};
