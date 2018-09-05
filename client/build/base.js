var path = require("path");
const MY_PATH = require("./consts");

module.exports = { 
    entry: 
    //  '/src/index.js',
    MY_PATH.APP_PATH,
    output: { 
        path: MY_PATH.BUILD_PATH,
        chunkFilename: "[name].[hash].js",
        filename: "[name].[hash].js",
        sourceMapFilename: "[name].map",
        publicPath: "/"
    },
    module: {
        rules: [
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
    plugins: []
}
