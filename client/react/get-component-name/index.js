"use strict";






var REACT_ELEMENT_TYPE = 0xeac7;
var REACT_PORTAL_TYPE = 0xeaca;
var REACT_FRAGMENT_TYPE = 0xeacb;
var REACT_STRICT_MODE_TYPE = 0xeacc;
var REACT_PROFILER_TYPE = 0xead2;
var REACT_PROVIDER_TYPE = 0xeacd;
var REACT_CONTEXT_TYPE = 0xeace;
var REACT_FORWARD_REF_TYPE = 0xead0;
var REACT_SUSPENSE_TYPE = 0xead1;
var REACT_SUSPENSE_LIST_TYPE = 0xead8;
var REACT_MEMO_TYPE = 0xead3;
var REACT_LAZY_TYPE = 0xead4;
var REACT_BLOCK_TYPE = 0xead9;
var REACT_SERVER_BLOCK_TYPE = 0xeada;
var REACT_FUNDAMENTAL_TYPE = 0xead5;
var REACT_SCOPE_TYPE = 0xead7;
var REACT_OPAQUE_ID_TYPE = 0xeae0;
var REACT_DEBUG_TRACING_MODE_TYPE = 0xeae1;
var REACT_OFFSCREEN_TYPE = 0xeae2;
var REACT_LEGACY_HIDDEN_TYPE = 0xeae3;






function getComponentName(type) {
    if (type == null) {
      // Host root, text node or just invalid type.
      return null;
    }
  
    {
      if (typeof type.tag === 'number') {
        error('Received an unexpected object in getComponentName(). ' + 'This is likely a bug in React. Please file an issue.');
      }
    }
  
    if (typeof type === 'function') {
      return type.displayName || type.name || null;
    }
  
    if (typeof type === 'string') {
      return type;
    }
  
    switch (type) {
      case REACT_FRAGMENT_TYPE:
        return 'Fragment';
  
      case REACT_PORTAL_TYPE:
        return 'Portal';
  
      case REACT_PROFILER_TYPE:
        return 'Profiler';
  
      case REACT_STRICT_MODE_TYPE:
        return 'StrictMode';
  
      case REACT_SUSPENSE_TYPE:
        return 'Suspense';
  
      case REACT_SUSPENSE_LIST_TYPE:
        return 'SuspenseList';
    }
  
    if (typeof type === 'object') {
      switch (type.$$typeof) {
        case REACT_CONTEXT_TYPE:
          var context = type;
          return getContextName(context) + '.Consumer';
  
        case REACT_PROVIDER_TYPE:
          var provider = type;
          return getContextName(provider._context) + '.Provider';
  
        case REACT_FORWARD_REF_TYPE:
          return getWrappedName(type, type.render, 'ForwardRef');
  
        case REACT_MEMO_TYPE:
          return getComponentName(type.type);
  
        case REACT_BLOCK_TYPE:
          return getComponentName(type._render);
  
        case REACT_LAZY_TYPE:
          {
            var lazyComponent = type;
            var payload = lazyComponent._payload;
            var init = lazyComponent._init;
  
            try {
              return getComponentName(init(payload));
            } catch (x) {
              return null;
            }
          }
      }
    }
  
    return null;
}

export default getComponentName;