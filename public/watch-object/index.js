

/**
 * 
 * 
 * 
 * example 
 * 
 *      let cc = { name : 'dsad'};
        WatchObject( cc , 'name' , function(){
            console.log('change')
        });
 */



        
if (!Object.prototype.watch) {
    Object.defineProperty(Object.prototype, "watch", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function ( p , h , context = null ) {
            var ov = this[p], n = ov,
            getter = function () {
                return n;
            },
            setter = function (nv) { 
                ov = n;
                var obj = Object.assign({}, this);
                obj[p] = nv;
                return  h.call( context || this , p /* name */, ov /**old val */, nv /**new val */, obj) || nv;
            };
            if (delete this[p]) {
                Object.defineProperty(this, p, {
                    get: getter,
                    set: setter,
                    enumerable: true,
                    configurable: true
                });
            };
            return this;
        },
    });

    Object.defineProperty(Object.prototype, "unwatch", {
        enumerable: false,
        configurable: true,
        writable: false,
        value: function (p) {
            var v = this[p];
            delete this[p];
            this[p] = v;
        }
    });
};

const WatchObject  = ( function (  ){
    return function (object = Object , name , callback , context) {
        object.watch( name , callback , context );
    }
})()

export default WatchObject ;