const path = require("path");
const MY_PATH = require("./consts");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const SizePlugin = require('size-plugin');

module.exports = { 
    entry: {
        main: MY_PATH.APP_PATH
    },
    output: { 
        path: MY_PATH.BUILD_PATH,
        filename: 'js/[name].js',
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                include: MY_PATH.APP_PATH,
                exclude: /node_modules/,
                loader: 'babel-loader?cacheDirectory=true'
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    outputPath: 'images'
                }
            },
            {
                test: /\.(woff|woff2|ttf|eot)(\?[tv]=[\d.]+)*$/,
                use: ['file-loader?name=[name].[ext]']
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'index.html',
            inject: true,
            favicon: path.resolve('favicon.ico'),
            minify: {
                collapseWhitespace: true,
            }
        }),
        new webpack.HashedModuleIdsPlugin(),
        new SizePlugin()
    ],
    resolve: {
        modules: [
            MY_PATH.APP_PATH,
            'node_modules',
        ],
        alias: {
            '@': MY_PATH.APP_PATH
        },
        extensions: ['*', '.js', '.jsx', '.json', '.less', '.css']
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all'
                },
                // styles: {
                //     name: 'index',
                //     test: /.stylus|css$/,
                //     chunks: 'all',
                //     enforce: true
                // }
            }
        }
    }
}
