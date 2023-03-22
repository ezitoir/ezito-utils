

const is_function = require('ezito/utils/public/is/function'); 
const is_class = require('ezito/utils/public/is/class'); 
function reactMarkupReadableStream( readable ){ 
    if(!is_function(readable)) return false;
    if(!(readable.constructor.name !== 'ReactMarkupReadableStream')) return false;
    return true ;
}
module.exports = reactMarkupReadableStream;