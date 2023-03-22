

module.exports = function getContentType( ext ){
    switch(ext){
        case ".css":
            return { "Content-type" : "text/css" };
        case ".js" :
            return { "Content-type" : "application/javascript" };
    }
};