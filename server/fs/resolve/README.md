# ezito system-files resolve
## Installation

    npm install https://github.com/ezitoir/ezito-utils.git

## Usage
    
```javascript
const resolve = require('ezito-utils/server/fs/resolve');
var filePath = resolve('src');

const jsconfig = require('./jsconfig.js');
resolve('@public/pages' , { 
    baseDir : resolve(jsconfig.compilerOptions.baseUrl),
    paths : jsconfig.compilerOptions.paths
});

resolve.resolveModule('@public/pages' , { 
    baseDir : resolve(jsconfig.compilerOptions.baseUrl),
    paths : jsconfig.compilerOptions.paths
});
