'use strict';
const path = require('path');
const exists = require('./exists');
const isFile = require('./is-file')
const getExtention = function (nodePath){ 
    if(exists(nodePath) && isFile(nodePath)){
        return path.extname(nodePath) 
    }
    return '';
};
module.exports = getExtention;