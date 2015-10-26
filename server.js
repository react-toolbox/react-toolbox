const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('./webpack.config.development');
const devServer = {
  host: '0.0.0.0',
  port: 8080,
  inline: true
};

new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  historyApiFallback: false,
  hot: true,
  stats: {
    colors: true
  }
}).listen(devServer.port, devServer.host, (err) => {
  if (err) console.error(err);
  console.log(`Listening at ${devServer.host}:${devServer.port}`);
  console.log(`open http://${devServer.host}:${devServer.port}/spec/`);
});
