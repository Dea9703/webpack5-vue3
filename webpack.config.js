const path = require('path')
const webpack = require('webpack')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader/dist/index')
const EsLintPlugin = require('eslint-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const { ProgressPlugin } = require('webpack')

const _resolve = src => path.resolve(__dirname, src)

module.exports = {
  mode: 'development',
  entry: { main: _resolve('src/main.js') },
  output: {
    path: _resolve('dist'),
    filename: '[name][hash:5].bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [ [
              '@babel/preset-env',
              {
                targets: {
                  browsers: [
                    '>1%', // 占有率大于 1% 的浏览器
                    'last 2 versions', // 浏览器最新的两个版本
                    'not ie <= 8' // 不支持 ie8 及以下的浏览器
                  ]
                }
              }
            ] ]
          }
        }
      },
      {
        test: /\.css$/,
        // use 后面跟数组，表示这个文件由多个 loader 去处理，处理顺序是由后到前
        use: [ 'style-loader', 'css-loader' ]
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // 将 JS 字符串生成为 style 节点
          'style-loader',
          // 将 CSS 转化成 CommonJS 模块
          'css-loader',
          // 将 Sass 编译成 CSS
          'sass-loader'
        ]
      },
      {
        test: /\.vue$/,
        use: 'vue-loader'
      }
    ]
  },
  plugins: [
    // 消除浏览器控制台工具警告
    new webpack.DefinePlugin({
      __VUE_OPTIONS_API__: false,
      __VUE_PROD_DEVTOOLS__: false
    }),
    new ProgressPlugin(),
    new HTMLWebpackPlugin({
      template: _resolve('index.html'), // 指定要使用的 html 模板地址
      filename: 'index.html', // 打包后输出的文件名
      title: '手搭 vue3 开发环境' // index.html 模板内，通过 <%= htmlWebpackPlugin.options.title %> 拿到变量
    }),
    new VueLoaderPlugin(),
    new EsLintPlugin(),
    // 打包时清除旧的打包，只保留当前最新的打包
    new CleanWebpackPlugin()
  ],
  stats: 'errors-warnings'
}
