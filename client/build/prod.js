const MY_PATH = require('./consts');
const devConfig = require('./dev');
const webpack = require('webpack');
const baseConfig = require("./base.js");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    ...baseConfig, 
    mode: 'production',
    output: {
        ...baseConfig.output, 
        path: MY_PATH.BUILD_PATH,
        filename: '[name].[hash].js',
        chunkFilename: "[name].[chunkhash].js",
    },
    module: {
        rules: [
            ...baseConfig.module.rules,
            {
                test: /(\.less|\.css)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'less-loader',
                ],
            },
        ]
    },
    plugins: [
        ...baseConfig.plugins,
        new MiniCssExtractPlugin({
            //提取为外部css代码
            filename: '[name].[hash].css',
            chunkFilename: '[id].[hash].css'
        }),
    ],
    devtool: 'none'
}