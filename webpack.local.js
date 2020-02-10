'use strict'
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
    index: '/html/index.html',
    historyApiFallback: {
      index: '/html/index.html'
    }
  }
})