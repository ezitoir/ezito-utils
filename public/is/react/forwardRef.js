'use strict';
/** @license React v16.13.1
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const { REACT_FORWARD_REF_TYPE } = require('./types');
const typeOf = require('./typeOf');
function isForwardRef(object) {
    return typeOf(object) === REACT_FORWARD_REF_TYPE;
}
module.exports = isForwardRef;