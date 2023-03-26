# EzitoIR ezito-utils

## Installation

    npm install https://github.com/ezitoir/ezito-utils.git

## Usage

```javascript
const is = require('ezito-utils/public/is');
// esModule
import is from 'ezito-utils/public/is';

is.function(()=>{}); // return true
is.arrowfunction(()=>{}); // return true;
is.calss(class{}); // return true

// OR
const isFunction = requrie('ezito-utils/public/is/function');
// esModule 
import isFunction from 'ezito-utils/public/is/function'; 
// Or eny