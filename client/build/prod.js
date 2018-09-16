const MY_PATH = require('./consts');
const devConfig = require('./dev');
const webpack = require('webpack');
const baseConfig = require("./base.js");

module.exports = {
    ...baseConfig, 
    mode: 'production',
    output: {
        ...baseConfig.output, 
        path: MY_PATH.BUILD_PATH,
        filename: '[name].[chunkhash].js'
    },
    // module: {
    //     rules: [...devConfig.module.rules]
    // },
    plugins: [
        ...baseConfig.plugins,
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        })
    ],
    devtool: 'none'
}