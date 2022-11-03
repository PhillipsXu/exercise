const os = require("os"); // node.js核心模块
const path = require("path"); // node.js核心模块，用于处理路径问题
const ESLintPlugin = require('eslint-webpack-plugin'); // 引入eslint插件
const HtmlWebpackPlugin = require('html-webpack-plugin'); // 自动引入main.js
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); // 单独打包css文件
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin"); // css压缩
const threads = os.cpus().length; // cpu核数
const TerserWebpackPlugin = require("terser-webpack-plugin"); // 多线程打包
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin"); // 图片压缩

function getStyleLoader(pre) {
    return [
        MiniCssExtractPlugin.loader,
        "css-loader",
        {
            loader: "postcss-loader",
            options: {
                postcssOptions: {
                    plugins: [
                        "postcss-preset-env"
                    ]
                }
            }
        },
        pre
    ].filter(Boolean)
}

module.exports = {
    // 入口 相对路径
    entry: './src/main.js',
    // 输出
    output: {
        // 输出路径
        path: path.resolve(__dirname, "../dist"),
        // 输出名称
        filename: "js/main.js",
        // 打包时自动清空path
        clean: true
    },
    // 加载器
    module: {
        rules: [
            // loader的配置
            {
                oneOf: [ // 每个文件只能被其中一个配置处理，提升效率
                    {
                        test: /\.css$/, // 只检测css结尾文件
                        use: getStyleLoader()
                    },
                    {
                        test: /\.less$/,
                        use: getStyleLoader('less-loader')
                    },
                    {
                        test: /\.s[a|c]ss$/,
                        use: getStyleLoader('sass-loader')
                    },
                    {
                        test: /\.styl$/,
                        use: getStyleLoader('stylus-loader')
                    },
                    {
                        test: /\.(png|jpe?g|gif|webp|svg)$/,
                        type: 'asset',
                        parser: {
                            dataUrlCondition: {
                                // 将小于10kb的图片转换为base64
                                // 优点：减少服务器请求 缺点：体积会变大
                                maxSize: 10 * 1024 //10kb
                            }
                        },
                        generator: {
                            // 输出图片名称 [hash:10]只取十位
                            filename: "static/images/[hash:10][ext][query]"
                        }
                    },
                    {
                        test: /\.(ttf|woff2?|mp3|mp4|avi|mov|rmvb|flv|mkv)$/,
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
            cache: true, // 开启缓存
            cacheLocation: path.resolve(__dirname, '../node_modules/.cache/eslintcache'),
            threads // 开启多进程和进程数量
        }),
        new HtmlWebpackPlugin({
            // 模版：在public中创建新的index.html
            // 结构与原来一致，并自动引入main.js
            template: path.resolve(__dirname, "../public/index.html")
        }),
        new MiniCssExtractPlugin({
            filename: 'static/css/main.css'
        })
    ],
    optimization: {
        // 压缩插件推荐位置
        minimizer: [
            // 压缩css
            new CssMinimizerPlugin(),
            // 压缩js
            new TerserWebpackPlugin({
                parallel: threads // 开启多进程和进程数量
            }),
            new ImageMinimizerPlugin({
                minimizer: {
                    implementation: ImageMinimizerPlugin.imageminGenerate,
                    options: {
                        plugins: [
                            ["gifsicle", { interlaced: true }],
                            ["jpegtran", { progressive: true }],
                            ["optipng", { optimizationLevel: 5 }],
                            [
                                "svgo",
                                {
                                    plugins: [
                                        "preset-default",
                                        "prefixIds",
                                        {
                                            name: "sortAttrs",
                                            params: {
                                                xmlnsOrder: "alphabetical",
                                            }
                                        }
                                    ]
                                }
                            ]
                        ]
                    }
                }
            })
        ]
    },
    resolve: {
        extensions: [".ts", ".js"]
    },
    // 模式
    mode: "production",
    devtool: "source-map",
    performance: {
        hints: 'warning', // 枚举 false关闭
        maxEntrypointSize: 100000000, // 最大入口文件大小
        maxAssetSize: 100000000, // 最大资源文件大小
        assetFilter: function (assetFilename) { //只给出js文件的性能提示
            return assetFilename.endsWith('.js');
        }
    }
}