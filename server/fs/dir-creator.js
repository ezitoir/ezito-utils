'use strict';
const exists = require('./exists');
const fs = require('fs');
const path = require('path');
module.exports = function( dir ){
    /**
     * create directory for copy files
     */
    if(!exists(dir)){
        let creator = ''
        for (const iterator of dir.split(path.sep)) {
            creator += iterator + path.sep
            if(!exists(creator)){
                fs.mkdirSync( creator , { recursive : true});
            }
        }
    };
}
