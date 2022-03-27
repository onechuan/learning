module.exports = {
    presets: [
        '@babel/preset-env',
        "@babel/preset-typescript" // 解析ts语法，在采用preset-env
    ],
    overrides: [{
        test: /\.vue$/,
        plugins: [ // ?
            '@babel/transform-typescript',
        ],
    }],
    env: {
        utils: {
            plugins: [ // ?
                [
                    'babel-plugin-module-resolver', // 为了能正确找到z-ui模块
                    { root: 'oc-ui' }
                ]
            ]
        }
    }
}