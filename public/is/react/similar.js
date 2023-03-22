
const isSimilar = require('ezito/utils/public/is/object/similar');
module.exports = function isMemo(object , similar) {
    return isSimilar(object,similar)
}