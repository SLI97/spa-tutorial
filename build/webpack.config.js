const VueLoaderPlugin = require('vue-loader/lib/plugin')
const path = require('path')
const webpack = require('webpack')
const htmlWebpackPlugin = require('html-webpack-plugin')
//增加页面热加载字段，添加到entry中（固定写法）
const hotMiddlewareScript = 'webpack-hot-middleware/client?reload=true'

let isdev = process.env.NODE_ENV == 'development' ? true : false

module.exports = {
    mode: 'none',
    entry: {
        //就是这样写就对 了
        main: [path.resolve(__dirname, '../src/main.js'), hotMiddlewareScript]
    },
    output: {
        path: path.resolve(__dirname, '../dist'),
        publicPath: '/',
        filename: '[name][chunkhash].js'
    },
    module: {
        rules: [{
            test: /\.vue$/,
            loader: 'vue-loader',
            options: {
                loaders: {
                    'scss': [
                        'vue-style-loader',
                        'css-loader',
                        'less-loader'
                    ]
                }
            }
        }, {
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: /node_modules/
        },]
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js'
        },
        extensions: ['*', '.js', '.vue', '.json']
    },
    //新增html插件，生成main.js的同时生成index.htmlF
    plugins: [
        new VueLoaderPlugin(),
        new htmlWebpackPlugin({
            template: './public/index.html',
            title: '我是SPA',
            url: './',
            favicon: path.resolve('./public/favicon.ico'),
            minify: {
                collapseInlineTagWhitespace: true,   //折叠空白区域
                removeComments: true,   //删除注释
                hash: true,    //是否需要对src引的文件后面加上Hash，使用时需要区分开发环境和生产环境

            }
        }),
        //热加载需要使用这个插件才起作用
        new webpack.HotModuleReplacementPlugin(),
    ]
}
