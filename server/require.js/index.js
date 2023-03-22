const babel = require("@babel/core");
const fs = require('fs');
const path = require('path'); 
const someCheck = require('ezito/utils/server/fs/some-check'); 
const makeId = require('ezito/utils/public/crypto/make-id');
const jsConfig = require('ezito/core/config/jsconfig');
const resolve = require('ezito/utils/server/fs/resolve'); 

let moduleRequireList = [];

function getOrgPath (modulePath , fileName){
    const globalPath = resolve(modulePath);
    const fileTarget = resolve(modulePath , {baseDir : path.dirname(fileName)});
    const jsConfigPath = resolve(modulePath ,{paths : jsConfig.compilerOptions.paths});
    var newPath = '';
    if(!(newPath=someCheck(globalPath,fileTarget,jsConfigPath))) throw new Error('module notfound');
    return newPath;
}

function search(path){
    var counter = 1;
    for (const iterator of moduleRequireList) { 
        if(typeof iterator==="object" &&  iterator.modulePath === path) return counter;
        counter ++;
    }
    return false;
}

function replace(path , newObj){
    var counter = 0 ;
    for (const iterator of moduleRequireList) {
        if(typeof iterator==="object" &&  iterator.modulePath == path){ 
            moduleRequireList[counter] = {...moduleRequireList[counter] , ...newObj}
        }
        counter++;
    }
    return false;
}

function getId(path){
    for (const iterator of moduleRequireList) {
        if(typeof iterator==="object" &&  iterator.modulePath === path) { 
            //if(iterator.contextFile === true && iterator.clearSource === true) return iterator.targetSource ;
            return iterator.key;
        }
    }
}

function setClearSource(path , val){
    var counter = 0;
    for (const iterator of moduleRequireList) {
        if(typeof iterator==="object" &&  iterator.modulePath === path) {
            moduleRequireList[counter].clearSource = val ;
        }
        counter ++;
    } 
}
function setTargetSource(path , Id ){
    var counter = 0;
    for (const iterator of moduleRequireList) {
        if(typeof iterator === "object" &&  iterator.modulePath === path) {
            moduleRequireList[counter].targetSource = Id ;
        }
        counter ++;
    } 
}

function setContextFile(path , val ){
    var counter = 0;
    for (const iterator of moduleRequireList) {
        if(typeof iterator==="object" &&  iterator.modulePath === path) {
            moduleRequireList[counter].contextFile = val ;
        }
        counter ++;
    } 
}

function addToModuleList (path , obj, parseFileName){
    if((pathIndex = search(path))){
        if( parseFileName !== path && (parseIndex = search(parseFileName))){ 
            //var currentModulePath = moduleRequireList[pathIndex -1]; 
            //moduleRequireList = [...moduleRequireList.slice(0 , pathIndex -1 ) , ...moduleRequireList.slice(pathIndex)]; 
            //parseIndex = search(parseFileName);
            //moduleRequireList = [ ...moduleRequireList.slice(0 , parseIndex -1 ) ,currentModulePath , ...moduleRequireList.slice(parseIndex) ];
        }
        return;
    }; 
    moduleRequireList.push(obj);
}

function addChildren(path , childPath ){
    var index = search(path);
    if(index){
        if(moduleRequireList[index -1].children.includes(childPath)){ 
            return;
        } ; 
        moduleRequireList[index -1].children.push(childPath);
    }
}

function globalString(){ 
    let browersGlobals = 'const process = {';
    for (const iterator of Object.keys(process)) {
        browersGlobals += iterator + ': {} ,';
    }
    browersGlobals += '}; \n' ;
    return browersGlobals;
}
function setValidChildSourceToCompile(path , childPath){
    var index = search(path);
    if(index){
        if(moduleRequireList[index -1].validSourceChildren){
            moduleRequireList[index -1].validSourceChildren.push(childPath);
        }
        else {
            moduleRequireList[index -1].validSourceChildren= [childPath];
        }
    }
}
function ifHasValidChildSource(path){
    var index = search(path);
    if(index && moduleRequireList[index -1].validSourceChildren )return moduleRequireList[index -1].validSourceChildren;
    return false;
}
function isUmd(path){
    var index = search(path);
    if(index) return moduleRequireList[index-1].umd === true ;
    return false;
}
function browersRequire(){
    return `\n 
    const __browersRequire = function(token){
        function getGlobal (global, factory) {
            if(typeof exports === 'object' && typeof module !== 'undefined'){
                return factory(exports);
            }
            else if(typeof define === 'function' && define.amd ){
                return define(['exports'], factory) 
            }
            else {
                global = global || self;
                return factory(global)
            }
        }
        return getGlobal(window , ( exports) => {
            if(exports[token]){
                if(exports[token].default) return exports[token];
                exports[token].default = exports[token];
                return exports[token]
            }
        })
    };\n`; 
}

