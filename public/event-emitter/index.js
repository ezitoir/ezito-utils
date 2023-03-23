'use strict';
const isSsr = require('ezito-utils/public/is/ssr');
if(isSsr()){
    module.exports = require('./lib/ssr');
}
else {
    module.exports = require('./lib/client');
}