'use strict'; 
/** @license eziot-utils v1.0.0 
 *
 * Copyright (c) eziotir, Inc. and its affiliates. 
 * 
 */

module.exports = function () { 
    return (
        typeof window === "undefined" 
        &&
        typeof document === "undefined" 
        && 
        typeof process !== "undefined"
        &&
        typeof global !== "undefined"
        &&
        typeof localStorage === "undefined" 
    )
}
