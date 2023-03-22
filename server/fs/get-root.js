const homedir = require('./home-dir');
const getRootDir = function(){
    const cwd =  process.cwd();
    if( cwd === homedir()) return homedir() ;
    return cwd;
};
module.exports = getRootDir;