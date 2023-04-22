var defaultExtension =   [
    '.css', 
    '.scss', 
    '.sass', 
    '.pcss', 
    '.stylus', 
    '.styl', 
    '.less', 
    '.sss', 
    '.gif', 
    '.jpeg', 
    '.jpg', 
    '.png', 
    '.svg', 
    '.mp4', 
    '.webm', 
    '.ogv'
];
 
const events = require('events');
const eventEmiter = new events.EventEmitter({});
eventEmiter.setMaxListeners(50);
const path = require('path');
const regesterExtensions = function ( ...customExtensions ){
    const newExtensions = [ ...defaultExtension , ...customExtensions ];
    defaultExtension = newExtensions;
    const nOp = function ( module , filename ){
        const ext = path.extname(filename);
        eventEmiter.emit(ext , filename , module);
        eventEmiter.emit('all' , filename , module);
        module.exports = {};
    }
    for (const extnsion of newExtensions) {
        if( require.extensions[extnsion] ){
            delete require.extensions[extnsion];
        }; 
        require.extensions[extnsion] = nOp;
    }
};
const $$typeof = Symbol.for('ingore-style');
module.exports.event = {
    $$typeof ,
    type : {
        default : defaultExtension,
        enyType : function (...enyType){ 
            return {
                $$typeof ,
                list : enyType ,
            };
        },
    },
    addListener : function (type ,callback){ 
        if(type.$$typeof && type.$$typeof === this.$$typeof ){
            eventEmiter.addListener('all' , function (fileName , module){
                if(defaultExtension.includes(path.extname(fileName))) callback(fileName , module)
            });
        }
        else { 
            eventEmiter.addListener(type , callback)
        }
        return callback;
    },
    emit : eventEmiter.emit
};
module.exports.default = regesterExtensions;