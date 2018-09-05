const path = require("path");
const webpack = require("webpack");
const webpackMerge = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");
// const FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin");
// const cssLoader = require("./loader/css-loader.js").dev;
// const notifier = require("node-notifier");

const baseConf = require("./base.js");
const MY_PATH = require("./consts");
console.log(MY_PATH.BUILD_PATH)

module.exports = { 
    mode: "development",
    entry: MY_PATH.APP_PATH,
    output: { 
        path: MY_PATH.BUILD_PATH,
        filename: '[name].[hash].js',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                // plugins: [
                //     ["import", { 
                //         "libraryName": "antd",
                //         "style": 'css'
                //     }]
                // ]
            },
            // {
            //     test: /\.js$/,
            //     enforce: "pre",
            //     include: MY_PATH.APP_PATH,
            //     exclude: [
            //         path.resolve(MY_PATH.ROOT_PATH, "node_modules"),
            //         path.resolve(MY_PATH.WEB_PUBLIC)
            //     ],
            //     // loader: ['babel-loader?cacheDirectory']
            //     loader: ["happypack/loader?id=happy-babel-js"]
            // },
            // {
            //     test: /\.(jpg|png|gif)$/,
            //     loader: ["file-loader", "url-loader?limit=100000"]
            // },
            // {
            //     test: /\.(eot|woff|svg|ttf|woff2|gif|appcache|webp)(\?|$)/,
            //     loader: [
            //         "file-loader?name=[name].[ext]",
            //         "url-loader?limit=100000"
            //     ]
            // },
            {
                test: /(\.less|\.css)$/,
                // use: [
                //     { loader : "style-loader" }, 
                //     { loader : "css-loader" }, 
                //     { loader : "less-loader" }, 
                //     {
                //         loader : "less-loader",
                //         options: {
                //             javascriptEnabled: true
                //         }
                //     }
                // ]
                use: ["style-loader", "css-loader", "less-loader"]
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(MY_PATH.WEB_PUBLIC, `./index.html`)
        })
    ],
    // optimization: {
    //     namedModules: true, // NamedModulesPlugin()
    //     splitChunks: { // CommonsChunkPlugin()
    //         name: 'vendor',
    //         minChunks: 2
    //     },
    //     noEmitOnErrors: true, // NoEmitOnErrorsPlugin
    //     concatenateModules: true //ModuleConcatenationPlugin
    // }
    devtool: 'cheap-module-source-map',
    target: 'web'
}