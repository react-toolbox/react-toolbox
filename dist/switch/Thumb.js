'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var factory = function factory(ripple) {
  var Thumb = function Thumb(_ref) {
    var onMouseDown = _ref.onMouseDown,
        theme = _ref.theme,
        other = _objectWithoutProperties(_ref, ['onMouseDown', 'theme']);

    return _react2.default.createElement('span', _extends({ className: theme.thumb, onMouseDown: onMouseDown }, other));
  };

  Thumb.propTypes = {
    children: _propTypes2.default.node,
    onMouseDown: _propTypes2.default.func,
    theme: _propTypes2.default.shape({
      ripple: _propTypes2.default.string,
      thumb: _propTypes2.default.string
    })
  };

  return ripple(Thumb);
};

exports.default = factory;