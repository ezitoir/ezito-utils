'use strict';
/**
 * 
 * @returns {ie ,safari ,opera ,fireFox ,chrome ,edgeChromium ,blink ,edge }
 */

function getBrowers(){
    var is = {
        ie  : false,
        safari : false,
        opera : false,
        fireFox : false,
        chrome : false,
        edgeChromium :false,
        blink : false,
        edge : false,
    }
    if(typeof window !== "undefined"){
        if(Object.prototype.toString.call(window) === "[object Window]"){
            if(Object.prototype.toString.call(document) === "[object HTMLDocument]"){
                // Opera 8.0+
                is.opera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
                // Firefox 1.0+
                is.fireFox = typeof InstallTrigger !== 'undefined';
                // Safari 3.0+ "[object HTMLElementConstructor]" 
                is.safari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || (typeof safari !== 'undefined' && window['safari'].pushNotification));
                // Internet Explorer 6-11
                is.ie = /*@cc_on!@*/false || !!document.documentMode;
                // Edge 20+
                is.edge = !isIE && !!window.StyleMedia;
                // Chrome 1 - 79
                is.chrome = !!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime);
                // Edge (based on chromium) detection
                is.edgeChromium = isChrome && (navigator.userAgent.indexOf("Edg") != -1);
                // Blink engine detection
                is.blink = (isChrome || isOpera) && !!window.CSS;
            }
        }
    }
    return is;
}

module.exports = getBrowers;
