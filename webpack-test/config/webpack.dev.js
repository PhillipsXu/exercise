const os = require("os"); // node.js核心模块
const path = require("path"); // node.js核心模块，用于处理路径问题
const ESLintPlugin = require('eslint-webpack-plugin'); // 引入eslint插件
const HtmlWebpackPlugin = require('html-webpack-plugin');
const threads = os.cpus().length // cpu核数

module.exports = {
    // 入口 相对路径
    entry: './src/main.js',
    // 输出
    output: {
        // 输出路径 开发模式不输出
        path: undefined,
        // 输出名称
        filename: "js/main.js",
        // 打包时自动清空path
        // clean: true 开发模式没有输出，不需要clean
    },
    // 加载器
    module: {
        rules: [
            // loader的配置
            {
                oneOf: [ // 每个文件只能被其中一个配置处理，提升效率
                    {
                        test: /\.css$/, // 只检测css结尾文件
                        // 执行顺序 从右到左
                        use: [
                            'style-loader',
                            'css-loader'
                        ]
                    },
                    {
                        test: /\.less$/,
                        use: [
                            "style-loader",
                            "css-loader",
                            "less-loader"
                        ]
                    },
                    {
                        test: /\.s[a|c]ss$/,
                        use: [
                            "style-loader",
                            "css-loader",
                            "sass-loader"
                        ]
                    },
                    {
                        test: /\.styl$/,
                        use: [
                            "style-loader",
                            "css-loader",
                            "stylus-loader"
                        ]
                    },
                    {
                        test: /\.(png|jpe?g|gif|webp|svg)$/,
                        type: 'asset',
                        parser: {
                            dataUrlCondition: {
                                // 将小于50kb的图片转换为base64
                                // 优点：减少服务器请求 缺点：体积会变大
                                maxSize: 50 * 1024 //50kb
                            }
                        },
                        generator: {
                            // 输出图片名称 [hash:10]只取十位
                            filename: "static/images/[hash:10][ext][query]"
                        }
                    },
                    {
                        test: /\.(ttf|woff2?|mp3|mp4|avi|mov|rmvb|flv|mkv) $/,
                        type: "asset/resource",
                        generator: {
                            // 输出文件名称 [hash:10]只取十位
                            filename: "static/media/[hash:10][ext][query]"
                        }
                    },
                    {
                        test: /\.js$/,
                        // exclude: /node_modules/, // 排除node_modules中的文件
                        include: path.resolve(__dirname, '../src'), // 只处理src中的文件
                        use: [
                            {
                                loader: "thread-loader", // 开启多进程
                                options: {
                                    works: threads // 进程数量
                                }
                            },
                            {
                                loader: "babel-loader",
                                options: {
                                    // presets: ['@babel/preset-env']
                                    cacheDirectory: true, // 开启babel缓存
                                    cacheCompression: false, // 关闭缓存文件压缩
                                    plugins: ["@babel/plugin-transform-runtime"] // 减少代码体积
                                }
                            }
                        ]
                    },
                    {
                        test: /\.tsx?$/,
                        include: path.resolve(__dirname, '../src'),
                        use: ["babel-loader", "ts-loader"]
                    }
                ]
            }
        ]
    },
    // 插件
    plugins: [
        new ESLintPlugin({
            // 指定需要检测的文件的位置
            context: path.resolve(__dirname, "../src"),
            exclude: "node_modules",
            cache: true
        }),
        new HtmlWebpackPlugin({
            // 模版：在public中创建新的index.html
            // 结构与原来一致，并自动引入main.js
            template: path.resolve(__dirname, "../public/index.html")
        })
    ],
    // 开发服务器: 不输出资源-dist中不会有文件
    devServer: {
        host: "localhost",
        port: "3000",
        open: true, // 是否自动打开服务器（浏览器）
        hot: true // 开启HMR(默认）
    },
    // 模式
    mode: "development",
    devtool: "cheap-module-source-map"
}