# EzitoIR ezito-utils

## Installation

    npm install https://github.com/ezitoir/ezito-utils.git

## Usage

```javascript
const ezitoTypes = require('ezito-utils/public/validator/types');
// esModule
import ezitoTypes from 'ezito-utils/public/validator/types';

ezitoTypes.string('Hello World!');  // output : true
ezitoTypes.string(!'Hello World!'); // output : false
ezitoTypes.object({ }); // output : true
ezitoTypes.function(()=>{}); // output : true
ezitoTypes.function( true ); // output : false


ezitoTypes.array([]); // output : true
ezitoTypes.array([ "name" , 10 ] ,
    [
        ezitoTypes.string ,
        ezitoTYpes.oneOfType(
            ezitoType.string ,
            ezitoType.number
        )
    ]
); // output : true


ezitoTypes.array([ "name" , {} ] ,
    [
        ezitoTypes.string ,
        ezitoTYpes.oneOfType(
            ezitoType.string ,
            ezitoType.number
        )
    ]
); // output : false