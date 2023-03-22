const fs = require('fs');
module.exports = process.platform !== 'win32' && fs.realpathSync && typeof fs.realpathSync.native === 'function' ? fs.realpathSync.native : fs.realpathSync;