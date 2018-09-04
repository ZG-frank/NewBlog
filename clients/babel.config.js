const presets = [
    ["@babel/env", {
        targets: {
            "browsers": ["last 2 versions", "safari >= 7"]
        },
        useBuiltIns: "usage"
    }],
    ["@babel/preset-react"]
  ];
  
  module.exports = { presets };