const parse = function (string ,targetFileName, parseFileName){  
    parseFileName = resolve(parseFileName);
    targetFileName = resolve(targetFileName);
    if(targetFileName.indexOf('umd') > -1) { 
        addToModuleList(targetFileName , {
            modulePath : targetFileName ,
            parseFileName , 
            children : [] ,
            umd : true,
            key : 'E' + makeId(10) ,
        }); 
        addChildren(parseFileName , targetFileName);
        return string;
    };
     
    return babel.transformSync(string , {
        "presets": [
            ["@babel/preset-react", {}],
        ],
        "plugins" : [
            [function(){
                return {
                    visitor :{
                        Identifier(nodePath , { opts , file }){
                            const fileName = file.opts.filename || opts.fileName || targetFileName;                              
                            addToModuleList(fileName , {
                                modulePath : fileName ,
                                parseFileName , 
                                children : [] ,
                                umd : fileName.indexOf('umd') > -1 ? true : false ,
                                key : 'E' + makeId(10) ,
                            }); 
                            addChildren(parseFileName , fileName);
                            if(isUmd(fileName)) return ;
                       }
                    }
                }
            }],
            ["ezito/core/utils/babel/plugins/commonjs-export",{
                prepareCommonJSExport(nodePath , fileName , fns , { isBlock }){ 
                    fileName = fileName || targetFileName; 
                    var ui = '';  
                    addToModuleList(fileName ,{
                        modulePath : fileName ,
                        parseFileName , 
                        children : [] ,
                        umd : fileName.indexOf('umd') > -1 ? true : false ,
                        key : 'E' + makeId(10) ,
                    }); 
                    addChildren(parseFileName , fileName);
                    ui = getId(fileName);
                    if(isBlock.fileName){
                        addToModuleList(isBlock.fileName , {
                            modulePath : isBlock.fileName  , 
                            targetFileName : isBlock.targetFileName , 
                            parseFileName ,
                            umd : isBlock.fileName.indexOf('umd') > -1 ? true : false ,
                            children : [],
                            key : 'E' + makeId(10) ,
                        });
                        addChildren(isBlock.targetFileName , isBlock.fileName) ;
                        setTargetSource(isBlock.targetFileName , getId(isBlock.fileName));
                        setClearSource(isBlock.targetFileName , true ); 
                        setContextFile(isBlock.targetFileName , true );
                        setValidChildSourceToCompile(isBlock.targetFileName , isBlock.fileName);
                        ui = getId(isBlock.targetFileName)
                    }
                    return {
                        ['*'] : ()=>{  
                            replace(fileName ,{ export : true })
                        },
                        ['module.exports'] :()=>{
                            return {
                                spliter : 2 ,
                                value : 'exports'
                            }
                        },
                        ['module.exports.*'] : (nodePath) => {
                            return {
                                spliter : 2 ,
                                value : 'exports'
                            }
                        },
                        ['exports.*'] : (nodePath) => {
                            return {
                                //spliter : 1,
                                //value : 'exports.' + ui
                            }
                        }
                    }
                },
                fileName : targetFileName ,
            }],

            ["ezito/core/utils/babel/plugins/call-import-export", {
                prepareCallFunction(nodePath , fileName , { addSource , addVariable}){
                    fileName = fileName || targetFileName; 
                    if(isUmd(fileName)) return ;
                    return {
                        Require(args){
                            var isValidChild = ifHasValidChildSource(fileName);
                            var newFileName = getOrgPath(args[0].value,fileName); 
                            if(isValidChild && !isValidChild.includes( newFileName)) return ;

                            var ui = '';
                            addToModuleList(fileName ,{
                                modulePath : fileName ,
                                parseFileName , 
                                children : [] , 
                                umd : fileName.indexOf('umd') > -1 ? true : false ,
                                key : 'E' + makeId(10) ,
                            });
                            addChildren(fileName ,newFileName);
                            if(isUmd(newFileName)) return ;
                            ui = getId(fileName);
                            if(newFileName && !fs.lstatSync(newFileName).isDirectory()){
                                var code = parse(fs.readFileSync(newFileName) , newFileName , targetFileName);
                                replace(newFileName,{ source : code });
                                ui = getId(newFileName);
                            }
                            args[0].value = ui;
                            return {
                                calleeArgs : args ,
                                calleeName : '__browersRequire'
                            } 
                        },
                    }
                },
                prepareImportDeclaration(nodePath , modulePath ,fileName , { addSource , addVariable }){
                    fileName = fileName || targetFileName;
                    if(isUmd(fileName)) return ;
                    var newFileName = getOrgPath(modulePath, fileName); 
                    var isValidChild = ifHasValidChildSource(fileName);
                    if(isValidChild && !isValidChild.includes( newFileName)) return ;

                    var ui ='';
                    addToModuleList(fileName ,{
                        modulePath : fileName ,
                        parseFileName , 
                        children : [] ,
                        key : 'E' + makeId(10) ,
                    }); 
                    addChildren(fileName ,newFileName);
                    if(isUmd(newFileName)) return;
                    ui = getId(fileName)
                    if(newFileName && !fs.lstatSync(newFileName).isDirectory()){ 
                        var code = parse(fs.readFileSync(newFileName ),newFileName , targetFileName);
                        replace(newFileName, { source : code });
                        ui = getId(newFileName);
                    } 
                    return {
                        ImportDefault(){  
                            return {
                                newModulePath : ui,
                                functionName : "__browersRequire"
                            }
                        },
                        ImportWithCards(){
                            return {
                                newModulePath : ui,
                                functionName : "__browersRequire"
                            }
                        }
                    }
                },
                prepareExportDeclaration(nodePath , fileName , { addSource , addVariable}){
                    fileName = fileName || targetFileName;
                    if(isUmd(fileName)) return ;
                    replace(fileName ,{ export : true });
                    addVariable('const' , '__esModule', `Object.defineProperty(exports, "__esModule", { value: true });`, { insert : 'pushContainer'});
                    return {};
                }, 
                fileName : targetFileName ,
            }],

        ]
    }).code;
};


