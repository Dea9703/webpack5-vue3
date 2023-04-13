const baseConfig = require('./webpack.config')
const { merge } = require('webpack-merge')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')

module.exports = merge(baseConfig, {
  mode: 'production',
  plugins: [
    // 打包时清除旧的打包，只保留当前最新的打包
    new CleanWebpackPlugin(),
    // css压缩
    new CssMinimizerPlugin()
  ]
})
