'use strict';
module.exports.__esModule = true;
module.exports.default = void(0);
const crypto = require("crypto"); 
/**
 * 
 * @param {string} text  
 * @param {object} option default is key and iv 
 * @returns {string}
 */
module.exports.encrypteWithBuffer =  function  (text , option = { algorithm : 'aes-256-cbc', key : crypto.randomBytes(32) , iv : crypto.randomBytes(16) }) {
    const { algorithm , key , iv } = option;
    let cipher = crypto.createCipheriv(algorithm, Buffer.from(key), iv );
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return { iv : iv.toString('hex') , encryptedData: encrypted.toString('hex') };
};
/**
 * 
 * @param {string} text 
 * @param {object} option 
 * @returns {string}
 */
module.exports.default = function ( text , option = { algorithm : 'aes-256-cbc',  key : "13881390138813901388139013881390" , iv : '1390138813901388' }){
    const { algorithm , key , iv } = option;
    var cipher = crypto.createCipheriv (algorithm, Buffer.from( key ), iv);  
    return cipher.update(text, 'utf8', 'hex') + cipher.final('hex');
} 