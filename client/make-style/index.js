function makeStyle( jsonData ){
    return Object.keys(jsonData).reduce((prev, curr) => {
        return `${prev += curr.split(/(?=[A-Z])/).join('-').toLowerCase()}:${jsonData[curr]};`
    }, '');
}

module.exports = makeStyle;