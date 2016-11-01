'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.unit = exports.alpha = undefined;

var _color = require('color');

var _color2 = _interopRequireDefault(_color);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var ensure = function ensure(args) {
  return function (value) {
    return typeof value === 'function' ? value(args) : value;
  };
};

var anyFunction = function anyFunction(values) {
  return values.filter(function (value) {
    return typeof value === 'function';
  }).length > 0;
};

var withProps = function withProps(fn) {
  return function () {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return anyFunction(args) ? function (props) {
      return fn.apply(undefined, _toConsumableArray(args.map(ensure(props))));
    } : fn.apply(undefined, args);
  };
};

var alpha = function alpha(colorString, alphaValue) {
  return (0, _color2.default)(colorString).alpha(alphaValue).rgbaString();
};

var unit = function unit(value) {
  return value * 10 + 'px';
};

var alphaWithProps = withProps(alpha);
var unitWithProps = withProps(unit);

exports.alpha = alphaWithProps;
exports.unit = unitWithProps;