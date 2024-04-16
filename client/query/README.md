# EzitoIR ezito-utils

## Installation

    npm install https://github.com/ezitoir/ezito-utils.git

## Usage

```javascript
import Query from "ezito-utils/client/query";
// OR
const Query = require("ezito-utils/client/query");

var data = Query("#phone , #password , #password-again").valuesWithKey(function(value , element){
    return element.id
});



