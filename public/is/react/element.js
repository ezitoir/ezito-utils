var REACT_ELEMENT_TYPE = Symbol.for('react.element');
module.exports = function isElement(object) {
    return typeof object === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
}