'use strict'
const path = require('path');
const { VueLoaderPlugin } = require('vue-loader')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const webpack = require('webpack')

module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
  entry: './src/js/app.js',
  output: {
    filename: 'js/[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.(scss)$/,
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
		use: 'vue-loader'
	  }
    ]
  },
  plugins: [
	new VueLoaderPlugin(),
	new CopyPlugin([
	  { from: 'src/html', to: './html' }
	]),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery'",
      "window.$": "jquery"
    })
  ]
}

if (process.env.NODE_ENV == 'production') {
  module.exports.plugins.push(new webpack.DefinePlugin({
    API_URL: JSON.stringify('https://gtchoi.todolist.com')
  }))
} else if (process.env.NODE_ENV == 'development') {
  module.exports.plugins.push(new webpack.DefinePlugin({
    API_URL: JSON.stringify('http://localhost:8181')
  }))
}