'use strict';

function getVersion(ver){
    const parse = ver.split('.');
    const version = Number(parse.at(0));
    return {
        version
    }
}
module.exports = getVersion;