function requireJS (string , targetFileName){ 
    const code = parse(string,targetFileName ,targetFileName);
    let template = '';
    template += globalString();
    template += browersRequire();
    function sortModulePathList(){
        var modulePathList = [];
        function sortChildren(){
            for (const iterator of moduleRequireList) {
                if(!modulePathList.includes(iterator.modulePath)){
                    modulePathList.push(iterator.modulePath)
                }
                if( iterator.children &&  iterator.children.length > 0){
                    for (const iteratorChild of iterator.children) {
                        if(modulePathList.indexOf(iteratorChild) > -1){
                            var index = modulePathList.indexOf(iteratorChild);
                            var tempList = modulePathList.slice(0,index)
                            var tempList2 = modulePathList.slice(index + 1 );
                            var currentChild = modulePathList.at(index);
                            modulePathList = [ ...tempList , ... tempList2 , currentChild ];
                        }
                        else {
                            modulePathList.push(iteratorChild);
                        }
                    }
                }
            }
        }
        sortChildren();
        modulePathList = modulePathList.reverse();
        for (const iterator of modulePathList) {
            var contextFile = moduleRequireList[search(iterator) -1];
            if(contextFile.contextFile && contextFile.clearSource ){             
                if(contextFile.children.length > 0){ 
                    for (const childPath of contextFile.children) {
                        modulePathList = modulePathList.filter(i => i != childPath)
                    }
                    var index = modulePathList.indexOf(contextFile.modulePath); 
                    var tempList = modulePathList.slice(0,index);
                    var tempList2 = modulePathList.slice(index);
                    modulePathList = [ ...tempList , ...contextFile.children , ...tempList2 ];
                }
            }
        }
        for (const iterator of modulePathList) {
            var index = search(iterator);
            if(index && moduleRequireList[index -1].children.length > 0){
                var parseModule = moduleRequireList[index - 1];
                var beforeParserFile = modulePathList.slice(0 , modulePathList.indexOf(iterator));
                var afterParserFile = modulePathList.slice(modulePathList.indexOf(iterator));
                var newChildren = [];
                var indexOf = 0
                for (const child of parseModule.children) {
                    if(!beforeParserFile.includes(child)){
                        beforeParserFile = [...beforeParserFile , child]
                    }
                    if(afterParserFile.indexOf(child) > -1)
                    afterParserFile = [...afterParserFile.slice(0 , afterParserFile.indexOf(child)),...afterParserFile.slice(afterParserFile.indexOf(child) +1)]
                }
                modulePathList = [...beforeParserFile , ...afterParserFile]
            }
        }
        return modulePathList ;
    } 
    for (const iterator of sortModulePathList()) {
        var index = search(iterator);
        var obj = moduleRequireList[index -1]; 
        if( typeof obj ==="object" && obj.modulePath ){
            template += `\n/* require  ${obj.modulePath}*/\n`;
            if(obj.export === undefined && typeof obj.source === "string"){
                template += (`\n${obj.source || ''}\n`); 
            }
            else {
                 
                template +=(
                    `(function (global, factory) { 
                        typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports , false) :
                        typeof define === 'function' && define.amd ? define(['exports'], factory) :
                        (global = global || self, factory({} , true ,global));
                      }(this, (function (exports , ___is , ___global) {
                          /*exports.${obj.key} = {};*/ 
                          ${obj.source} 
                          if(___is){
                            ___global.${obj.key} = exports ;
                          }
                          /*obj.clearSource === true ? obj.source :  obj.source || ''*/
                          /**obj.clearSource === true ? 'exports.' + obj.key +'=' + obj.targetSource : '' */
                      })));\n`
                )
            }  
        } 
        moduleRequireList[index -1].source = '';
    } 
    moduleRequireList = [];
    return (`(()=>{\n ${template += code} \n}).call(this);`);
 
};
module.exports = requireJS;