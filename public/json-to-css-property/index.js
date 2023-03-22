



function JsonToCssProperty (json_data) {
    if(typeof json_data != 'object') return false ;
    return Object.keys(json_data).reduce((prev, curr) => {
        return `${prev += curr.split(/(?=[A-Z])/).join('-').toLowerCase()}:${json_data[curr]};`
    }, '');
}

module.exports =  JsonToCssProperty ;