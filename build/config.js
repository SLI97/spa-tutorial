//简单配置够用就好，完整的配置可以到vue全家桶中学习
const path = require('path')

let isdev = process.env.NODE_ENV == 'development' ? true : false

let config = {
    isdev: isdev,
    publicPath: '/',
    port: '3000'
}

module.exports = config
