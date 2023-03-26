"use strict";
/** @license Apache created by ezitoir eziot-utils v1.0.0 
 *
 * Copyright (c) eziotir, Inc. and its affiliates. 
 * 
 */

function makeId( count = 5 , characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789' ) {
    var result = String('');
    for (let index = 0; index < count ; index++) {
        result += characters.charAt( Math.floor( Math.random() *  characters.length ));
    }
    return result ;
}

module.exports = makeId ;