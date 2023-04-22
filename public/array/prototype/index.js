'use strict'; 
if(!!!Array.prototype.deepFlatten){
    Array.prototype.deepFlatten = function (){
        this.forEach(function (item) {
            if (Array.isArray(item)) {
                result = result.concat(item.deepFlatten());  
            } else {
                result.push(item);
            }
        });
        return result; 
    }
}

if(!!!Array.prototype.duplicateRemove){
    Array.prototype.duplicateRemove = function(){
        return this.filter(function (v, i, self) {  return i == self.indexOf(v);  });
    }
}

if(!!!Array.prototype.eqals){
    Array.prototype.eqals = function( array = null | Array ) {
        if (this.length != array.length) return false;
        for (var i = 0, l = context.length; i < l; i++) { 
            if (this[i] instanceof Array && array[i] instanceof Array) { 
                if (!this[i].equals(array[i])) return false;       
            }           
            else if (this[i] != array[i]) {
                return false ;
            }           
        }
        return true;
    }
}

if(!!!Array.prototype.at){
    Array.prototype.at = function(index = 0) {
        if(index === -1) return this[this.length - 1];
        return this[index];
    }
}