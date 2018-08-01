'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames2 = require('classnames');

var _classnames3 = _interopRequireDefault(_classnames2);

var _reactStyleProptype = require('react-style-proptype');

var _reactStyleProptype2 = _interopRequireDefault(_reactStyleProptype);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var factory = function factory(ripple) {
  var Check = function Check(_ref) {
    var checked = _ref.checked,
        children = _ref.children,
        onMouseDown = _ref.onMouseDown,
        theme = _ref.theme,
        style = _ref.style;
    return _react2.default.createElement(
      'div',
      {
        'data-react-toolbox': 'check',
        className: (0, _classnames3.default)(theme.check, _defineProperty({}, theme.checked, checked)),
        onMouseDown: onMouseDown,
        style: style
      },
      children
    );
  };

  Check.propTypes = {
    checked: _propTypes2.default.bool,
    children: _propTypes2.default.node,
    onMouseDown: _propTypes2.default.func,
    style: _reactStyleProptype2.default,
    theme: _propTypes2.default.shape({
      check: _propTypes2.default.string,
      checked: _propTypes2.default.string
    })
  };

  return ripple(Check);
};

exports.default = factory;