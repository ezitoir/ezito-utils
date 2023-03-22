'use strict';
const bgColor = require('./utils/bgColor');
const fColor = require('./utils/fColor');

const command = {
    Reset: "\x1b[0m",
    Bright: "\x1b[1m",
    Dim: "\x1b[2m",
    Underscore: "\x1b[4m",
    Blink: "\x1b[5m",
    Reverse: "\x1b[7m",
    Hidden: "\x1b[8m",
};
const mconsole = {};
Object.entries(console).forEach(function([ key , value ]){
    if(typeof value === 'function'){
        mconsole[key] = function(...v){
            value(...v);
        }
    }
});

module.exports = { 
    writeGreen(v){
        console.log(fColor.FgGreen ,v,command.Reset); 
    },
    writeRed(v){
        console.log(fColor.FgRed ,v,command.Reset);  
    },
    writeBlue(v){
        console.log(fColor.FgBlue ,v,command.Reset);  
    },
    writeYellow(v){
        console.log(fColor.FgYellow ,v,command.Reset);  
    },
    writeCyan(v){
        console.log(fColor.FgCyan ,v,command.Reset);
    },
    writeMagenta(v){
        console.log(fColor.FgMagenta ,v,command.Reset);
    },
    writeBlack(v){
        console.log(fColor.FgBlack ,v,command.Reset);
    },
    writeWhite(v){
        console.log(fColor.FgWhite ,v,command.Reset);
    },
    ...mconsole
}
