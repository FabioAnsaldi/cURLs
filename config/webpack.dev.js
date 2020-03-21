
const webpack = require('webpack');
const merge = require('webpack-merge');
const config = require('./app.js');
const common = require('./webpack.common.js');

const serverConfig = { address: config.server.address, port: config.server.port };

module.exports = merge(common, {
  devtool: 'cheap-module-source-map',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: {
          ENV: '"development"',
          SERVER: JSON.stringify(serverConfig),
        },
      },
    }),
  ],
});
