const presets = [
    ["@babel/env", {
        targets: {
            browsers: ["last 2 versions", "safari >= 7"]
        },
        modules: false
    }],
    ["@babel/react"]
  ];

const plugins = [
    ["import", { libraryName: 'antd', style: true }],
    ["@babel/plugin-proposal-class-properties"],
    ["@babel/plugin-proposal-decorators", { legacy: true }],
    ["@babel/plugin-syntax-dynamic-import"]
];
  
module.exports = { presets, plugins };