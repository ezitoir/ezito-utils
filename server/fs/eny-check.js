

module.exports = function enyCheck(...args){
    for (const iterator of args) {
        if(iterator instanceof Error || !iterator) return false;
    }
    return true;
}