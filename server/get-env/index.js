

'use strict';
require('ezito/utils/server/dotenv');
module.exports = {
    isProduction : process.env.NODE_ENV === 'production' ,
    NODE_ENV : process.env.NODE_ENV, 
    PORT : process.env.PORT || 80 ,
};

