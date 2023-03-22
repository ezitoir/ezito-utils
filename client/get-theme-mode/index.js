'use strict';
 
let isDark = false;

if (typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    // dark mode
    isDark = true;
} 

module.exports = {
    isDark ,
    getAuto : function(callback , ...any ){ 
        callback.call(this , isDark , ...any);
        if(typeof window !== 'undefined')
        return window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
            const newColorScheme = event.matches ? "dark" : "light";
            callback.call(this , !!event.matches  , ...any);
        });
    }
}
