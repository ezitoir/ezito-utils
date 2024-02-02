'use strict';
const http = require('http');
module.exports.server = function (obj){
    return obj instanceof http.Server;
}

module.exports.response = function (obj){
    return obj instanceof http.ServerResponse;
}

module.exports.request = function (obj){
    return obj instanceof http.ClientRequest;
}