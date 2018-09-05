const MY_PATH = require('./consts');
const devConfig = require('./dev');

module.exports = {...devConfig, 
    mode: 'production',
    entry: {
        bundle: './src/index.js',
    },
    output: {...devConfig.output, 
        filename: '[name].[chunkhash].js',
        publicPath: MY_PATH.BUILD_PATH,
    },
    module: {
        rules: [...devConfig.module.rules]
    },
    devtool: 'none'
}