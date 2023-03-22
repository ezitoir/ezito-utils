
'use strict';
/** @license React v16.13.1
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
const {   
  REACT_FRAGMENT_TYPE ,
  REACT_STRICT_MODE_TYPE ,
  REACT_PROFILER_TYPE,
  REACT_PROVIDER_TYPE,
  REACT_CONTEXT_TYPE ,
  REACT_CONCURRENT_MODE_TYPE,
  REACT_FORWARD_REF_TYPE ,
  REACT_SUSPENSE_TYPE , 
  REACT_MEMO_TYPE ,
  REACT_LAZY_TYPE , 
  REACT_ASYNC_MODE_TYPE ,
  REACT_ELEMENT_TYPE ,
  REACT_PORTAL_TYPE
} = require('./types');



function typeOf(object) {
    if (typeof object === 'object' && object !== null) {
      var $$typeof = object.$$typeof;
  
      switch ($$typeof) {
        case REACT_ELEMENT_TYPE:
          var type = object.type;
  
          switch (type) {
            case REACT_ASYNC_MODE_TYPE:
            case REACT_CONCURRENT_MODE_TYPE:
            case REACT_FRAGMENT_TYPE:
            case REACT_PROFILER_TYPE:
            case REACT_STRICT_MODE_TYPE:
            case REACT_SUSPENSE_TYPE:
              return type;
  
            default:
              var $$typeofType = type && type.$$typeof;
  
              switch ($$typeofType) {
                case REACT_CONTEXT_TYPE:
                case REACT_FORWARD_REF_TYPE:
                case REACT_LAZY_TYPE:
                case REACT_MEMO_TYPE:
                case REACT_PROVIDER_TYPE:
                  return $$typeofType;
  
                default:
                  return $$typeof;
              }
  
          }
  
        case REACT_PORTAL_TYPE:
          return $$typeof;
      }
    }
  
    return undefined;
  } // AsyncMode is deprecated along with isAsyncMode

  module.exports = typeOf;