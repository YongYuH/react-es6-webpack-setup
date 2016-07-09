var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: [
        'webpack-dev-server/client?http://localhost:8080',
        'webpack/hot/dev-server', 
        path.resolve(__dirname, 'app/main.js')
    ],
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js'
    },
    module: {
        loaders: [
        {
            test: /\.js$/,
            loaders: ['react-hot', 'babel?presets[]=es2015,presets[]=react'],
            include: path.join(__dirname, 'app')
        }
        ]
    },
    plugins: [
        new webpack.NoErrorsPlugin()
    ]
};