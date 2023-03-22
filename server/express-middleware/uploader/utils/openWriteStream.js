const path = require('path');
const fs = require('fs');

module.exports = function openWriteStream(writeStream ,fileStream , req , fieldName, filename , mimeType , encoding , fn=()=>{}){
 
    writeStream.on('open' , function(){
        fileStream.pipe(writeStream);
        const remove = function(){
            return new Promise(function(resolve ,reject){
                fs.unlink(writeStream.path , (err)=>{
                    if( err)reject(err);
                    return resolve(true)
                })
            });
        }
        if( req.files[fieldName] ){
            if( req.files[fieldName] instanceof Array ){
                req.files[fieldName] = [ ...req.files[fieldName] ];
            }
            else {
                req.files[fieldName] = [ req.files[fieldName] ];
            }
            
            req.files[fieldName].push({
                orginalName : filename ,
                ext : path.extname(filename) ,
                mimeType ,
                encoding ,
                fullPath : writeStream.path ,
                remove 
            })
        }
        else {
            req.files[fieldName] = {
                orginalName : filename ,
                ext : path.extname(filename) ,
                mimeType ,
                encoding ,
                fullPath : writeStream.path ,
                remove
            }
        }
        fn();
    });
}