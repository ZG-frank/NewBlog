const path = require("path");

const baseConfig = require("./base.js");
const MY_PATH = require("./consts");

module.exports = { 
    ...baseConfig,
    mode: "development",
    devtool: 'cheap-module-eval-source-map',
    target: 'web',
    module: {
        rules: [
            ...baseConfig.module.rules,
            {
                test: /(\.less|\.css)$/,
                use: [
                    { loader : "style-loader" }, 
                    { loader : "css-loader" }, 
                    { 
                        loader : "less-loader",
                        options: {
                            javascriptEnabled: true
                        }
                    }
                ]
            },
        ]
    },
    devServer: {
        historyApiFallback: true,
        // color: true
    }
}