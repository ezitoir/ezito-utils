
const On = require('ezito/utils/client/on');
const Query = require('ezito/utils/client/query')
const Ripple = (function(){
    /**
     * @param {element} Node
     */
    return function( element ){
        if(!(element instanceof Element)) return false ;

        
         
        let timeout = null;
        On( element , {
            mousedown : function ({ target : current , clientX , clientY }){  
                    let color = current.css("color");

                    let circle = Query("<span/>" , { class : "ripple" });
                    let diameter = Math.max( current.clientWidth , current.clientHeight );
                    let radius = diameter / 2;
                    circle.classList.add("ripple"); 
                   
                    circle.css({
                        width :  circle.style.height = `${diameter}px`,
                        left : `${clientX - current.offset().left - radius}px`,
                        top :`${clientY - current.offset().top - radius}px`,
                        background : color ,
                        transition : 'all .3s',
                        opacity : '.3' ,
                    }); 
                    circle = current.add(circle); 
                    timeout = setTimeout(() => {
                        circle.css({ animation : 'unset' , transform : 'scale(4)' , opacity : '.2'});
                        timeout = null;
                    }, 250);
                    
            },
            mouseup : function({ currentTarget : current }){
                clearTimeout(timeout);
                Query( current , '.ripple').each(function(){
                    let context = this;
                    if( timeout == null) {
                        setTimeout(()=>context.remove(), 1 );
                    }
                    else {
                        setTimeout(()=>context.remove(), 400 );
                    }
                });
            }
        });
    }
})();

module.exports = Ripple;
