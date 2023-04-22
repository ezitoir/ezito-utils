'use strict';
var mimDb = require('./db'); 
function withExtension( extension ){
    if( extension[0] === '.') extension = extension.slice(1); 
    var allMimTypeKeys = Object.keys(mimDb);
    for (const mimKey of allMimTypeKeys) {
        if (Object.hasOwnProperty.call(mimDb[mimKey], 'extensions')) { 
            if(mimDb[mimKey].extensions.includes(extension)) return  mimKey;
        }
    }
}
module.exports = withExtension;