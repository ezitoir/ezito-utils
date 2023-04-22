'use strict';
require('ezito-utils/server/dotenv')();
const http = require('http');
const https = require('https');
const fs = require('fs');
const resolve = require('ezito-utils/server/fs/resolve');

/**
 * 
 * @param {*} app 
 * @param {*} param1 
 * @returns 
 */
function createHttpsServer(app = Object , option = { key : '' , crt : ''}){
    var privateKey  = fs.readFileSync(resolve(option.key), 'utf8');
    var certificate = fs.readFileSync(resolve(option.crt), 'utf8');
    var credentials = { key: privateKey, cert: certificate };
    var server = https.createServer( credentials , app );
    app.listen = server.listen.bind(server);
    return server;
}
/**
 * 
 * @param {HttpServerObject} app 
 * @returns {http.createServer}
 */
function createHttpServer(app = Object){ 
    var server = http.createServer(app);
    app.listen = server.listen.bind(server);
    return server;
} 
module.exports = {
    createHttpServer,
    createHttpsServer
};