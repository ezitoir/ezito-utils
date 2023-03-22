 
(function(is){
    if(!is) return;
 
    const arrayToNodeList = function (list = [] ) {
        var obj_return = {};
        list.map( (x, xi) => obj_return[xi] = { value: x } );
        obj_return.item = { value: function (i) { return this[+i || 0] } };
        obj_return.frist = { value: list[0] }; 
        obj_return.last = { value: list[list.length - 1 ] };
        obj_return.length = { value: list.length };
        obj_return.each = {
            value : function ( fn ){
                list.forEach(fn);
            }
        }
        return Object.create(document.createDocumentFragment().childNodes ,  obj_return );
    };
    if (!Object.hasOwnProperty.call(NodeList, 'forEach')) NodeList.prototype.forEach = Array.prototype.forEach;
    if(!Object.hasOwnProperty.call(Node,'attr'))
    Object.defineProperty( Node.prototype , 'attr', {
        value: function ( arg = null, val = null ) {
            if (!this.setAttribute) return null; /* check if is element */
            
            // get all data 
            if( arg == null ){
                let obj_return = {};
                ;[].slice.call(this.attributes).forEach(function (item) {
                    obj_return[item.name] = item.value;
                });
                return obj_return ;
            }
            else if (arg instanceof Object) {
                /*
                let id_div = $('#div').first; 
                id_div.attr({
                    rel : false ,
                    name : true ,
                    hey : ( hey ) => { 
                        return hey === 'hello';
                    },
                    "data-ezito" : "true",
                });
                */
                try {
                    Object.keys(arg).forEach((x)=>{ 
                        /* check if is set attribute if even if this att is empty */ 
                        if( arg[x] === true ) {
                            if( this.getAttribute(x) === null ||  this.getAttribute(x) === undefined){ 
                                throw '';
                            }
                        }
                        else if( arg[x] === false ){
                            if(!(this.getAttribute(x) === null ||  this.getAttribute(x) === undefined)){
                                throw '';
                            } 
                        }
                        else if( typeof arg[x] === 'function'){ 
                            let is = arg[x].call( this , this.getAttribute(x) , this );

                            if( is === false || is === null ){
                                throw '';
                            }
                            else if(typeof is === 'string' ) {
                                this.setAttribute( x , is );
                            } 
                        }
                        else if( typeof arg[x] === 'string' ){
                            this.setAttribute( x , arg[x] );
                        }
                        else {
                            if( arg[x] === null || arg[x] === false ){
                                this.removeAttribute(arg[x]);
                            }else{
                                this.setAttribute( x, arg[x]);
                            } 
                        } 
                    });
                    return true ;
                } catch (error) {
                    return false ;
                }
            }
            // get attribute with string if one attr returned value once but attr & attr & ... recived 
            // rerturned object of name and value of attr 
            // id_div.attr('id & name & data-ezito')
            else if( typeof arg === 'string'){
                
                let multi = arg.trim().split('&') , object = {} , temp = null;
                multi = multi.filter( item => { 
                    if((temp=this.getAttribute(item.trim())) != undefined && this.getAttribute(item.trim())!== null ){
                        object[item] = temp ;
                        return true ;
                    }
                    return false ;
                });
                if( multi.length > 1 ) return object ;
                return this.getAttribute(multi[0]);
            }
        } 
    });

    if(!Object.hasOwnProperty.call(NodeList,'attr'))
    Object.defineProperty( NodeList.prototype, 'attr', {
        value : function( arg = null , val = null  ){ 
            return this.array.map( el =>  el.attr.call( el , arg , val ) );
        },
    });

    // defined into like append child with append child nodes list
    if(!Object.hasOwnProperty.call(Node,'into'))
    Object.defineProperty(Node.prototype , 'into' , {
        value : function(parent){
            if( parent instanceof Element ){
                return parent.appendChild( this );
            }
            else
                throw "parent not element !";
        } ,
        configurable : false , enumerable : false , writable : false ,
    });

    if(!Object.hasOwnProperty.call(NodeList,'into'))
    // select element andinto parent if parent is NodeList copy el and into
    Object.defineProperty( NodeList.prototype , 'into' , { 
        value : function( parent ){ 
            return arrayToNodeList(this.array.map( el => {
                if( parent instanceof NodeList ){
                    return parent.array.map(pel=>{
                        return el.copy.into(pel);
                    })
                }
                return el.into(parent);
            }));
        } ,
        configurable : false , enumerable : false , writable : false ,
    });
 
    if(!Object.hasOwnProperty(Node.prototype , 'html'))
    Object.defineProperty( Node.prototype , 'html' , {
        get(){ return this.innerHTML } 
    })

    if(!Object.hasOwnProperty.call(NodeList,'html')) 
    Object.defineProperty( NodeList.prototype , 'html' , {
        get(){ return this.array.map(el=>el.innerHTML)} 
    });
 

    // defined into like append child with append child nodes list
    if(!Object.hasOwnProperty.call(Node,'add'))
    Object.defineProperty( Node.prototype , 'add' , {
        value : function( child ){
            let context = this ; 
            if( this.appendChild ){
                if( child instanceof NodeList ){
                    return arrayToNodeList( child.array.map(el=>{
                        return context.appendChild(el);
                    }));
                }
                return this.appendChild( child );
            }
            return null ;
        }, 
        configurable : false , enumerable : false ,  
    });

    if(!Object.hasOwnProperty.call(Node,'addBefore'))
    Object.defineProperty( Node.prototype , 'addBefore' , {
        value : function( child ) {
            let context = this ,  parent = this.parent ;

            if( this.appendChild  ){ 
                if( !parent ) return null; 
                if( child instanceof NodeList ){
                    return arrayToNodeList (child.array.map( el=>{ 
                        return parent.insertBefore( el , context )
                    }));
                }
                
                return parent.insertBefore( child , this);
            }
            return null ;
        }
    });
    if(!Object.hasOwnProperty.call(Node ,'addAfter'))
    Object.defineProperty( Node.prototype , 'addAfter' , {
        value : function( child ){
            let context = this ,  parent = this.parent ; 
            if( this.appendChild) { 
                if( !parent ) return null; 
                if( child instanceof NodeList ){
                    return arrayToNodeList(child.array.map( el=>{ 
                        return parent.insertBefore( el , context.nextNode )
                    }));
                }
                return parent.insertAfter( this , child);
            }
            return null ;
        }
    });
    
    // defined into like append child with append child nodes list
    if(!Object.hasOwnProperty.call(NodeList ,'add'))
    Object.defineProperty( NodeList.prototype , 'add' , {
        value : function( child ){ 
            return this.array.map( parent =>{
                if( parent.appendChild ){
                    return parent.add( child );
                }
            });
        }, 
        configurable : false , enumerable : false ,  
    });
    if(!Object.hasOwnProperty.call(NodeList,'addBefore'))
    Object.defineProperty( NodeList.prototype , 'addBefore' , {
        value : function( child ) {
            return this.array.map( parent =>{ 
                if( parent.appendChild ){
                    return parent.addBefore( child );
                }
            });
        }
    });
    if(!Object.hasOwnProperty.call(NodeList , 'addAfter'))
    Object.defineProperty( NodeList.prototype , 'addAfter' , {
        value : function( child ){
            return this.array.map( parent =>{ 
                if( parent.appendChild ){
                    return parent.addBefore( child );
                }
            });
        }
    });



    if(!Object.hasOwnProperty.call(Node,'css'))
    Object.defineProperty(Node.prototype, 'css', {
        value: function ( css = {} , value = null ) {
            var context = this;
            if (this.style) {
                var cs = window.getComputedStyle(this);
                if (css instanceof Object && (value == null || value == undefined)) {
                    Object.keys(css).forEach(function (b) { 
                        context.style.setProperty(b, css[b]);
                    });
                } else {
                    if (typeof css === "string" && (value == null || value == undefined)) {
                        return cs.getPropertyValue(css);
                    } else {
                        this.style.setProperty(css, value);
                    }
                }
            }
        }
    });
    if(!Object.hasOwnProperty.call(NodeList ,'css')) 
    Object.defineProperty( NodeList.prototype, 'css', {
        value : function( css = {} , v = null  ){ 
            return this.array.map( el =>  el.css.call( el , css ,v ) );
        },
    });





    if(!Object.hasOwnProperty.call(Node,'on'))
    Object.defineProperty( Node.prototype , 'on' , {
        value : function ( type , callback , option ){
            let context = this ;

            if( typeof type == 'string' ){
                if( context.addEventListener ){
                    return context.addEventListener( type , callback , option );
                }
                return 0;   
            }
            else if (typeof type == 'object' ){
                return Object.keys( type).map( function(key){ 
                    if( context.addEventListener ){
                        return context.addEventListener( key , type[key] , option );
                    }
                    return 0; 
                });
            }
        },
    });
    if(!Object.hasOwnProperty.call(NodeList,'on'))
    Object.defineProperty( NodeList.prototype , 'on' , {
        value : function ( ...argumant ){
            return this.elements.array.map( el=>el.on( ...argumant));
        },
    }); 
    // copy node
    if(!Object.hasOwnProperty.call(Node ,'parent'))
    Object.defineProperty( Node.prototype , 'parent' , {
        get(){
            if( this instanceof Element )
            return this.parentElement
        }
    });  
    if(!Object.hasOwnProperty.call(Node,'classes'))
    Object.defineProperty( Node.prototype, 'classes', {
        value : function(object){
            if(!( typeof object == 'object')) return 0;

            let ctx = this ;
            let classArray = this.classList.value.split(' ') ;
            let is =[];
            Object.keys( object ).map( function( key , value ){
                
                if( typeof object[key] === 'function'){
                    let result = object[key].call( ctx , classArray.includes(key)  ? true : false );
                    if( result === false || result === null ){
                        ctx.classList.remove( key );
                    }
                    else if( typeof result === 'string'){
                        ctx.classList.add( key );
                    }
                }
                else if( typeof object[key] === 'string') {
                    // add class name
                    ctx.classList.add( key )
                }
                else if( object[key] === false || object[key] === null ) {
                    // delete class name
                    ctx.classList.remove( key);
                }
                else if(object[key] === true ){
                    // array.push is set for check
                    if(  classArray.includes(key) ){
                        is.push( true )
                    }
                    else {
                        is.push( false)
                    }
                }
            });

            return is.filter(function(item){
                return item == false;
            })[0] === false ? false : true ;
        },
        writable : false,
        configurable : false ,
    });
    // like element classList 
    if(!Object.hasOwnProperty.call(NodeList ,'classes'))
    Object.defineProperty( NodeList.prototype, 'classes', {
        get (){
            const context = this.elements ;
            return {
                list : context.elements.array.map( el => el.classList ) ,
                add : function ( class_name ){
                    context.array.map( el=>{
                        el.classList.add( class_name )
                    });
                },
                remove : function ( class_name ){
                    context.array.map( el => { 
                        el.classList.remove( class_name )
                    });
                },
                replace : function ( class_name , new_class_name ){
                    context.array.map( el => {  
                        el.classList.replace( class_name , new_class_name)
                    });
                },
            }
        }
    }); 
    // copy node
    if(!Object.hasOwnProperty.call(Node ,'copy'))
    Object.defineProperty( Node.prototype , 'copy' , {
        get(){
            return this.cloneNode(true)
        }
    }); 
    // copy node
    if(!Object.hasOwnProperty.call(NodeList ,'copy'))
    Object.defineProperty(NodeList.prototype , 'copy' , {
        get(){
            return arrayToNodeList( this.array.map(el=>el.cloneNode(true)));
        }
    }); 
    // convert childnodes to array
    if(!Object.hasOwnProperty.call(Node ,'array'))
    Object.defineProperty( NodeList.prototype , 'array' , { 
        get(){  return [].slice.call(this)   }, 
        configurable : false , enumerable : false , 
    }); 
    // return filter all element child
    if(!Object.hasOwnProperty.call(NodeList,'elements'))
    Object.defineProperty( NodeList.prototype , 'elements' , {
        get(){ 
            return arrayToNodeList( this.array.filter((el) => el instanceof Element ) )
        } ,
        set(){ throw 'NodeList array not writable'} ,
        configurable : false , enumerable : false , 
    });

    // return first element child of childnodes list
    if(!Object.hasOwnProperty.call(Node ,'first'))
    Object.defineProperty( Node.prototype , 'first' , { 
        get (){  return this.firstElementChild;  } , 
        configurable : false , enumerable : false ,
    }); 
    // return first element child of childnodes list
    if(!Object.hasOwnProperty.call(Node , 'firstNode'))
    Object.defineProperty( Node.prototype , 'firstNode' , { 
        get (){  return this.firstChild;  } , 
        configurable : false , enumerable : false ,
    });
    // return first element child of childnodes list
    if(!Object.hasOwnProperty.call(Node ,'last'))
    Object.defineProperty( Node.prototype , 'last' , { 
        get (){  return this.lastElementChild;  } , 
        configurable : false , enumerable : false ,
    }); 
    // return first element child of childnodes list
    if(!Object.hasOwnProperty.call(Node ,'lastNode'))
    Object.defineProperty( Node.prototype , 'lastNode' , { 
        get (){  return this.lastChild;  } , 
        configurable : false , enumerable : false ,
    });

 
  
    // return first element child of childnodes list
    if(!Object.hasOwnProperty.call(NodeList ,'first'))
    Object.defineProperty( NodeList.prototype , 'first' , { 
        get (){  return this.elements.array[0];  } , 
        configurable : false , enumerable : false ,
    });
    // return first node of childnodes list
    if(!Object.hasOwnProperty.call(NodeList ,'firstNode'))
    Object.defineProperty( NodeList.prototype , 'firstNode' , { 
        get (){ return this.item(0); } , 
        configurable : false , enumerable : false ,
    });

    // return last element of childnodes list
    if(!Object.hasOwnProperty.call(NodeList,'last'))
    Object.defineProperty( NodeList.prototype , 'last' , { 
        get (){ return this.elements.item( this.elements.length - 1 ); } , 
        configurable : false , enumerable : false ,
    });

    // return last node of childnodes list
    if(Object.hasOwnProperty.call(NodeList ,'lastNode'))
    Object.defineProperty( NodeList.prototype , 'lastNode' , { 
        get (){ return this.item( this.length - 1 ); } , 
        configurable : false , enumerable : false ,
    });
    
    // return last node of childnodes list
    if(!Object.hasOwnProperty.call(NodeList ,'each'))
    Object.defineProperty( NodeList.prototype , 'each' , { 
        value : function( callback ){
            if( typeof callback == "function")
            this.array.map( (...arg) =>{
                callback.call(arg[0], ...arg) ;
            })
        }, 
        configurable : false , enumerable : false ,
    });

    // return next elemnt 
    if(!Object.hasOwnProperty.call(Node ,'next'))
    Object.defineProperty( Node.prototype , 'next' , { 
        get(){ 
            return this.nextElementSibling ;
        },
        configurable : false , enumerable : false ,
    });
    if(!Object.hasOwnProperty.call(NodeList ,'next'))
    Object.defineProperty( NodeList.prototype , 'next' , { 
        get(){ 
            return arrayToNodeList(this.array.map( el=>el.next ));
        },
        configurable : false , enumerable : false ,
    });
    
    // return next elemnt 
    if(!Object.hasOwnProperty.call(Node,'back'))
    Object.defineProperty( Node.prototype , 'back' , { 
        get(){  
            return this.previousElementSibling ;
        },
        configurable : false , enumerable : false ,
    });
    if(!Object.hasOwnProperty.call(NodeList , 'back'))
    Object.defineProperty( NodeList.prototype , 'back' , { 
        get(){ 
            return arrayToNodeList( this.array.map( el=>el.before ));
        },
        configurable : false , enumerable : false ,
    });

    // return next elemnt 
    if(!Object.hasOwnProperty.call(Node ,'nextNode'))
    Object.defineProperty( Node.prototype , 'nextNode' , { 
            get(){ 
                return this.nextSibling ;
            },
            configurable : false , enumerable : false ,
    });
    if(Object.hasOwnProperty.call(NodeList , 'nextNode'))
    Object.defineProperty( NodeList.prototype , 'nextNode' , { 
            get(){ 
                return arrayToNodeList(this.array.map( el=>el.nextNode ));
            },
            configurable : false , enumerable : false ,
    });
    
    // return next elemnt 
    if(!Object.hasOwnProperty.call(Node , 'backNode'))
    Object.defineProperty( Node.prototype , 'backNode' , { 
        get(){ 
            return this.previousSibling ;
        },
        configurable : false , enumerable : false ,
    });
    if(!Object.hasOwnProperty.call(NodeList , 'backNode'))
    Object.defineProperty( NodeList.prototype , 'backNode' , { 
        get(){ 
            return arrayToNodeList( this.array.map( el=>el.beforeNode ));
        },
        configurable : false , enumerable : false ,
    });


    if(!Object.hasOwnProperty.call(Node , 'offset')) 
    Object.defineProperty(Node.prototype, 'offset', {
        value: function () { 
            if (!this.style) return null; 
            let gbcr = this.getBoundingClientRect() ? this.getBoundingClientRect() : undefined; 
            return {
                top: (gbcr.top || this.offsetTop),
                left: (gbcr.left || this.offsetLeft),
                width: (gbcr.width || this.offsetWidth || this.clientWidth),
                height: (gbcr.height || this.offsetHeight || this.clientHeight),
                offsetOfParent: {
                    top: (gbcr.left || this.offsetLeft) - (this.parentElement.getBoundingClientRect().left || this.parentElement.offsetLeft),
                    left: (gbcr.top || this.offsetTop) - (this.parentElement.getBoundingClientRect().top || this.parentElement.offsetTop)
                },
                w : (gbcr.width || this.offsetWidth || this.clientWidth),
                h : ( gbcr.height || this.offsetHeight || this.clientHeight)
            };
        }
    });
})( typeof window == 'undefined' ? false : true ); 
 