'use strict';

const crypto = require("crypto");
module.exports.__esModule = true ;
module.exports.decrypteWithBuffer = function (encrypted ,option = {algorithm :'aes-256-cbc',key: crypto.randomBytes(32) , iv: crypto.randomBytes(16).toString('hex')}) {
    const { algorithm , key , iv } = option;
    try {
        iv = Buffer.from( iv , 'hex');
        let encryptedText = Buffer.from(encrypted, 'hex');
        let decipher = crypto.createDecipheriv(algorithm, Buffer.from(key), iv);
        let decrypted = decipher.update(encryptedText);
        decrypted = Buffer.concat([decrypted, decipher.final()]);
        return decrypted.toString();
    } catch (error) {
       return new Error(error);
    }
};
module.exports.default = function ( encrypted , option = { algorithm : 'aes-256-cbc',  key : "13881390138813901388139013881390" , iv : '1390138813901388' }){
    const { algorithm , key , iv } = option;
    try {
        var decipher = crypto.createDecipheriv(algorithm, Buffer.from(key), iv);
        return decipher.update( encrypted , 'hex', 'utf8') + decipher.final('utf8');
    } catch (error) {
        return new Error(error);   
    }
}