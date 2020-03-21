
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const Express = require('express');
const config = require('../config/app.js');
const webpackConfig = require('../config/webpack.dev');

const app = new (Express)();

/* Environment configuration constant */
const compiler = webpack(webpackConfig);

const serversOptions = compiler.options.plugins[4].definitions;
const dataServer = JSON.parse(serversOptions['process.env'].NODE_ENV.SERVER);
const dataENV = JSON.parse(serversOptions['process.env'].NODE_ENV.ENV);

process.env.NODE_ENV = {
  ENV: dataENV,
  SERVER: dataServer,
};

const port = dataServer.port || 3000;
const address = dataServer.address || 'localhost';

app.use(webpackDevMiddleware(compiler, {
  noInfo: true,
  publicPath: webpackConfig.output.publicPath,
}));
app.use(webpackHotMiddleware(compiler, {
  reload: true,
  log: console.log,
}));
app.use(Express.static(config.paths.assets));

app.set('address', address);
app.listen(port, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.info('==> Wep App server is listening on http://%s:%s/ in your browser.', address, port);
  }
});
