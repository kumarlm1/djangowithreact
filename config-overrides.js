const path = require('path');

module.exports = {
    paths: function (paths, env) {        
        paths.appIndexJs = path.resolve(__dirname, 'reactfrontend/react/src/index.js');
        paths.appSrc = path.resolve(__dirname, 'reactfrontend/react/src');
        return paths;
    },
}