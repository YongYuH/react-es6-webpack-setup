var path = require('path');

module.exports = {
    entry: ['webpack/hot/dev-server', path.resolve(__dirname, 'app/main.js')],
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js'
    },
    module: {
        loaders: [
        {
            test: /\.js$/,
            loaders: ['babel?presets[]=es2015,presets[]=react']
        }
        ]
    }
};
