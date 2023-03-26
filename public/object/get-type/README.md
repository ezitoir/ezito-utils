## Installation

    npm install https://github.com/ezitoir/ezito-utils.git

## Usage

```javascript
const getType = require('./public/object/get-type');
console.log(
    getType(
        async () => {}
    )
);
// output : async-arrow-function

console.log(
    getType(
        async function Test(){}
    )
);
// output : async-function

console.log(
    getType(
        function Test(){}
    )
);
// output : function


console.log(
    getType(
        new Promise(()=>{})
    )
);
// output : promise

console.log(
    getType(
        true || false
    )
);
// output : boolean


console.log(
    getType(
        'test'
    )
);
// output : string