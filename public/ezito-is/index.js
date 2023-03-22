'use strict';
var hasSymbol = typeof Symbol === 'function' && Symbol.for;
const EZITO_COMPOENT_DOCUMENT = hasSymbol ? Symbol.for('Ezito.Component.Document') : '';
const EZITO_COMPOENT_DOCUMENT_HEAD = hasSymbol ? Symbol.for('Ezito.Component.Document.Head') : '';
const EZITO_COMPOENT_DOCUMENT_ROUTER = hasSymbol ? Symbol.for('Ezito.Component.Document.Router') : '';
const EZITO_COMPOENT_REACT_DOM_RENDER = hasSymbol ? Symbol.for('Ezito.Component.React.Dom.Render') : '';
const EZITO_COMPOENT_REACT_DOM_ROUTER = hasSymbol ? Symbol.for('Ezito.Component.React.Dom.Router') : '';



function typeOf(object) {
    if (typeof object === 'object' && object !== null) {
        var $$typeof = object.$$typeof;
        return $$typeof;
    } 
    return undefined;
} // AsyncMode is deprecated along with isAsyncMode


function isEzitoReactDomRender(object){
    return typeOf(object) === EZITO_COMPOENT_REACT_DOM_RENDER;
}
function isEzitoDocument(object){
    return typeOf(object) === EZITO_COMPOENT_DOCUMENT;
}
function isEzitoDocumentHead(object){
    return typeOf(object) === EZITO_COMPOENT_DOCUMENT_HEAD;
}
function isEzitoDocumentRouter(object){
    return typeOf(object) === EZITO_COMPOENT_DOCUMENT_ROUTER;
}
function enyTypeof(object){
    var $$typeof = typeOf(object);
    if(
        $$typeof === EZITO_COMPOENT_DOCUMENT ||
        $$typeof === EZITO_COMPOENT_DOCUMENT_HEAD ||
        $$typeof === EZITO_COMPOENT_DOCUMENT_ROUTER ||
        $$typeof === EZITO_COMPOENT_REACT_DOM_RENDER ||
        $$typeof === EZITO_COMPOENT_REACT_DOM_ROUTER
        )
        return true;
        return false
};


function getErrorOfType( object ){ 
    var error = new Error;
    if(enyTypeof(object)){
        error.name = 'Ezito types';
        error.message = 'ezito types input error';
        return error;
    }
    return undefined
}

module.exports = {
    types : {
        EZITO_COMPOENT_DOCUMENT ,
        EZITO_COMPOENT_DOCUMENT_HEAD ,
        EZITO_COMPOENT_DOCUMENT_ROUTER ,
        EZITO_COMPOENT_REACT_DOM_RENDER ,
        EZITO_COMPOENT_REACT_DOM_ROUTER
    },
    isEzitoDocument ,
    isEzitoDocumentHead,
    isEzitoDocumentRouter,
    isEzitoReactDomRender,
    enyTypeof ,
    getErrorOfType
}