'use strict';
const path = require('path');
const exists = require('ezito-utils/server/fs/exists');
const isFile = require('ezito-utils/server/fs/is-file')
const getExtention = function (nodePath){ 
    if(exists(nodePath) && isFile(nodePath)){
        return path.extname(nodePath) 
    }
    return '';
};
module.exports = getExtention;