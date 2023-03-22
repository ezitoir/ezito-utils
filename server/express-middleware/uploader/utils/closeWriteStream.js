


module.exports = function(writeStream , req , fn =()=>{}){
    writeStream.on('close' , ()=>{
        fn();
    });
}