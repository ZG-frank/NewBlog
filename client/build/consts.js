const path = require('path');

const ROOT_PATH  = path.resolve(__dirname, '../');
const APP_PATH   = path.resolve(ROOT_PATH, 'src');        // 应用根路径
const WEB_PUBLIC = path.resolve(ROOT_PATH, 'public');     // 公开资源
const BUILD_PATH = path.resolve(ROOT_PATH, 'dist');       // 发布文件所存放的目录

module.exports = {
    ROOT_PATH,
    APP_PATH,
    WEB_PUBLIC,
    BUILD_PATH
}