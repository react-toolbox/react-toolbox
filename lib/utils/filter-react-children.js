'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (children, predicate) {
  var _this = this;

  if (children) {
    var result = [];
    _react2.default.Children.forEach(children, function (entry, idx) {
      if (predicate && predicate.call(_this, entry, idx)) {
        result.push(entry);
      }
    });
    return result;
  }

  return undefined;
};

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }