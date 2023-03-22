module.exports = function breakReciveFile( fileStream ){
    fileStream.emit('error' , new Error('FileName Not Set'))
    fileStream.on('data' ,()=>{}); 
};
