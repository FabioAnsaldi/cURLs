
const path = require('path');
const glob = require('glob');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const config = require('./app.js');

module.exports = {
  entry: [
    path.join(process.cwd(), `${config.paths.source}/index.jsx`)
  ].concat(glob.sync(path.join(process.cwd(), `${config.paths.source}/styles/*.scss`))),
  output: {
    path: path.join(process.cwd(), config.paths.build),
    filename: config.paths.bundle,
    publicPath: config.paths.publicPath,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(process.cwd(), `${config.paths.source}/index.html`),
      inject: 'body',
    }),
    new CopyPlugin([{
      from: path.join('node_modules/xel/themes/material.css'),
      to: path.join(config.paths.assets),
    }, {
      from: path.join('node_modules/xel/xel.min.js'),
      to: path.join(config.paths.assets),
    }]),
    new ExtractTextPlugin('styles.min.css'),
  ],
  module: {
    rules: [{
      test: /\.(jpe?g|gif|png|svg|ico)$/,
      use: [{
        loader: 'file-loader',
      }],
    }, {
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      use: [{
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015'],
        },
      }],
    }, {
      test: /\.scss$/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: [{
          loader: 'css-loader?-url',
          options: {
            sourceMap: true,
          },
        }, 'sass-loader'],
      }),
    }],
  },
};
