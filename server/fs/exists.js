'use strict';
const fs  = require('fs');
/**
 * 
 * @param {string} file_path // directory or file path
 * @returns 
 */
const exists = function(file_path){ 
    try {
        const ltsFs = fs.lstatSync(file_path); 
        return fs.existsSync(file_path) && (ltsFs.isDirectory() || ltsFs.isFile());
    } catch (error) {
        return false;   
    }
};
module.exports = exists;