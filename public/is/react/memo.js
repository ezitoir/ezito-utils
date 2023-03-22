var REACT_ELEMENT_TYPE = Symbol.for('react.memo');
module.exports = function isMemo(object) {
    return typeof object === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
}