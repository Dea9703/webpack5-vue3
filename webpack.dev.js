const baseConfig = require('./webpack.config')
const { merge } = require('webpack-merge')
const webpack = require('webpack')
const EsLintPlugin = require('eslint-webpack-plugin')

module.exports = merge(baseConfig, {
  mode: 'development',
  // 开发模式常用 source map 模式
  devtool: 'eval-cheap-source-map',
  // 简化、美化 webpack 控制台输出
  stats: 'errors-warnings',
  // devServer: {
  //   // proxy 内可以有多组规则
  //   proxy: {
  //     '/api': {
  //       // 现在，对 /api/users 的请求会将请求代理到 http://localhost:3000/api/users
  //       target: 'http://localhost:8080',
  //       // 如果不希望传递/api，则需要重写路径：将冒号左边的路径改写为冒号右边的路径
  //       pathRewrite: { '^/api': '' },
  //       headers: {}
  //     },
  //     '/api1': {
  //       target: 'http://localhost:8080',
  //       // 路径重写，将冒号左边的请求地址改写为冒号右边的请求地址
  //       pathRewrite: { '^/api1': '/api' }
  //     },
  //     '/api2': {
  //       target: 'http://localhost:8080',
  //       // 路径重写，将冒号左边的请求地址改写为冒号右边的请求地址
  //       pathRewrite: { '^/api2': '/api' }
  //     }
  //   }
  // },
  plugins: [
    // 消除浏览器控制台工具警告
    new webpack.DefinePlugin({
      __VUE_OPTIONS_API__: false,
      __VUE_PROD_DEVTOOLS__: false
    }),
    // 项目代码校验
    new EsLintPlugin()
  ]
})
