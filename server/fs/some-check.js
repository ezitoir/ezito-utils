

module.exports = function enyCheck(...args){
    for (const iterator of args) {
        if(!(iterator instanceof Error) || typeof iterator == "string" ) return iterator;
    }
    return false;
}