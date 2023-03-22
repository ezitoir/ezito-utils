' use strict'; 
const busboy = require('connect-busboy'); 
const fs = require('fs');
const path = require('node:path');
const openWriteStream = require('./utils/openWriteStream');
const drainWriteStream = require('./utils/drainWriteStream');
const breakReciveFile = require('./utils/breakeReciveFile'); 
const convertSize = require('./utils/convertSize');
const closeWriteStream = require('./utils/closeWriteStream');


/**
 * 
 * @param {object} options  
 * @param {array} options.fields
 * @param {string} option.fields.name
 * @param {string} option.fields.type
 * @param {string} option.fields.fileName
 * @param {string} options.dest
 * @param {function} options.beforeSavin 
 * @returns null;
 */
function all( options = {}){
    
    return function ( req , res , next ){
        let { fileSize = convertSize('200kb')  } = options ;
        const root = process.cwd();

        busboy({ limits : { fileSize }})( req , res , function(err){
            if(fileSize < parseInt(req.headers['content-length'])) return next();
            if(err) next();
            if(!req.busboy) return next();

            let { fields = [ '*' ] , dest = './upload' } = options ;
            let directory = path.join( root , dest );
            
            req.body = {};
            req.files = {};
             
             
            req.busboy.on('file', ( fieldName, fileStream , { filename , encoding , mimeType } ) => {
                fileStream.on('limit', function(){  
                    //delete the file that is large in size
                    fs.unlink(directory ,()=>{
                        
                    });
                });
                fileStream.on('error',function(r){
                    Object.keys(req.files).map(fileFieldName=>{
                        delete req.files[fileFieldName];
                    });
                    delete req.files;
                    console.log('rerrro')
                });
                fileStream.on('close' , function(){
                    
                })

                /**
                 * check if field file name is set for recive . else breake recive file;
                 */
                if(fields.some((config)=>{
                    if((config.type !== "file" || config.name !== fieldName) && config !== "*" ) return false ; return true ;
                })){
                    
                    if( filename.lenght === 0 ) return breakReciveFile(fileStream);
                    
                    let Self = fields.filter( item => item.name === fieldName ).at(0);
                    
                    if( Self.mimeType ){
                        if(typeof Self.mimeType === "function" ){
                            if(Self.mimeType(mimeType) === false ){
                                return breakReciveFile(fileStream);
                            }
                        }
                        if(typeof Self.mimeType === "string" && Self.mimeType.trim() !== '' && Self.mimeType !== mimeType ){
                            return breakReciveFile(fileStream)
                        }
                    }
                    
                    if( Self.ext ){
                        if(Self.ext instanceof Array  && !Self.ext.includes(path.extname(filename))) {
                            return breakReciveFile(fileStream)
                        }
                    }

                    let fileName = filename
                    if( Self.fileName ){
                        if(typeof Self.fileName === "function" ){ 
                            fileName = Self.fileName({ fileName , name : fileName , ext : path.extname(filename) , encoding , mimeType })
                        }
                        else if( typeof Self.fileName === "string"  && Self.fileName.trim() !== '' ){ 
                            fileName = Self.fileName;
                        }
                    }
                    
                    if( Self.dest ){
                        directory = path.join( root , Self.dest );
                    }
                    directory = path.join( directory, fileName);

                    const writeStream = fs.createWriteStream(directory);
                    openWriteStream(writeStream , fileStream , req , fieldName , filename , mimeType , encoding , function(){

                    });
                    drainWriteStream(writeStream , req , function(){

                    });
                    closeWriteStream(writeStream , req , function(){
                        
                    }); 
                }
                else {
                    breakReciveFile(fileStream);
                }
            });  

            req.busboy.on('field', (name, value, info ) => {
                req.body[name] = value;
            });
            req.busboy.on('close', () => {
                // the end
                
            });
            req.busboy.on('finish', () => {
                next();
            });
            req.pipe(req.busboy); 
        })
    }
}


module.exports = {  all }