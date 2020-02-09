'use strict'
const path = require('path');
const { VueLoaderPlugin } = require('vue-loader')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')

module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
  entry: './src/app.js',
  output: {
    filename: 'js/[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  devServer: {
    contentBase: './dist',
    index: '/html/index.html',
    historyApiFallback: {
      index: '/html/index.html'
    }
  },
  module: {
    rules: [
      {
        test: /\.(scss)$/,
        include: path.resolve(__dirname, 'src/scss'),
        use: [
          {
            // Adds CSS to the DOM by injecting a `<style>` tag
            loader: 'style-loader'
          },
          {
            // Interprets `@import` and `url()` like `import/require()` and will resolve them
            loader: 'css-loader'
          },
          {
            // Loader for webpack to process CSS with PostCSS
            loader: 'postcss-loader',
            options: {
              plugins: function () {
                return [
                  require('autoprefixer')
                ];
              }
            }
          },
          {
            // Loads a SASS/SCSS file and compiles it to CSS
            loader: 'sass-loader'
          }
        ]
      },
      {
        test: /\.(jpe?g|png|gif)$/i, // jquery datepicker가 png를 사용하고 있음. jquery 제가할때 같이 제거.
        loader:"file-loader",
        options:{
          name:'[name].[ext]',
          outputPath:'assets/images/'
          //the images will be emited to dist/assets/images/ folder
        }
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader']
      },
	  {
	    test: /\.vue$/,
        include: path.resolve(__dirname, 'src'),
		use: 'vue-loader'
	  }
    ]
  },
  plugins: [
	new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      hash: true,
      title: 'Todo list',
      template: "src/html/index.html",
      filename: "html/index.html"
    }),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery'",
      "window.$": "jquery"
    })
  ]
}

const PRODUCTION_URL = 'https://gtchoi.todolist.com'
const DEV_URL = 'http://localhost:8181'

if (process.env.NODE_ENV == 'production') {
  module.exports.plugins.push(new webpack.DefinePlugin({
    API_URL: JSON.stringify(DEV_URL) // TODO: production server 세팅 후 PRODUCTION_URL로 변경하기
  }))
} else if (process.env.NODE_ENV == 'development') {
  module.exports.plugins.push(new webpack.DefinePlugin({
    API_URL: JSON.stringify(DEV_URL)
  }))
}