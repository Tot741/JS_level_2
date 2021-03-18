const { merge } = require('webpack-merge')
const base = require('./webpack.config')

module.exports = merge(base, {
    devServer: {
        contentBase: './',
        publicPath: '/js',
        host: 'localhost',
        port: 3000,
        hot: true,
    },
})