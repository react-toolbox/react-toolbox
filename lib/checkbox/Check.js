'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames2 = require('classnames');

var _classnames3 = _interopRequireDefault(_classnames2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var factory = function factory(ripple) {
  var Check = function Check(_ref) {
    var checked = _ref.checked;
    var children = _ref.children;
    var onMouseDown = _ref.onMouseDown;
    var theme = _ref.theme;
    return _react2.default.createElement(
      'div',
      {
        'data-react-toolbox': 'check',
        className: (0, _classnames3.default)(theme.check, _defineProperty({}, theme.checked, checked)),
        onMouseDown: onMouseDown
      },
      children
    );
  };

  Check.propTypes = {
    checked: _react.PropTypes.bool,
    children: _react.PropTypes.any,
    onMouseDown: _react.PropTypes.func,
    theme: _react.PropTypes.shape({
      check: _react.PropTypes.string,
      checked: _react.PropTypes.string
    })
  };

  return ripple(Check);
};

exports.default = factory;