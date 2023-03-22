'use strict';
const { convertToHtml }  = require('ezito/utils/public/dom/attributes-converter');
const jsonToStyleAttribute  = require('ezito/utils/client/dom/json-to-style-attribute');
const makeId = require('ezito/utils/public/crypto/make-id');
const eventsList = require('ezito/utils/client/events-list');
var hasSymbol = typeof Symbol === 'function' && Symbol.for;
var hasSymbol = typeof Symbol === 'function' && Symbol.for;
var REACT_ELEMENT_TYPE = hasSymbol ? Symbol.for('react.element') : 0xeac7;
var REACT_PORTAL_TYPE = hasSymbol ? Symbol.for('react.portal') : 0xeaca;
var REACT_FRAGMENT_TYPE = hasSymbol ? Symbol.for('react.fragment') : 0xeacb;
var REACT_STRICT_MODE_TYPE = hasSymbol ? Symbol.for('react.strict_mode') : 0xeacc;
var REACT_PROFILER_TYPE = hasSymbol ? Symbol.for('react.profiler') : 0xead2;
var REACT_PROVIDER_TYPE = hasSymbol ? Symbol.for('react.provider') : 0xeacd;
var REACT_CONTEXT_TYPE = hasSymbol ? Symbol.for('react.context') : 0xeace; 
var REACT_ASYNC_MODE_TYPE = hasSymbol ? Symbol.for('react.async_mode') : 0xeacf;
var REACT_CONCURRENT_MODE_TYPE = hasSymbol ? Symbol.for('react.concurrent_mode') : 0xeacf;
var REACT_FORWARD_REF_TYPE = hasSymbol ? Symbol.for('react.forward_ref') : 0xead0;
var REACT_SUSPENSE_TYPE = hasSymbol ? Symbol.for('react.suspense') : 0xead1;
var REACT_SUSPENSE_LIST_TYPE = hasSymbol ? Symbol.for('react.suspense_list') : 0xead8;
var REACT_MEMO_TYPE = hasSymbol ? Symbol.for('react.memo') : 0xead3;
var REACT_LAZY_TYPE = hasSymbol ? Symbol.for('react.lazy') : 0xead4;
var REACT_BLOCK_TYPE = hasSymbol ? Symbol.for('react.block') : 0xead9;
var REACT_FUNDAMENTAL_TYPE = hasSymbol ? Symbol.for('react.fundamental') : 0xead5;
var REACT_RESPONDER_TYPE = hasSymbol ? Symbol.for('react.responder') : 0xead6;
var REACT_SCOPE_TYPE = hasSymbol ? Symbol.for('react.scope') : 0xead7;
function isValidElementType(type) {
    return typeof type === 'string' || typeof type === 'function' || // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
    type === REACT_FRAGMENT_TYPE || 
    type === REACT_CONCURRENT_MODE_TYPE || 
    type === REACT_PROFILER_TYPE || 
    type === REACT_STRICT_MODE_TYPE || 
    type === REACT_SUSPENSE_TYPE || 
    type === REACT_SUSPENSE_LIST_TYPE || 
    typeof type === 'object' && 
    type !== null && (
        type.$$typeof === REACT_LAZY_TYPE || 
        type.$$typeof === REACT_MEMO_TYPE || 
        type.$$typeof === REACT_PROVIDER_TYPE || 
        type.$$typeof === REACT_CONTEXT_TYPE || 
        type.$$typeof === REACT_FORWARD_REF_TYPE || 
        type.$$typeof === REACT_FUNDAMENTAL_TYPE || 
        type.$$typeof === REACT_RESPONDER_TYPE || 
        type.$$typeof === REACT_SCOPE_TYPE || 
        type.$$typeof === REACT_BLOCK_TYPE);
}
function isElement(object) {
    return typeof object === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
}
function getReactChildType(object){
    return "string" === typeof object.type ? "Node" : "function" === typeof object.type ? "Component" : ""
}

