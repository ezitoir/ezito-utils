'use strict';
/** @license React v16.13.1
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
const typeOf = require('./typeOf');
const { REACT_CONCURRENT_MODE_TYPE }= require('./types');
function isConcurrentMode(object) {
    return typeOf(object) === REACT_CONCURRENT_MODE_TYPE;
}
module.exports = isConcurrentMode;