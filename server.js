const webpack = require('webpack')
const webpackConfig = require('./build/webpack.config')
// const webpackConfig = require('./build/webpack.pro.config')
const webpackDevConfig = require('./build/webpack.dev.config')
//dev和hot用来实现前端的热加载
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const express = require('express')
const path = require('path')
const config = require('./build/config')
// const swig = require('swig')

const app = express()

// app.use(express.static(path.resolve(__dirname,"./dist")))

// const compiler = webpack(webpackConfig)//删除了打印的回调函数，加上的话这里会执行两遍打包，不晓得为啥

// ,function(err,stats){
//     if(err) throw err
//     //输出打包信息（不用在意这些细节）
//      process.stdout.write(stats.toString({
//          colors: true,
//          modules: false,
//          children: false,
//          chunks: false,
//          chunkModules: false
//      }) + '\n\n')
//     }


if (config.isdev) {
    console.log('server运行在开发环境')
    const compiler = webpack(webpackDevConfig)

    app.use(webpackDevMiddleware(compiler, {
        // public path should be the same with webpack config
        publicPath: webpackDevConfig.output.publicPath,
        stats: {
            colors: true
        }
    }))


    app.use(webpackHotMiddleware(compiler))

} else {
    console.log('server运行在生产环境')

    webpack(webpackConfig, function (err, stats) {
        if (err) throw err
        //输出打包信息（这里又可以用了）
        process.stdout.write(stats.toString({
            colors: true,
            modules: false,
            children: false,
            chunks: false,
            chunkModules: false
        }) + '\n\n')
        app.use(express.static(path.resolve(__dirname, './dist')))

    })
}


// app.use(webpackHotMiddleware(compiler))

const port = 3030
app.listen(3030, function () {
    console.log('App  is now running on port ' + port);
})
