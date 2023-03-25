'use strict';

function getVersion(ver){
    ver = String(ver).toString().trim();
    const parse = ver.split('.');
    const version = Number(parse.at(0));
    return {
        version
    }
}
module.exports = getVersion;