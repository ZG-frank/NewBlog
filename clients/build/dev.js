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
    entry:  
    // './src/app.js',
    // path.resolve(MY_PATH.WEB_PUBLIC, `./index.html`)
    MY_PATH.APP_PATH,
    output: { 
        path: MY_PATH.BUILD_PATH,
        filename: "person.ok.js",
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query:{
                    presets:["env"]
                }
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
                test: /\.css$/,
                 use: 'css-loader' 
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
}

baseConf.mode = "development";
baseConf.plugins.push(
    // new FriendlyErrorsWebpackPlugin({
    //     clearConsole: true,
    //     onErrors: function(severity, errors) {
    //         if (severity !== "error") return;

    //         const error = errors[0];
    //         const filename = error.file && error.file.split("!").pop();

    //         notifier.notify({
    //             title: "构建出错啦",
    //             message: severity + ": " + error.name,
    //             subtitle: filename || "",
    //             icon: path.join(__dirname, "icon.png")
    //         });
    //     }
    // }),
    // new webpack.SourceMapDevToolPlugin({
    //     filename: "[file].map",
    //     columns: false
    // }),
    // new webpack.HotModuleReplacementPlugin() // 开启全局的模块热替换(HMR)
);

const htmlPlugs = [];
// function loadHtmlPlugs() {
//     const appConfs = require(path.resolve(
//         MY_PATH.APP_PATH,
//         "config/defaultApps"
//     ));
//     for (var i = 0; i < appConfs.length; i++) {
//         const app = appConfs[i];
//         if (app.enable) {
//             const tmp = path.resolve(
//                 MY_PATH.WEB_PUBLIC,
//                 `${app.id}/index.html`
//             );
//             htmlPlugs.push(
//                 new HtmlWebpackPlugin({
//                     filename: app.filename,
//                     template: tmp,
//                     inject: "body",
//                     chunks: [app.id, "manifest"],
//                     showErrors: true,
//                     hash: true
//                 })
//             );
//         }
//     }
// }

// loadHtmlPlugs();

const devServer = {
    hot: true, // 开启服务器的模块热替换
    host: "localhost",
    port: 8080,
    historyApiFallback: true,   
    disableHostCheck: true,
    quiet: true,
    proxy: {
        "/api/": {
            target: "localhost:3000",
            changeOrigin: true,
            secure: false,
        }
    },
    stats: {
        colors: true,
        "errors-only": true,
        cached: true
    },
    contentBase: baseConf.output.path,
    publicPath: baseConf.output.publicPath
};

const merged = function(env) {
    return webpackMerge(baseConf, {
        devtool: "cheap-module-eval-source-map", //
        devServer: devServer,
        plugins: [new HtmlWebpackPlugin({
            filename: "test",
            template: path.resolve(
                MY_PATH.WEB_PUBLIC,
                `/index.html`
            ),
            inject: "body",
            chunks: ["main", "manifest"],
            showErrors: true,
            hash: true
        })],
        module: {
            // rules: [...cssLoader]
        }
    });
};

// module.exports = merged;
