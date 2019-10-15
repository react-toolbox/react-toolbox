const path = require('path');
const express = require('express');
const webpack = require('webpack');
const internalIp = require('internal-ip');
const config = require('./webpack/webpack.config.dev');

const app = express();
const compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath,
  stats: {
    colors: true,
  },
}));

app.use(require('webpack-hot-middleware')(compiler, {
  path: '/__webpack_hmr',
  heartbeat: 20000,
}));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './spec/index.html'));
});

const port = 8080;

app.listen(port, (err) => {
  if (err) {
    console.log(err);
    return;
  }

  internalIp.v4().then(ip => {
    console.log(' --------------------------------------');
    console.log(`    Local: http://0.0.0.0:${port}`);
    console.log(` External: http://${ip}:${port}`);
    console.log(' --------------------------------------');
  })
});
