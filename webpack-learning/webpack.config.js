const {resolve} = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
// const webpack = require("webpack")

//设置--mode 在配置文件中拿不到NODE_ENV 命令行的配置高于配置文件
// 设置--env在配置文件和模块中获取不到
// cross-env可以实现跨平台配置环境变量，webpack配置文件可以访问

// 一般而言，index.html文件放在自己的服务器上，不开启缓存，进行实时更新
// index.html引用的静态文件，js css要加hash值，存放到cdn上进行长期缓存，提高加载效率

module.exports = ()=>{
    // 设置--env可以使用
    return {
    /**
     *  mode模式：日常开发会有两套模式，开发和生产
        开发时将构建结果用于本地开发调试，不尽兴代码压缩，打印debug信息，包含sourcemap文件
        生产时，是压缩后的代码，运行是不打印debug信息，静态文件不包含sourcemap 回压缩html、css、js代码
        指定mode为production时，默认会启用各种性能优化功能，包括构建结果优化以及webpack运行性能优化
        指定mode为development时，则会启用debug工具，运行时打印详细错误信息，以及更加快速的增量编译构建
     *  
     */
    /**
     *   区分环境
     *  --mode 用于设置模块内的process.env.NODE_ENV
     *  --env 用于设置webpack配置文件的函数参数
     *  cross-env 用于设置node环境的process.env.NODE_ENV
     *  DefinePlugin用于设置模块内的全局变量
     */
        // target:"node",//编译的目标环境
        mode:process.env.NODE_ENV === "development" ? "development" : "production",
        devtool:"inline-source-map",
        entry:"./src/index.js",
        output:{
            path: resolve(__dirname, "dist"),
            filename: "index.js",
            // 打包之后，会通过网络传递到另外一个文件
            // publicPath:"/static"
        },
        // devServer会启动一个Http开发服务器，把一个文件夹作为静态根目录
        // 为了提高性能，使用的是内存文件系统
        devServer:{
            // 热更新
            hot:true,
            // contentBase配置额外的静态文件根目录，dist不用配置
            // contentBase:resolve(__dirname,"public"),
            static: resolve(__dirname,"dist"),
            compress:true,//是否启动压缩
            port:"8081",
            // 如果指定此选项，会把打开后的文件写入硬盘一份
            // writeToDisk:true,
            open:true,//自动打开浏览器
            
        },
        // loader加载器 可以将非JSON和JS文件编译成JS或JSON文件
        module:{
            rules:[{
                test:/\.txt$/,
                use: "raw-loader"
            },{
                test:/\.css$/,
                use:["style-loader","css-loader"]
            },{
                test:/\.scss$/,
                use:["style-loader","css-loader","sass-loader"]
            },{
                test:/\.jsx$/,
                loader:"eslint-loader",
                // 写了use不能写options loader:"eslint-loader"等价于use:["eslint-loader"]
                enforce:"pre",//pre 前置 normal 正常 inline 内联 post 后置
                options:{
                    fix:true//自动修复
                },
                exclude:/node_modules/
            },{
                test:/\.jsx$/,
                exclude:/node_modules/,
                use:{
                    loader:"babel-loader",
                    // 对于node_modules里面的模块进行排除，不需要进行代码检查
                    options:{
                        // 预设
                        presets:["@babel/preset-env"],
                        // 补充
                        plugins:[
                            ["@babel/plugin-proposal-decorators",{legacy:true}],//legacy旧的
                            ["@babel/plugin-proposal-class-properties",{loose:true}]//loose松散的
                        ]
                    }
                }
            }]
        },
        // plugins插件用于执行范围更广的任务：打包优化、资源管理、注入环境变量等
        // 插件可以插入webpack打包过程
        plugins:[
            new HtmlWebpackPlugin({
                template:"./src/index.html",
                // filename:"index.html"
            }),
            // 定义全局变量的插件
            // new webpack.DefinePlugin({
            //     "NODE_ENV":JSON.stringify(isProduction?"production":"development")
            // })
        ]
    }
}

/**
 * 浏览器兼容性
 * webpack支持所有复核es6标准的浏览器
 * webpack的import()和require.ensure()需要Promise。如果想要支持旧版本浏览器，在使用这些表达式之前，还需要提前加载ployfill
 * 
 * 
 * 分包
 * 把一个大仓库尽可能拆分成不同的小仓库，不同的模块lerna
 * webpack webpack-cli webpack-dev-server不会轻易混合在一起
 */

/**
 * 支持css
 * css-loader用于翻译处理@import和url()
 * style-loader可以将css插入到DOM中
 */