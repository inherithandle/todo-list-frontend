'use strict'
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require('webpack')

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

const DEV_URL = 'http://localhost:8181'
module.exports.plugins.push(new webpack.DefinePlugin({
  API_URL: JSON.stringify(DEV_URL)
}))