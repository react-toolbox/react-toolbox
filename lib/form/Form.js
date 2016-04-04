'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _autocomplete = require('../autocomplete');

var _autocomplete2 = _interopRequireDefault(_autocomplete);

var _button = require('../button');

var _button2 = _interopRequireDefault(_button);

var _checkbox = require('../checkbox');

var _checkbox2 = _interopRequireDefault(_checkbox);

var _date_picker = require('../date_picker');

var _date_picker2 = _interopRequireDefault(_date_picker);

var _dropdown = require('../dropdown');

var _dropdown2 = _interopRequireDefault(_dropdown);

var _input = require('../input');

var _input2 = _interopRequireDefault(_input);

var _RadioGroup = require('../radio/RadioGroup');

var _RadioGroup2 = _interopRequireDefault(_RadioGroup);

var _slider = require('../slider');

var _slider2 = _interopRequireDefault(_slider);

var _switch = require('../switch');

var _switch2 = _interopRequireDefault(_switch);

var _time_picker = require('../time_picker');

var _time_picker2 = _interopRequireDefault(_time_picker);

var _style = require('./style');

var _style2 = _interopRequireDefault(_style);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Component = {
  'autocomplete': _autocomplete2.default,
  'button': _button2.default,
  'checkbox': _checkbox2.default,
  'datepicker': _date_picker2.default,
  'dropdown': _dropdown2.default,
  'input': _input2.default,
  'radioGroup': _RadioGroup2.default,
  'slider': _slider2.default,
  'switch': _switch2.default,
  'timepicker': _time_picker2.default
};

var Form = function (_React$Component) {
  _inherits(Form, _React$Component);

  function Form() {
    var _Object$getPrototypeO;

    var _temp, _this, _ret;

    _classCallCheck(this, Form);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(Form)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.onSubmit = function (event) {
      event.preventDefault();
      if (_this.props.onSubmit) _this.props.onSubmit(event);
    }, _this.onChange = function (field, value, event) {
      if (_this.props.onChange) _this.props.onChange(field, value, event);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Form, [{
    key: 'renderFields',
    value: function renderFields() {
      var _this2 = this;

      return Object.keys(this.props.model).map(function (field, index) {
        var properties = _this2.props.model[field];
        var Field = Component[properties.kind.toLowerCase()];
        return _react2.default.createElement(Field, _extends({ key: index }, properties, { onChange: _this2.onChange.bind(_this2, field) }));
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var className = _style2.default.root + ' ' + this.props.className;

      return _react2.default.createElement(
        'form',
        { 'data-react-toolbox': 'form', className: className, onSubmit: this.onSubmit },
        this.renderFields(),
        this.props.children
      );
    }
  }]);

  return Form;
}(_react2.default.Component);

Form.propTypes = {
  attributes: _react2.default.PropTypes.array,
  children: _react2.default.PropTypes.node,
  className: _react2.default.PropTypes.string,
  model: _react2.default.PropTypes.object,
  onChange: _react2.default.PropTypes.func,
  onError: _react2.default.PropTypes.func,
  onSubmit: _react2.default.PropTypes.func,
  onValid: _react2.default.PropTypes.func,
  storage: _react2.default.PropTypes.string
};
Form.defaultProps = {
  attributes: [],
  className: ''
};
exports.default = Form;