module.exports = {
  moduleDirectories: [
    'node_modules',
  ],
  moduleNameMapper: {
    '(\\.css$)|(normalize.css/normalize)|(^exports-loader)': 'identity-obj-proxy',
  },
  modulePaths: [
    '<rootDir>/components',
  ],
  setupFiles: [
    './jest.setup.js',
  ],
  snapshotSerializers: [
    'enzyme-to-json/serializer',
  ],
};
