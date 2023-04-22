'use strict'; 
"use strict";
/** @license Apache created by ezitoir eziot-utils v1.0.0 
 *
 * Copyright (c) eziotir, Inc. and its affiliates. 
 * 
 */

module.exports = function () { 
    var isWindow   = typeof window === "object" && "[object Window]" === Object.prototype.toString.call(window);
    var isDocument = typeof document === "object" && "[object HTMLDocument]" === Object.prototype.toString.call(document);
    var isNative   = typeof navigator === "object" && '[object Navigator]' === Object.prototype.toString.call(navigator);
    var isGloabl   = typeof global === "object";
    var isClient   = isWindow && isDocument && isNative ;
    return isClient === false && isGloabl;
}
