'use strict';


module.exports = function isGlobalPath ( filePath ){
    filePath = filePath.trim();
    return filePath[0] && (filePath[0] !== "." && (filePath[0] !== '/' && filePath[0] !== '\\') && filePath[1] && ( filePath[1] !== '/' && filePath[1] !== '\\'));
}