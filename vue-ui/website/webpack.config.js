const HtmlWebpackPlugin = require("html-webpack-plugin")
const {VueLoaderPlugin} = require("vue-loader")
const {resolve} = require("path")

module.exports = {
    mode:"development",
    devtool:"source-map",
    entry:resolve(__dirname, "main.ts"),
    output:{
        path:resolve(__dirname,"../website-dist"),
        filename:"bundle.js"
    },
    resolve:{
        // 解析模块 对应的拓展名有哪些，优先级是从左到右 依次降低
        extensions:[".ts",".tsx",".js",".vue"]
    },
    module:{
        rules:[
            {
                test:/\.(ts|js)x?$/,
                exclude:/node_modules/,
                use:"babel-loader"
            },
            {
                test:/\.vue$/,
                use:"vue-loader"
            },
            {
                test:/\.(svg|otf|ttf|woff|woff2|eot|gif|png)$/,
                use:"url-loader"
            },
            {
                test:/\.(scss|css)/,
                use:[
                    "style-loader",
                    "css-loader",
                    "sass-loader"
                ]
            }
        ]
    },
    plugins:[
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            template: resolve(__dirname,"index.html")
        })
    ]
}