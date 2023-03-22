'use strict';
const fs = require('fs');
/**
 * 
 * @param {string} file // file path in directory 
 * @returns {boolean}
 */
const isFile = function (file) {
    try {
        try {
            var stat = fs.statSync(file, { throwIfNoEntry: false });
        } catch (e) {
            if (e && (e.code === 'ENOENT' || e.code === 'ENOTDIR')) return false;
            throw e;
        }
        return !!stat && (stat.isFile() || stat.isFIFO());
    } catch (error) {
        return false;
    }
    
};
module.exports = isFile;