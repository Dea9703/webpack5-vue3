const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader/dist/index')
const { ProgressPlugin } = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')

const _resolve = src => path.resolve(__dirname, src)
const Plugins = [
  new HTMLWebpackPlugin({
    template: _resolve('index.html'), // 指定要使用的 html 模板地址
    filename: 'index.html', // 打包后输出的文件名
    title: '手搭 vue3 开发环境' // index.html 模板内，通过 <%= htmlWebpackPlugin.options.title %> 拿到变量
  }),
  new VueLoaderPlugin(),
  // 项目启动/打包进度条
  new ProgressPlugin()
  // 项目启动/打包可视化分析
  // new BundleAnalyzerPlugin()
]

function hasMiniCss() {
  // MiniCssExtractPlugin ---> 打包时抽离 css
  if (process.env.NODE_ENV === 'production') {
    Plugins.push(new MiniCssExtractPlugin({ filename: '[name][chunkhash:5].css' }))
  }
}
hasMiniCss()

module.exports = {
  entry: { main: _resolve('src/main.js') },
  output: {
    path: _resolve('dist'),
    filename: '[name][fullhash:5].bundle.js'
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
        test: /\.vue$/,
        use: 'vue-loader'
      },
      {
        test: /\.css$/,
        // use 后面跟数组，表示这个文件由多个 loader 去处理，处理顺序是由后到前
        use: [
          // MiniCssExtractPlugin.loader ---> 处理打包时抽离 css 使用 'style-loader' ---> 开发时使用
          process.env.NODE_ENV === 'production' ? MiniCssExtractPlugin.loader : 'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          process.env.NODE_ENV === 'production' ? MiniCssExtractPlugin.loader : 'style-loader',
          'css-loader',
          'sass-loader'
        ]
      }
    ]
  },
  plugins: Plugins
}
