'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isValuePresent = exports.getAnimationModule = exports.removeNamespace = exports.transformKeys = exports.prepareValueForInput = exports.inputTypeForPrototype = exports.cloneObject = exports.getViewport = exports.round = exports.range = exports.angle360FromPositions = exports.angleFromPositions = undefined;

var _assoc = require('ramda/src/assoc');

var _assoc2 = _interopRequireDefault(_assoc);

var _compose = require('ramda/src/compose');

var _compose2 = _interopRequireDefault(_compose);

var _keys = require('ramda/src/keys');

var _keys2 = _interopRequireDefault(_keys);

var _reduce = require('ramda/src/reduce');

var _reduce2 = _interopRequireDefault(_reduce);

var _pickBy = require('ramda/src/pickBy');

var _pickBy2 = _interopRequireDefault(_pickBy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var angleFromPositions = exports.angleFromPositions = function angleFromPositions(cx, cy, ex, ey) {
  var theta = Math.atan2(ey - cy, ex - cx) + Math.PI / 2;
  return theta * 180 / Math.PI;
};

var angle360FromPositions = exports.angle360FromPositions = function angle360FromPositions(cx, cy, ex, ey) {
  var angle = angleFromPositions(cx, cy, ex, ey);
  return angle < 0 ? 360 + angle : angle;
};

var range = exports.range = function range() {
  var start = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  var stop = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  var step = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
  var _start = 0,
      _stop = start;

  if (stop !== null) {
    _start = start;
    _stop = stop;
  }
  var length = Math.max(Math.ceil((_stop - _start) / step), 0);
  var _range = Array(length);

  for (var idx = 0; idx < length; idx += 1, _start += step) {
    _range[idx] = _start;
  }

  return _range;
};

var round = exports.round = function round(number, decimals) {
  if (!isNaN(parseFloat(number)) && isFinite(number)) {
    var decimalPower = Math.pow(10, decimals);
    return Math.round(parseFloat(number) * decimalPower) / decimalPower;
  }
  return NaN;
};

var getViewport = exports.getViewport = function getViewport() {
  return {
    height: window.innerHeight || document.documentElement.offsetHeight,
    width: window.innerWidth || document.documentElement.offsetWidth
  };
};

var cloneObject = exports.cloneObject = function cloneObject(object) {
  return JSON.parse(JSON.stringify(object));
};

var inputTypeForPrototype = exports.inputTypeForPrototype = function inputTypeForPrototype(prototype) {
  if (prototype === Date) return 'date';
  if (prototype === Number) return 'number';
  if (prototype === Boolean) return 'checkbox';
  return 'text';
};

var prepareValueForInput = exports.prepareValueForInput = function prepareValueForInput(value, type) {
  if (type === 'date') return new Date(value).toISOString().slice(0, 10);
  if (type === 'checkbox') {
    return value ? 'on' : '';
  }
  return value;
};

var transformKeys = exports.transformKeys = function transformKeys(fn) {
  return function (obj) {
    var addTransformedKey = function addTransformedKey(result, key) {
      return (0, _assoc2.default)(fn(key), obj[key], result);
    };
    return (0, _reduce2.default)(addTransformedKey, {}, (0, _keys2.default)(obj));
  };
};

var removeNamespace = exports.removeNamespace = function removeNamespace(namespace) {
  return function (key) {
    var capitalized = key.substr(namespace.length);
    return capitalized.slice(0, 1).toLowerCase() + capitalized.slice(1);
  };
};

var getAnimationModule = exports.getAnimationModule = function getAnimationModule(animation, theme) {
  return (0, _compose2.default)(transformKeys(removeNamespace(animation)), (0, _pickBy2.default)(function (v, k) {
    return k.startsWith(animation);
  }))(theme);
};

var isValuePresent = exports.isValuePresent = function isValuePresent(value) {
  return value !== null && value !== undefined && value !== '' && !(typeof value === 'number' && isNaN(value));
};