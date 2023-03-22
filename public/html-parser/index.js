

function makeId( count = 5 , characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789' ) {
    var result = String('');
    for (let index = 0; index < count ; index++) {
        result += characters.charAt( Math.floor( Math.random() *  characters.length ));
    }
    return result ;
}
const CustomDomHandler = /** @class */ (function () {
    function resetChildNodesCounter( object ){
        var counter = 0 ;
        for (const iterator of object) {
            iterator.counter = counter ;
            counter ++;
        };
        return object;
    };



    function CustomDomHandler( callback , options ){
        /** The elements of the DOM */
        this.dom = []; 
        /** Indicated whether parsing has been completed. */
        this.done = false;
        /** Stack of open tags. */
        this.tagOpenStack = [];
        this.tagCloseStack = [];  
        this.processStartEnd = {};
        /** Counter */
        this.counter = 0;
        /** Children list. */
        this.children = [];
        this.processChildren = [];
        this.processChildrenOpenTag = [];
        this.processText = [];
        /** A data node that is still being written to. */
        this.lastNode = null;
        /** Reference to the parser instance. Used for location information. */
        this.parser = null;
        // Make it possible to skip arguments, for backwards-compatibility
        this.callback = typeof callback === "function" ? callback : ()=>{};
        this.options = options;
    };

    CustomDomHandler.prototype.onparserinit = function (parser) {
        this.parser = parser; 
    };
    /** 
     * @param {*} name
     * @param {*} attribuets 
     */
    CustomDomHandler.prototype.onopentag = function onOpenTag( name , attributes ){
        this.processText = []
        const [ start , end ] = [this.parser.startIndex , this.parser.endIndex ];
        this.processStartEnd = { start , end }
        this.tagOpenStack.push({ 
            type : 'tag' ,
            name ,
            attributes ,
            openTag : { start , end } ,
            closeTag :{ start : 0 , end : 0 } ,
            children : undefined ,
            lineTag : undefined ,
            id : undefined ,
            counter : this.counter
        });
        this.counter ++;
        this.processText.push(name)
        this.processChildren.push(name);
    };


    CustomDomHandler.prototype.onclosetag = function onCloseTag( name ){
        const id = makeId('12');
        let children = false;
        const [ start , end ] = [ this.parser.startIndex , this.parser.endIndex ];
        let lineTag = this.processStartEnd.start === start && this.processStartEnd.end === end ;

        if( lineTag ){
            children = false;
            lineTag = true;
            this.tagOpenStack.at(-1).lineTag = lineTag ;
            this.tagOpenStack.at(-1).closeTag = { start , end };
            this.processChildren.pop();
        }
        else { 
            if(this.processText.length == 2){ 
                //var child = this.tagOpenStack.pop();
                children = true ;
                lineTag = false;
                //this.tagOpenStack.at(-1).children = [child]
                this.tagOpenStack.at(-2).children = []
                this.tagOpenStack.at(-2).lineTag = lineTag ; 
                this.tagOpenStack.at(-2).closeTag = { start , end };
                this.processChildren.pop();
            }
            else {
                children = undefined;
                lineTag = undefined;
            }
        }

        if( children === undefined && lineTag === undefined ) { 
            const getFiltered = this.tagOpenStack .map(function filtered( value , index){
                if( value.children === undefined && value.lineTag === undefined && value.id === undefined && value.type === 'tag'){
                    if( name === value.name ){  
                        return [{ value , index }]
                    }
                }
                return undefined
            }).filter(item => item !== undefined ).at(-1);
            if( getFiltered &&  getFiltered.length > 0){
                this.tagOpenStack[getFiltered.at(0).index].id = id;
            } 
        };

        this.tagCloseStack.push({ 
            name ,
            start ,
            end ,
            lineTag  ,
            children ,
            id : id
        });
        this.processText = [];
        if( end === start ) throw new Error('');

    };


    CustomDomHandler.prototype.ontext = function onText( value ){
        value = value.trim();
        if( value === '') return ;
        const [ start , end ] = [this.parser.startIndex , this.parser.endIndex]; 
       
        this.tagOpenStack.push({ 
            type : 'text' ,
            value , 
            openTag : { start } ,
            closeTag : { end } ,
            counter : this.counter 
        });
        this.counter ++;

        this.processText.push( value )
    };

    CustomDomHandler.prototype.onend = function onEnd(){
        this.prepareOffset();
    };

    CustomDomHandler.prototype.onprocessinginstruction = function (name, data) {
         
    };

    CustomDomHandler.prototype.onerror = function onErorr(){

    };
   
    function binarySearch(list) {
        var newList = [] ;
        var mid = { openTag :{ start : 0 } , closeTag : { end : 0}};
        var max = { openTag :{ start : 0 } , closeTag : { end : 0} , counter : 0};
        var targetCounter = 0
        ;
        var counter = 0;

        for (const iterator of list) {
            mid = iterator ;
            if( mid.closeTag.end >= max.closeTag.end ){
                max = mid;
                targetCounter = counter
            }  
        counter++;}
        
        newList = [...list.slice(0 , targetCounter ) , ...list.slice( targetCounter  + 1 , -1)];
 
        return { max , newList };
    }
    CustomDomHandler.prototype.sortSortToLargest = function sortSortToLargest( list ){
        var resultList = [];  
        var currentOffset = binarySearch(list) ;
    
        while(list.pop()){ 
            resultList.push(currentOffset.max);
            currentOffset = binarySearch( currentOffset.newList); 
        }
        
        return resultList;
    };
    
    CustomDomHandler.prototype.prepareOffset = function domPrepareOffset(){
        var index = 0; 
        for (const { id } of this.tagOpenStack) {
            if(id){
                const endOffset = this.tagCloseStack.find( function findOffset(value){
                    return value.id === id
                });
                if( endOffset ){ 
                    this.tagOpenStack[index].closeTag = { start : endOffset.start , end : endOffset.end };
                }
            }
        index++;}
        
        /** clear memory */
        this.tagCloseStack = null;
        this.processChildren = null;
        this.processStartEnd = null;
        this.processChildrenOpenTag = null;
        /** convert to tree children */
        this.children = this.prepareTree(
            Object.assign(new Array ,
                this.tagOpenStack
            )
        );

        this.callback(this.children);
    };

    CustomDomHandler.prototype.prepareTree = function prepareTree(contextValues){
        //contextValues = Object.assign([] , contextValues)
        let counter = 0 ;
        let afterContextValue = [] ;
        let beforeContextValue = [] ;
        let childNodes = [];
        let newList = []; 
        while(contextValues[counter]){
            const { openTag , closeTag  } = contextValues[counter] ;

            childNodes = [];
            for (const nodeItem of contextValues.slice(counter + 1)) {
                if(openTag.start < nodeItem.openTag.start && closeTag.end > nodeItem.closeTag.end){
                    childNodes.push( nodeItem );
                } 
            }
             

            beforeContextValue = contextValues.slice(0 , counter + 1);
            afterContextValue = contextValues.slice(counter).slice(childNodes.length  + 1);
            beforeContextValue[counter].children = this.prepareTree(
                resetChildNodesCounter(
                    childNodes
                )
            );
            contextValues = resetChildNodesCounter(
                [...beforeContextValue , ...afterContextValue ]
            );
            
            newList.push(contextValues[counter]); 
            counter ++;
        } 
        return newList
    }

    return CustomDomHandler;
}()) 
const { Parser } = require("./htmlparser2"); 
/**
 * @param {*} htmlString 
 * @param {*} callback 
 * @param {*} options 
 */
module.exports = function customParser( htmlString , callback , options ){
    const cParser = new Parser(cHandler , { recognizeSelfClosing : true });
    cParser.write(htmlString);
    cParser.end();
    const cHandler = new CustomDomHandler(function(dom){
        callback(dom);
    })
}