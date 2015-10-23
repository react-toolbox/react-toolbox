const webpackConfig = require('./webpack.config.test');

module.exports = function (config) {
  config.set({
    browsers: ['PhantomJS'],
    singleRun: true,
    frameworks: ['mocha'],
    files: [
      './node_modules/phantomjs-polyfill/bind-polyfill.js',
      './node_modules/babel-core/browser-polyfill.js',
      'tests.webpack.js'
    ],
    reporters: ['dots'],
    preprocessors: {'tests.webpack.js': ['webpack']},
    webpack: webpackConfig,
    webpackServer: {
      noInfo: true
    }
  });
};
