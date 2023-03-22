'use strict';
const fs = require('fs');
/**
 * 
 * @param {string} dir // directory path 
 * @returns 
 */
const isDirectory = function (dir) {
    try {
        var stat = fs.statSync(dir, { throwIfNoEntry: false });
    } catch (e) {
        if (e && (e.code === 'ENOENT' || e.code === 'ENOTDIR')) return false;
        throw e;
    }
    return !!stat && stat.isDirectory();
};

module.exports = isDirectory;