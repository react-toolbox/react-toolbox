const babel = require('babel-core');

module.exports = {
  process(src, filename) {
    if (babel.util.canCompile(filename)) {
      return babel.transform(src, {
        filename,
      }).code;
    }
    return src;
  },
};
