

module.exports = function isString(value){
    return typeof value === "string" && Boolean(value.trim) === true && Boolean(value.toLowerCase) === true ;
}