function reactChildToDom(children , react){ 
    const parent = { children : [ ] };
    const useEffectList = {  
        state : false ,
        callback : [],
        componentList : [], 
        exists(Component){  
            var counter = 0;
            for (const iterator of this.componentList) {
                if(iterator.id === Component.id){
                    return counter + 1;
                }
                counter ++;
            }
            return false;
        }, 
        end(){
            this.callback = false;
            this.state = false;
        }
    };
    reactChildToDom.useEffect = function (callback){
        useEffectList.state = true ;
        useEffectList.callback.push(callback); 
    };

    function getValidProps(props , list=[]){
        const attributes = Object.entries(props);
        var returnList = { propsList : []}; 
        for(const attr of attributes){ 
            if(list.includes(attr[0])){ 
                returnList[attr[0]] = attr[1];
                continue;
            }
            var newAttr = convertToHtml(attr[0]);
            if(newAttr){
                returnList.propsList.push({
                    name : newAttr , 
                    value : attr[1]
                });
            }
        }
        return returnList;
    } 
    function setupAttributes(element , attributeList){
        for(const attribute of attributeList){
            element.setAttribute(attribute.name , attribute.value);
        } 
    }
    function parseRepeatChildren(parentElement , children ,Component){
        if(children) parseChildren(children, parentElement , Component);
    }
    function parseStyleAttribute(parentElement, style){
        if(style) parentElement.setAttribute('style', jsonToStyleAttribute(style));
    }
    function setComponentId(Component,id){
        if (!Object.hasOwnProperty.call(Component, 'id')) {
            Object.defineProperty(Component ,'id' ,{value :id , configurable :false,writable :false}); 
        }
    }
    function addComponentToUseEffect(Component , newNode){
        var index = 0;
        if(useEffectList.state === true || (index = useEffectList.exists(Component)) !== false){
            if(index) {
                useEffectList.componentList[index - 1] = {
                    id : Component.id ,
                    callback : [
                        ...useEffectList.componentList[index -1].callback ,
                        ...useEffectList.callback
                    ],
                    nodeList : [...useEffectList.componentList[index - 1].nodeList , newNode ]
                }
            }
            else {
                useEffectList.componentList.push({
                    id : Component.id ,
                    callback : [ useEffectList.callback ],
                    nodeList : [ newNode ],
                })
            }
        }
        useEffectList.callback = [] ;
        useEffectList.state = false;
    }
    /**
     * 
     * @param {Array} child 
     * @param {Node} parentNode 
     * @returns 
     */
    function parseChildren(child , parentNode , Component){
        var newChild = child instanceof Array ? child : [ child ]; 
        for (const lChild of newChild) {
            if(!isValidElementType(lChild) && !isElement(lChild)){ 
                throw new Error('React-Child-To-Dom - not valid react child.')
            }
            switch (getReactChildType(lChild)) {
                case 'Component':
                    setComponentId(lChild.type , makeId(10));
                    var defaultProps = lChild.defaultProps || {};
                    var newChildren = lChild.type.call(reactChildToDom, {...defaultProps , ...lChild.props});
                    parseChildren(newChildren , parentNode , lChild.type );
                break; 
                case 'Node' : 
                    if(parentNode instanceof Node){
                        var newParentChild = parentNode.appendChild(document.createElement(lChild.type))
                        var newProps = getValidProps(lChild.props , ['children' , 'style']);
                        setupAttributes(newParentChild , newProps.propsList );
                        parseStyleAttribute(newParentChild , newProps.style ); 
                        parseRepeatChildren(newParentChild, lChild.props.children, Component);
                        addComponentToUseEffect(Component , newParentChild);
                        newParentChild = undefined;
                    }
                    else {  
                        parentNode = document.createElement(lChild.type);
                        parent.children.push(parentNode);
                        var newProps = getValidProps(lChild.props , ['children' , 'style']);
                        setupAttributes(parentNode , newProps.propsList);
                        parseStyleAttribute(parentNode , newProps.style); 
                        parseRepeatChildren(parentNode , lChild.props.children,Component); 
                        addComponentToUseEffect(Component, parentNode);
                        parentNode = undefined;
                    } 
                break;
                default :
                    if(isElement(lChild)){
                        parseRepeatChildren(parentNode, lChild.props.children, Component);
                    }
                    else { 
                        parentNode.appendChild(document.createTextNode(lChild))
                    }
                break; 
            }
        } 
        return parent;
    }
    const result = parseChildren(children , react);  
   return result;
}

module.exports = reactChildToDom;