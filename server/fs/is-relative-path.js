const isRelativePath = function (nodePath = new String()){
    return nodePath.match(/^\.?\.\//);
};
module.exports = isRelativePath;