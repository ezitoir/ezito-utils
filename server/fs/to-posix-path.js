'use strict';

const toPosixPath = function (modulePatch = new String()){
    return modulePatch.replace(/\\/g,'/') 
}
module.exports = toPosixPath;
