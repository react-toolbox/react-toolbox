'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _ActivableRenderer = require('../hoc/ActivableRenderer');

var _ActivableRenderer2 = _interopRequireDefault(_ActivableRenderer);

var _overlay = require('../overlay');

var _overlay2 = _interopRequireDefault(_overlay);

var _style = require('./style');

var _style2 = _interopRequireDefault(_style);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Drawer = function Drawer(props) {
  var className = (0, _classnames2.default)([_style2.default.root, _style2.default[props.type]], _defineProperty({}, _style2.default.active, props.active), props.className);

  return _react2.default.createElement(
    _overlay2.default,
    { active: props.active, onClick: props.onOverlayClick },
    _react2.default.createElement(
      'div',
      { 'data-react-toolbox': 'drawer', className: className },
      _react2.default.createElement(
        'aside',
        { className: _style2.default.content },
        props.children
      )
    )
  );
};

Drawer.propTypes = {
  active: _react2.default.PropTypes.bool,
  children: _react2.default.PropTypes.node,
  className: _react2.default.PropTypes.string,
  onOverlayClick: _react2.default.PropTypes.func,
  type: _react2.default.PropTypes.oneOf(['left', 'right'])
};

Drawer.defaultProps = {
  active: false,
  className: '',
  type: 'left'
};

exports.default = (0, _ActivableRenderer2.default)()(Drawer);