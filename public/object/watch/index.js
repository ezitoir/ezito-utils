'use strict';
if (!Object.hasOwnProperty.call(Object,'watch')) {
    Object.defineProperty(Object.prototype, "watch", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function ( p , h , context = null , ...args) {
            var ov = this[p], n = ov,
            getter = function () {
                return n;
            },
            setter = function (nv) { 
                ov = n;
                var obj = Object.assign({}, this);
                obj[p] = nv;
                return  h.call( context || this , p /* name */, ov /**old val */, nv /**new val */, obj , ...args) || nv;
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

/**
 * 
 * @param {ContextTarget} object 
 * @param {PropertyNameForWatch} name 
 * @param {CalbackFucntion} callback 
 * @param {CallbackCallerContext} context 
 * @param  {...any send to callback } args 
 */
const WatchObject  = function (object = Object , name , callback , context ,...args) {
    return object.watch( name , callback , context , ...args);
};

module.exports = WatchObject ; 
