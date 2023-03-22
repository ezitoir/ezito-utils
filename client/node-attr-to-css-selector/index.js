
/**
 * 
 * natcs is => Node Attribute To Css Selector
 * 
 * natcs node attribute to css selector like = <div id="div1"/> convert div[id="div1"]
 */
const NodeAttrToCssSelector = function (node){
    let tagName = (node.tagName || '').toLocaleLowerCase(), attr = node.attr() ,  ntth  = [ tagName ]
    Object.keys(attr).forEach(function(name){
        ntth.push( 
            "[" , 
            name ,
            "=" , 
            attr[name].indexOf("'") > -1 ? '"' : "'", 
            attr[name] 
            , 
            attr[name].indexOf("'") > -1 ? '"' : "'"
            , "]"
        );
    });
    return ntth.join("");
};

module.exports = NodeAttrToCssSelector;