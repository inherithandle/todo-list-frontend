'use strict'
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const TerserJSPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');

module.exports = merge(common, {
  mode: 'production',
  optimization: {
    minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
  },
  plugins: [
    new CopyPlugin([
      { from: 'src/docs/_redirects', to: '' }
    ]),
    new webpack.DefinePlugin({
      'GOOGLE_SIGNIN_REDIRECT_URL': JSON.stringify('https://gtchoi-todolist.netlify.app/google-signin-callback')
    })
  ]
  // devtool: 'source-map',
})
