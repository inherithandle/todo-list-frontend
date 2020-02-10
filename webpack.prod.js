'use strict'
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require('webpack')

module.exports = merge(common, {
  mode: 'production',
  // devtool: 'source-map',
})

// TODO: production server 세팅 후 PRODUCTION_URL로 변경하기
// const PRODUCTION_URL = 'https://gtchoi.todolist.com'
const PRODUCTION_URL = 'https://localhost:8181'
module.exports.plugins.push(new webpack.DefinePlugin({
  API_URL: JSON.stringify(PRODUCTION_URL)
}))