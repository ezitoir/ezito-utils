module.exports = function drainWriteStream(writeStream , req , fn = ()=>{}){
    writeStream.on('drain', () => {
        const written = parseInt(writeStream.bytesWritten);
        const total = parseInt(req.headers['content-length']); 
        const pWritten = ((written / total) * 100).toFixed(2); 
        //console.log(`Processing  ...  ${pWritten}% done`);
        fn(pWritten);
    });
}