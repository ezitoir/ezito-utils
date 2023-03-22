

module.exports = function isString(value){
    return typeof value === "string" && value.trim && value.toLowerCase ;
}