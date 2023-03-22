
const attrConverter = require('ezito/utils/public/dom/attributes-converter');


/**
 * 
 * @param {*htmlParser} param 
 * @returns {Object={ firstChild }}
 */
module.exports = /** @object */function htmlParsedConfigedToDocument({ children , nodeType , nodeInstractionsType , nodeTextType}){
    const orginalChildren = Object.assign([],children);
    const classCheck = function ({ type , attributes } , selector) {
        return type === nodeType && attributes['class'] && attributes['class'] === selector.slice(1)
    };
    const idCheck = function ({ type , attributes } , selector) {
        return type === nodeType && attributes['id'] && attributes['id'] === selector.slice(1)
    };
    const tagNameCheck =  function ({ name, type } , selector) {
        return  type === nodeType && name === selector
    };
    const attrConvertToReact = function ( attributes ){
        const newAttribuest = {};
        for (const key in attributes) {
            if (Object.hasOwnProperty.call(attributes, key)) {
                newAttribuest[attrConverter.convertToReact(key)] = attributes[key];
            }
        }
        return newAttribuest;
    };
    function isReactElement(object) {
        return typeof object === 'object' && object !== null && object.$$typeof === Symbol.for('react.element') ;    
    };

    (function defineQuerySelector(children){
        function definer(object){
            Object.defineProperty(object, 'query' , {
                writable : false ,
                /**
                 * @param {string} selector . tagName || id || classname 
                 */
                value : function(selector){
                    selector = selector.trim();
                    var isId = selector[0] === '#';
                    var isClass = selector[0] === '.';
                    if( isId ){
                        return this.children.filter(function(object){
                            return idCheck(object , selector)
                        });
                    }
                    if( isClass ){ 
                        return this.children.filter(function(object){
                            return classCheck(object , selector)
                        });
                    }
                    return this.children.filter(function(object){
                        return tagNameCheck(object , selector)
                    });
                }
            });
        }

        for (const iterator of children) {
            definer(iterator);
            if(iterator.children && iterator.children instanceof Array){
                defineQuerySelector(iterator.children)
            }
        }

    }(children));
    
    (function defineQuerySelectorAll (children){
        function creator( cb , selector){
            var list = [];
            for (const iterator of this.children) {
                if(iterator.children && iterator.children instanceof Array){
                    if( cb(iterator , selector )){
                        list.push(iterator)
                    }
    
                    if(iterator.children && iterator.children instanceof Array){
                        list.push(...iterator.queryAll(selector))
                    }
                }
            }
            return list
        };
    
        function definer(object){
            Object.defineProperty(object, 'queryAll' , {
                writable : false ,
                /**
                 * @param {string} selector . tagName || id || classname 
                 */
                value : function(selector){
                    selector = selector.trim();
                    var isId = selector[0] === '#';
                    var isClass = selector[0] === '.';
                    var list = []
                    if( isId ){
                        return creator.call( this , idCheck , selector)
                    };
    
                    if( isClass ){ 
                        return creator.call( this , classCheck , selector)
                    } 
    
                    return creator.call( this , tagNameCheck , selector)
                }
            });
        }
     
        for (const iterator of children) {
            definer(iterator);
            if(iterator.children && iterator.children instanceof Array){
                defineQuerySelectorAll(iterator.children)
            }
        }
    }(children));
    
    (function defineFirstChild(children){
        for (const iterator of children) {
            if(iterator.type === nodeType ){ 
                Object.defineProperty(iterator, 'firstChild' , { 
                    enumerable: true,
                    configurable: true ,
                    get : function(){
                        return this.children[0]
                    }
                });
                if(iterator.children && iterator.children instanceof Array){
                    defineFirstChild(iterator.children)
                }
            }
        }
    }(children));


    (function defineLastChild(children){
        for (const iterator of children) {
            if(iterator.type === nodeType){ 
                Object.defineProperty(iterator, 'lastChild' , { 
                    enumerable: true,
                    configurable: true ,
                    get : function(){
                        return this.children[this.children.length - 1]
                    }
                });
                if(iterator.children && iterator.children instanceof Array){
                    defineLastChild(iterator.children)
                }
            }
        }
    }(children));

    (function appendChild(children){
        for (const iterator of children) {
            if(iterator.type === nodeType ){ 
                Object.defineProperty(iterator, 'appendChild' , { 
                    enumerable: true,
                    configurable: true ,

                    value : function(node){ 
                        if(!(node.type === nodeType ) && !(node.type === nodeTextType ) && !isReactElement(node)) throw 'child not acceptable';
                        
                        node.index = this.children.length + 1 ;  
                        this.children.push(node); 
                        return node;
                    }
                });

                if(iterator.children && iterator.children instanceof Array){
                    appendChild(iterator.children)
                }
            }
        }
    }(children));

    const document = {
        children  : Object.assign([] , children),
        firstChild : children[0],
        lastChild : children[children.length - 1],
        head : (function(object){
            for (const iterator of object) {
                if(iterator.type === nodeType && iterator.name === 'head') return iterator;
                var headList = iterator.queryAll('head');
                if( headList.length > 0 ) return headList[0];
            }
            return undefined
        }(children)),

        body : (function(object){
            for (const iterator of object) {
                if(iterator.type === nodeType && iterator.name === 'body') return iterator;
                var headList = iterator.queryAll('body');
                if( headList.length > 0 ) return headList[0];
            }
            return undefined
        }(children)) ,

        createNode (name , attributes ={}, ...children){
            var newChildren = [];
            for (const node of children) {
                if(typeof node === "string" ){
                    newChildren.push(
                        this.createTextNode( children )
                    )
                }
                else {
                    if(!(node.type === nodeType )) throw 'child not acceptable';
                    newChildren.push(node)
                }
            } 
            return {
                type : nodeType ,
                name , 
                attributes ,
                children : newChildren ,
                openTag : { start : 0 , end : 0 },
                closeTag : { start : 0 , end : 0 },
                index : 0
            }
        },
        createTextNode ( value ){
            return {
                type : nodeTextType ,
                value ,
                openTag : { start : 0 },
                closeTag : { end : 28 } ,
                index : 0 ,
            }
        } ,
        prepareToReactElement( react ){
            function prepare( children ){
                var reactElementsList = [];
                for (const node of children) {

                    var isNode = node.type === nodeType ;  
                    var isInstractionsNode = node.type === nodeInstractionsType ;
                    var isTextNode = node.type === nodeTextType ;
                    
                    if( isInstractionsNode ){ 
                       reactElementsList.push(
                            react.createElement(
                                react.Fragment , 
                                null ,
                                `<${node.name}>` 
                            )
                        );
                    }
                    else if(isNode){ 
                        reactElementsList.push(
                            react.createElement(
                                node.name ,
                                attrConvertToReact(node.attributes),
                                node.children.length > 0 ? react.Children.toArray( prepare(node.children)) : null  
                            )
                        );
                    }
                    else if(isTextNode) {
                        reactElementsList.push(
                            (new String(node.value)).toString()
                        );
                    }
                    else {
                        reactElementsList.push( node )
                    } 
                } 
                return reactElementsList;
            }
            return react.createElement(
                react.Fragment ,
                { children : react.Children.toArray(prepare(this.children))}
            )
        } ,
        reset(){ 
            this.children = Object.create(orginalChildren);
        }
    }
    return document
}