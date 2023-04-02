'use  strict';

function isSymbol(param){
    return typeof param === "symbol";
}
module.exports = isSymbol;