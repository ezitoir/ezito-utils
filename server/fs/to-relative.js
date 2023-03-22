'use strict';

const path = require('path');
module.exports = function toRelative(fileName ,target){
    let [ targetDirName , targetfileName ] = [ path.dirname(fileName).split(path.sep) ,path.basename(fileName)];
    let [ importPathDirName , importFileName ] = [path.dirname(target).split(path.sep) ,path.basename((target))]; 
    function deleteLike( x , y){
        function local( max , min ){
            var counter = 0;
            for (const iterator of max) {
                if(min[counter] === iterator ){
                    max[counter] = undefined;
                    min[counter] = undefined;
                }
                else {
                    return [ max , min ];
                }
                counter ++;
            }
            return [[undefined],[undefined]]
        }
        if(x.length > y.length ){
            [ x , y ] = local( x , y);
        }
        else {
            [ y , x ] = local( y , x )
        }
        return [ x.filter( i=> i!== undefined)  , y.filter( i=> i!== undefined) ]
    };
    
    [ importPathDirName , targetDirName ] = deleteLike( importPathDirName , targetDirName );
    importPathDirName.push(importFileName)
     
    var relativePath = './';
    if(targetDirName.length == 0){ 
        targetDirName.push(...importPathDirName)
        relativePath += targetDirName.join('/');
    }
    else {
        targetDirName = targetDirName.map( i => '..');
        targetDirName.push(...importPathDirName)
        relativePath += targetDirName.join('/');
    }
    return relativePath;
}