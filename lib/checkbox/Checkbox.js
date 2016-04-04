'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _redboxReact2 = require('redbox-react');

var _redboxReact3 = _interopRequireDefault(_redboxReact2);

var _reactTransformCatchErrors3 = require('react-transform-catch-errors');

var _reactTransformCatchErrors4 = _interopRequireDefault(_reactTransformCatchErrors3);

var _react2 = require('react');

var _react3 = _interopRequireDefault(_react2);

var _reactTransformHmr3 = require('react-transform-hmr');

var _reactTransformHmr4 = _interopRequireDefault(_reactTransformHmr3);

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp2;

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _Check = require('./Check');

var _Check2 = _interopRequireDefault(_Check);

var _style = require('./style');

var _style2 = _interopRequireDefault(_style);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _components = {
  Checkbox: {
    displayName: 'Checkbox'
  }
};

var _reactTransformHmr2 = (0, _reactTransformHmr4.default)({
  filename: 'components/checkbox/Checkbox.jsx',
  components: _components,
  locals: [module],
  imports: [_react3.default]
});

var _reactTransformCatchErrors2 = (0, _reactTransformCatchErrors4.default)({
  filename: 'components/checkbox/Checkbox.jsx',
  components: _components,
  locals: [],
  imports: [_react3.default, _redboxReact3.default]
});

function _wrapComponent(id) {
  return function (Component) {
    return _reactTransformHmr2(_reactTransformCatchErrors2(Component, id), id);
  };
}

var Checkbox = _wrapComponent('Checkbox')((_temp2 = _class = function (_React$Component) {
  _inherits(Checkbox, _React$Component);

  function Checkbox() {
    var _Object$getPrototypeO;

    var _temp, _this, _ret;

    _classCallCheck(this, Checkbox);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(Checkbox)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.handleToggle = function (event) {
      if (event.pageX !== 0 && event.pageY !== 0) _this.blur();
      if (!_this.props.disabled && _this.props.onChange) {
        _this.props.onChange(!_this.props.checked, event);
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Checkbox, [{
    key: 'blur',
    value: function blur() {
      this.refs.input.blur();
    }
  }, {
    key: 'focus',
    value: function focus() {
      this.refs.input.focus();
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props;
      var onChange = _props.onChange;

      var others = _objectWithoutProperties(_props, ['onChange']);

      var className = (0, _classnames2.default)(_style2.default.field, _defineProperty({}, _style2.default.disabled, this.props.disabled), this.props.className);

      return _react3.default.createElement(
        'label',
        { 'data-react-toolbox': 'checkbox', className: className },
        _react3.default.createElement('input', _extends({}, others, {
          className: _style2.default.input,
          onClick: this.handleToggle,
          readOnly: true,
          ref: 'input',
          type: 'checkbox'
        })),
        _react3.default.createElement(_Check2.default, { checked: this.props.checked, disabled: this.props.disabled }),
        this.props.label ? _react3.default.createElement(
          'span',
          { 'data-react-toolbox': 'label', className: _style2.default.text },
          this.props.label
        ) : null
      );
    }
  }]);

  return Checkbox;
}(_react3.default.Component), _class.propTypes = {
  checked: _react3.default.PropTypes.bool,
  className: _react3.default.PropTypes.string,
  disabled: _react3.default.PropTypes.bool,
  label: _react3.default.PropTypes.any,
  onChange: _react3.default.PropTypes.func
}, _class.defaultProps = {
  checked: false,
  className: '',
  disabled: false
}, _temp2));

exports.default = Checkbox;