'use strict';
module.exports = function FilesToSrc(files = [] , fn = ()=>{} ){
    return (files.length > 0 ? [].slice.call(files) : []).map(function(file){
        var reader = new FileReader();
        var promise = new Promise(function(resolve){
            reader.addEventListener('load' , function(){
                fn(this.result);
                resolve(this.result);
            });
            
        });
        if( typeof file === 'object')
        reader.readAsDataURL(file);
        return promise;
    });
}