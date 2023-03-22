
const fs = require('fs');
const path = require('path');
const resolve = require('./resolve');
const isDir = require('./is-directory');
const isFile = require('./is-file');
const getTrace = require('./private'); 
const exists = require('./exists');
const readDirectory = require('./read-directory');
const dirCreator = require('./dir-creator');
const toPosixPath = require('./to-posix-path');

const copy = function ( file , to , option = { level : 1 /* 1 | 2 */ }, cb ){ 
    const dir_path = resolve(path.resolve(path.dirname(getTrace()[1].getFileName()), file));
    if( dir_path instanceof Error ) throw dir_path ;
    const allFiles = readDirectory(dir_path ,{},);

    let target_path = path.resolve(path.dirname(getTrace()[1].getFileName()), to); 
    const parent_dir = isFile( dir_path ) ? path.basename(path.dirname(dir_path)) : path.basename( dir_path);
    
    /**
     * create directory for copy files
     */
    dirCreator(target_path);

    if(isFile(dir_path)) {
        return fs.copyFileSync( dir_path , path.join(target_path , path.basename(dir_path)));
    }
    else {
        if( option.level == 1 ){
            target_path = path.join( target_path , path.basename(dir_path));
        }; 
        for (const readedFile  of allFiles) {
            const must_joined = toPosixPath(readedFile).split(toPosixPath(dir_path)) . at(1); 
            if( isFile(readedFile) ){
                dirCreator (path.dirname( path.join (target_path , must_joined )));
                fs.copyFileSync( readedFile ,  path.join (target_path , must_joined ) )
            }
            else {
                dirCreator( path.join (target_path , must_joined ));
            }
        }
        
    }

};
module.exports = copy;