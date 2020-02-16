'use strict'
const path = require('path');
const webpack = require('webpack')

module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
  output: {
    filename: 'test-bundle.js',
    path: path.resolve(__dirname, 'test-dist')
  }
}
