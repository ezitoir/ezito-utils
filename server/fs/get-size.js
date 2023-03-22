const exists = require('./exists');
const isFile = require('./is-file');
const fs = require('fs');
module.exports = function getSize (file){
    if( exists(file) && isFile(file)){
        return fs.lstatSync(file).size;
    }
    return 0;
}