



/**
 * 
 * 
 * 
 * 
 * 
 */





const CreateElement = function ( tagName = String() , attributes = Object() , ...children ){

    let tag = String();
    let element = Object();
    /** check if  <element ... */
    let findtags = /<\s*(.*[^A-z])/g;
    let findtags2 = /<\s*(.*[^\W])>(.*?)<\/\s*(.*[^\W])>/g;
    let findtags3 = /<\s*[^>]*([^A-z])/g;
    let findtags4 = /<[^>]+.[^A-Z](.)>/g;
    let findtags5 = /<[^>]+[^<]>/g;
    let isTag = /<[^>]+[^<]\/>/g;

    if( (tag = tagName.match(/<[^>]+[^<]\/>/g)) != null ){
        tag = tag[0].replace('/','').replace('>','').replace('<','');
    }
    else {
        tag = tagName.trim();
    }
  
    if( typeof document == 'undefined'){
        return false;
    }


    element = document.createElement( tag );
    Object.keys(attributes).map(function(key){
        element.setAttribute(key , attributes[key]);
    });

    children.map(function(child){
        if((!child instanceof Node) || typeof child != 'string') return ;
        if( typeof child == 'string'){
            child = document.createTextNode( child )
        }
        element.appendChild(child);
    });
    return element;
};

module.exports = CreateElement;
