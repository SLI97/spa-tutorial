const VueLoaderPlugin = require('vue-loader/lib/plugin')
const path = require('path')
const webpack = require('webpack')
const htmlPlugin = require('html-webpack-plugin')
//新增通用配置文件
const config = require('./config')
//增加页面热加载字段，添加到entry中（固定写法）
//新增文件清除插件
// const hotMiddlewareScript = 'webpack-hot-middleware/client?reload=true'
//新增文件清除插件
const cleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = {
    mode: 'development',
    entry: {
        //取消热加载
        main: path.resolve(__dirname, '../src/main.js')//取消热加载
    },
    output: {
        path: path.resolve(__dirname, '../dist'),
        publicPath: config.publicPath,
        filename: '[name].js'
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
            'vue$': 'vue/dist/vue.min.js'
        },
        extensions: ['*', '.js', '.vue', '.json']
    },
    //新增html插件，生成main.js的同时生成index.htmlF
    plugins: [
        //删除热加载
        //new webpack.HotModuleReplacementPlugin(),
        //删除html模板（后面会解释)
        //new htmlPlugin({
        //        template:'index.html'
        //    }),
        //增加dist删除选项
        // new cleanWebpackPlugin(['dist'], {
        //     "root": path.resolve(__dirname, '../'),
        // })
    ]
}   