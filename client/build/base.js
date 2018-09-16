const path = require("path");
const MY_PATH = require("./consts");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const devMode = process.env.NODE_ENV !== 'production';

console.log(process.env.NODE_ENV,devMode)

module.exports = { 
    entry: {
        main: MY_PATH.APP_PATH,
        // vendors: [
        //     "antd",
        //     // "prop-types",
        //     "react",
        //     "react-dom",
        //     // "react-redux",
        //     // "react-router-dom",
        //     // "react-router-redux",
        //     // "redux"
        // ] //分离第三方库,可自定义增减
    },
    output: { 
        path: MY_PATH.BUILD_PATH,
        filename: '[name].[hash].js',
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
                use: [
                    devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
                    'css-loader',
                    'less-loader',
                ],
                // use: ["style-loader", "css-loader", "less-loader"]
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
            // }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            //提取为外部css代码
            filename: devMode ? '[name].css' : '[name].[hash].css',
            chunkFilename: devMode ? '[id].css' : '[id].[hash].css',
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(MY_PATH.WEB_PUBLIC, 'index.html')
        }),
        new CleanWebpackPlugin(['dist'], {
            // Default: webpack位置所在的文件夹
            root: MY_PATH.ROOT_PATH,
        }),
        
    ],
    resolve: {
        alias: {}
    }
}
