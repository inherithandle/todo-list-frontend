'use strict'
const path = require('path');
const { VueLoaderPlugin } = require('vue-loader')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack')

let GOOGLE_SIGNIN_REDIRECT_URI = {
  production: JSON.stringify('https://gtchoi-todolist.netlify.app/google-signin-callback'),
  development: JSON.stringify('http://localhost:8080/google-signin-callback')
}

let environment = process.env.NODE_ENV === 'production' ? 'production' : 'development';

module.exports = {
  entry: './src/app.js',
  output: {
    filename: 'js/[name].bundle.js',
    chunkFilename: '[name].bundle.js', // determines the name of non-entry chunk files. js.cookie.js
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },
  optimization: {
    splitChunks: {
      chunks: 'all'
    },
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        // use: ['style-loader', 'css-loader']
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
	  {
	    test: /\.vue$/,
        include: path.resolve(__dirname, 'src'),
		use: 'vue-loader'
	  }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
	new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      hash: true,
      title: 'Todo list',
      template: "src/html/index.html",
      filename: "index.html"
    }),
    new MiniCssExtractPlugin({
      filename: 'assets/css/[name].css',
      chunkFilename: 'assets/css/[id].css',
      hmr: process.env.NODE_ENV === 'development',
    }),
    new webpack.DefinePlugin({
      'GOOGLE_SIGNIN_REDIRECT_URI': GOOGLE_SIGNIN_REDIRECT_URI[environment]
    })
  ]
}
