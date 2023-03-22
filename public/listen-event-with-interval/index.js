


/*
example 
    async componentDidMount(){
        let parent = this.ref.current.offsetParent;
        let compute = window.getComputedStyle(this.ref.current); 

        this.listen = ListenEventWithInterval(function({ clear , next }){
            if( !this.props.rtl ){
               
                if(compute.direction == 'ltr' ){
                    this.ref.current.classList.remove('rtl');
                }
                else {
                    this.ref.current.classList.add('rtl');
                }
                return this.listen = next(); 
            }
            return clear();
        } , this )
        
    }

    async componentWillUnmount(){
        this.listen.clear();
    }

*/



const ListenEventWithInterval = (function(){ 
    return function(callback , context = null ){
        let timeout = null;
        let ctx = {
            clear : function(){
                clearTimeout( timeout );
                return true ;
            },
            next : function (is = true ){
                let timeout = null; 
                if( is ){
                    timeout = SetTimeOut ();
                }
                return {
                    clear(){
                        clearTimeout ( timeout );
                    }
                }
            },
        };
        function SetTimeOut (){
            timeout = setTimeout(() => {
                callback.call( context || ctx  , { clear : ctx.clear , next : ctx.next } ); 
            }, 1);
            return timeout;
        };

        
        return ( function(){
            let timeout = SetTimeOut();
            return {
                clear(){
                    clearTimeout( timeout );
                }
            }
        })(); 
    }
})( );

export default ListenEventWithInterval ;