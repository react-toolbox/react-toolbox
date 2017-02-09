const path = require('path');
const express = require('express');
const webpack = require('webpack');
const internalIp = require('internal-ip');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('./webpack/webpack.config.dev');
const app = express();
const compiler = webpack(config);

const middleware = webpackDevMiddleware(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath,
  stats: {
    colors: true,
  },
});

app.use(middleware);
app.use(webpackHotMiddleware(compiler));
app.get('*', (req, res) => {
  res.send(middleware.fileSystem
    .readFileSync(path.join(compiler.outputPath, 'index.html'))
    .toString());
});

const port = 8080;
const ip = internalIp.v4();

app.listen(port, (err) => {
  if (err) {
    console.log(err);
    return;
  }

  console.log(' --------------------------------------');
  console.log(`    Local: http://0.0.0.0:${port}`);
  console.log(` External: http://${ip}:${port}`);
  console.log(' --------------------------------------');
});
