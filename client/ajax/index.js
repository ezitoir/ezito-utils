"use strcit";


const Request = (function (is) {
    if(!is) return false ;
    function merge( context = null | Object , object ){

        // check param types
        if(!(context instanceof Object && context) || !(object instanceof Object) ) throw { TypeError : "param error. context and object must have object type" };
        // copy of context
        var new_object = Object.assign({}, context);
        
        Object.entries(object).map(function([ key , value ]){
            if(new_object.hasOwnProperty( key )){
                if( value instanceof Object && value.constructor === Object ){
                    new_object[key] = merge( new_object[key] , value );
                }
                else {
                    new_object[key] = value;
                }
            }
            else { 
                new_object[key] = value;
            }
        });
        return new_object;
    };

   






    // ERequest   ezito request
    function ERequest( config ) {
        let xhr = typeof XMLHttpRequest !== 'undefined' ? new XMLHttpRequest() : null ;
        Object.defineProperties( xhr , {
            events : {
                value : {
                    start : 0 ,
                    end : 0 ,
                    change : 0 , 
                },
                writable : true ,
            }
        });



        // get config 
        let { url , method , body : data , encode , events , headers , sync , } = merge( ERequest.Config , config );
 

        xhr.addEventListener('readystatechange', function (event) {
            
            // call to start function
            if (event.target.readyState == 1) { 
                events.start.call( xhr , '' );
            }
 
            // status code
            switch (xhr.status) {
                // set error
                case 500 | 404 :  
                    events.error.call( xhr , xhr.status );  
                break ;
                case 200 :
                    if( xhr.readyState === xhr.DONE  ){ 
                        // response headers set
                        let headers = xhr.getAllResponseHeaders()
                        headers = headers && headers.split('\r\n').filter(Boolean).map(header => header.split(': ', 2)); 
                        Object.defineProperties( xhr , {
                            headers : {
                                value : headers ,
                                writable  : false ,
                                configurable : false ,
                            }
                        }); 
                        // if response is json check call with json method
                        if( xhr.getResponseHeader('Content-type').indexOf('application/json') > -1 ){
                            events.json.call( xhr , JSON.parse(xhr.responseText) ,);
                        }
                        events.end.call( xhr , xhr.responseText ,);
                    } 
                break; 
                // call change
                default: 
                    events.change.call( xhr );
                break;
            }
        }, false);
       

 

        xhr.open( method ,  url + ( method === ERequest.Methods.Get  ? '?' + encode.InitialData(data) : '') , !sync );
         
        // set header content type
        // id data is form data not settting content type
        if(  encode.InitialData(data).constructor !== FormData ){
            xhr.setRequestHeader( "Content-Type" , encode.ContentType );
        }
        // set custom header
        Object.entries(headers).map(function([ header , value ]){
            xhr.setRequestHeader(header.split(/(?=[A-Z])/).join('-') , value );
        });

        return {
            send : function(){
                // send config 
                xhr.send( method === ERequest.Methods.Post ?  encode.InitialData(data) : null );
                return xhr ;
            }
        }
    };












    


    // define static 
    // encode type
    Object.defineProperties( ERequest , {
        Encode : {
            value : {
                FormData : {
                    ContentType : 'multipart/form-data' ,
                    InitialData : function ( data ){
                        // check if data is form element return FormData
                        if( data instanceof HTMLFormElement ){
                            return new FormData( data );
                        }
                        else {
                            if( data instanceof NodeList ||  data instanceof Node ){
                                // if data is node list convert to array ;
                                let list = data instanceof NodeList ? [].slice.call( data ): data instanceof Node ?  [].slice.call(data.querySelectorAll('input'))  : data  ;
                                let fd = new FormData(); 
                                list.forEach(function(element){
                                    if( element instanceof HTMLInputElement && element.type !== 'submit'){
                                        let name = element.name; 
                                        let type = element.type; 
                                        if( type === 'file' ){ 
                                            ;[].forEach.call(element.files , function (file) { 
                                               fd.append( name , file ); 
                                            });
                                        }
                                        else {
                                            fd.append( name , element.value );
                                        }
                                    }
                                });

                                return fd ;
                            }
                            else if ( data instanceof Object && typeof data === 'object' ){
                                let fd = new FormData();
                                Object.entries(data).map( function([ name , value ]){
                                    if( value instanceof HTMLInputElement && value.getAttribute('type') !== 'submit'){
                                        if( value.getAttribute('type') === 'file' ){
                                            ;[].forEach.call(value.files , function (file) { 
                                                fd.append( name , file ); 
                                            });
                                        }
                                        else {
                                            fd.append( name , value.value )
                                        }
                                    }
                                    else {
                                        fd.append( name , value );
                                    }
                                });
                                return fd;
                            }
                        }
                    }
                },

                URLEncode : { /* just working in getmethod request  */
                    ContentType : 'application/x-www-form-urlencoded' ,
                    InitialData : function(data){
                        // method must have get type
                        let values = Object();
 
                        if( data instanceof NodeList || data instanceof Array || data instanceof Node ){
                            HTMLCollection.prototype.map = Array.prototype.map ; 

                            data.elements.map(function(element){
                                if( element instanceof HTMLInputElement && element.type !== 'submit' ){
                                    values[element.name] = element.value ;
                                }
                            });
                        }
                        else if ( data instanceof Object && data.constructor === Object ){
                            Object.entries(data).map(function([ name  , value ]){
                                if( value instanceof HTMLInputElement ){
                                    data[ name ] = value.value ;
                                }
                            });
                        }
         
                        return Object.entries( values ).map(function([ name , value ]){
                            return encodeURIComponent(name) + '=' + encodeURIComponent(values[name]);
                        }).join('&').replace(/%20/ , '+');
                    }
                },
                Text : {
                    ContentType  : 'text/plain' ,
                },
                Json :  {
                    ContentType  : 'application/json; charset=UTF-8' ,
                    InitialData : function( data ){
                        if( data instanceof Object && typeof data === 'object' && data.constructor === Object ){
                            Object.entries(data).map(function([ name  , value ]){
                                if( value instanceof HTMLInputElement ){
                                    data[ name ] = value.value ;
                                }
                            });
                            return JSON.stringify(data);
                        }
                        else if ( data instanceof Element ){
                            HTMLCollection.prototype.map = Array.prototype.map ;
                            var object = Object();

                            data.elements.map(function(element){
                                if( element instanceof HTMLInputElement && element.type !== 'submit' ){
                                    object[element.name] = element.value ;
                                }
                            });  
                            return JSON.stringify(object) ;
                        }
                    }
                }
            } ,
            writable : true ,
            configurable : false ,
        },
    });

    // methods
    Object.defineProperties( ERequest , {
        Methods : {
            value : {
                Post : 'post' ,
                Get : 'get'
            },
            writable : true ,
            configurable : true ,
        }, 
    });





    // config
    Object.defineProperties( ERequest , {
        Config : {
            value : {
                url : "/" ,
                method : ERequest.Methods.Get ,
                encode : ERequest.Encode.Json , 
                data : {}, body : {},
                sync : false ,
                events : {
                    start : function(){}, 
                    end   : function(){},
                    error : function(){},
                    change : function(){},
                    json : function(){},
                } , 
                headers : { }
            },
            writable : true ,
            configurable : true ,
        }, 
    });
 





    // send 
    Object.defineProperty( ERequest , "send" , {
        value : function ( config ){
            let HttpRequest = ERequest( config );
            return HttpRequest.send();
        },
        writable : false,
        configurable : false,
    });

    // post method
    Object.defineProperty( ERequest , "post" , {
        value : function ( config ){
            config.method = ERequest.Methods.Post;
            let HttpRequest = ERequest( config ); 
            return HttpRequest.send();
        },
        writable : false,
        configurable : false,
    });

    // get method
    Object.defineProperty( ERequest , "get" , {
        value : function ( config ){
            config.method = ERequest.Methods.Get;
            let HttpRequest = ERequest( config );
            return HttpRequest.send();
        },
        writable : false,
        configurable : false,
    });


    // json method
    Object.defineProperty( ERequest , "json" , {
        value : function ( config ){
            config['method'] = ERequest.Methods.Post;
            config['encode'] = ERequest.Encode.Json;
            let HttpRequest = ERequest( config );
            return HttpRequest.send();
        },
        writable : false,
        configurable : false,
    });


    // form data sending
    Object.defineProperty( ERequest , "form" , {
        value : function ( form = null | HTMLFormElement , config = ERequest.Config ){ 
            if(!( form instanceof HTMLFormElement )) throw { TypeError : "form param must have`s type of HTMLFormElement giving other." };

            config = merge( ERequest.Config , config );

            form.addEventListener('submit' , function( event ){
                event.preventDefault(); 
                
                // setup for enctype
                let encrypte = Object.entries(ERequest.Encode).map(function([ type = String , value = Object ]){
                    let enctype = String(event.target .getAttribute('enctype')).toLocaleLowerCase();
                    if (enctype !=='null' && enctype !== 'undefined' ){
                        if(type.toLocaleLowerCase() === enctype || value.ContentType.toLocaleLowerCase() === enctype ){
                            return value ;
                        } 
                    }
                }).reduce(function(frist , last ){ if( frist === undefined) return last ; return frist ;});
                

                config['data'] = event.target ;
                config['url'] = event.target.getAttribute('action') || config.url ;
                config['method'] = event.target.getAttribute('method') || config.method ;
                config['encode'] = encrypte || ERequest.Encode.FormData ;
                
                let HttpRequest = new ERequest( config );
                return HttpRequest.send();
            });
        },
        writable : false,
        configurable : false,
    });

    return ERequest ;
})( typeof window !== 'undefined' );
 
module.exports = Request;