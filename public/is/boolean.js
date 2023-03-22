const isBoolean = (value) => {
    if( typeof value === "boolean" && ( value === true || value === false )  ) return true ;
    return false;
}
module.exports = isBoolean;