'use strict';

const Sx = require('./../sx');
const JsonToCssProperty = require('./../../../utils/public/json-to-css-property');
const makeId = require('./../../../utils/public/crypto/make-id');
const createElement = require('./../create-element');
const objFilter = require('./../../../utils/public/object/filter');
const Query = require('./../query');



function sxToStyle (element = null | Element , error = true ){
    if(!(element instanceof Element )) {  if(error === true ) throw { TypeError : 'param error.'}; ; return false ;} 
    if(!Sx) throw { TypeError : 'please usinf csr .client'};

    var elements = element.querySelectorAll('*[sx]');
    HTMLAllCollection.prototype.forEach = Array.prototype.forEach;

    elements.forEach(function(item){
        const cid = makeId(5);
        item.setAttribute('eui-sx-id' , cid );
        var sx = JSON.parse(item.getAttribute('sx'));
        var xs = Array();
        var sm = Array();
        var md = Array();
        var lg = Array();
        var xl = Array();

        if(sx.xs){
            sx.xs = objFilter(sx.xs , {
                '*' : function ( key , value ){
                    if(key.trim()[0] === '&'){ 
                        var selector = key.trim().slice(1).split(':').at(0);
                        var css_event = key.trim().slice(1).split(':').at(1); 
                        Query( item , selector ).forEach(function(){ 
                            selector = selector +  ( css_event !== undefined ? ':' + css_event : '');
                            xs.push(`[eui-sx-id="${cid}"]${selector}{${JsonToCssProperty(value)}}`)
                        });
                        return false;
                    }
                    return true;
                }
            }); 
        }


        var styleBody  = Sx.renderToString({
            xs : sx.xs ? `[eui-sx-id="${cid}"]{${JsonToCssProperty(sx.xs)}} ${xs.join(' ')}` : undefined,
            sm : sx.sm ? `[eui-sx-id="${cid}"]{${JsonToCssProperty(sx.sm)}}` : undefined,
            md : sx.md ? `[eui-sx-id="${cid}"]{${JsonToCssProperty(sx.md)}}` : undefined,
            lg : sx.lg ? `[eui-sx-id="${cid}"]{${JsonToCssProperty(sx.lg)}}` : undefined,
            xl : sx.xl ? `[eui-sx-id="${cid}"]{${JsonToCssProperty(sx.xl)}}` : undefined,
        }).toString();
        
        let style = createElement("<style/>" , { cid : cid , type : 'text/css'} , );
        if (style.styleSheet){
            style.styleSheet.cssText = styleBody;
        } 
        else {
            style.appendChild(document.createTextNode(styleBody));
        }
        document.head.insertAdjacentElement("beforeend", style) ;
        item.removeAttribute('sx');
    })

}

module.exports = sxToStyle;