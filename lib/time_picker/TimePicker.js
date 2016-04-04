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

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp2;

var _events = require('../utils/events');

var _events2 = _interopRequireDefault(_events);

var _time = require('../utils/time');

var _time2 = _interopRequireDefault(_time);

var _style = require('./style');

var _style2 = _interopRequireDefault(_style);

var _input = require('../input');

var _input2 = _interopRequireDefault(_input);

var _TimePickerDialog = require('./TimePickerDialog');

var _TimePickerDialog2 = _interopRequireDefault(_TimePickerDialog);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _components = {
  TimePicker: {
    displayName: 'TimePicker'
  }
};

var _reactTransformHmr2 = (0, _reactTransformHmr4.default)({
  filename: 'components/time_picker/TimePicker.jsx',
  components: _components,
  locals: [module],
  imports: [_react3.default]
});

var _reactTransformCatchErrors2 = (0, _reactTransformCatchErrors4.default)({
  filename: 'components/time_picker/TimePicker.jsx',
  components: _components,
  locals: [],
  imports: [_react3.default, _redboxReact3.default]
});

function _wrapComponent(id) {
  return function (Component) {
    return _reactTransformHmr2(_reactTransformCatchErrors2(Component, id), id);
  };
}

var TimePicker = _wrapComponent('TimePicker')((_temp2 = _class = function (_React$Component) {
  _inherits(TimePicker, _React$Component);

  function TimePicker() {
    var _Object$getPrototypeO;

    var _temp, _this, _ret;

    _classCallCheck(this, TimePicker);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(TimePicker)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.state = {
      active: false
    }, _this.handleDismiss = function () {
      _this.setState({ active: false });
    }, _this.handleInputMouseDown = function (event) {
      _events2.default.pauseEvent(event);
      _this.setState({ active: true });
    }, _this.handleSelect = function (value, event) {
      if (_this.props.onChange) _this.props.onChange(value, event);
      _this.setState({ active: false });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(TimePicker, [{
    key: 'render',
    value: function render() {
      var _props = this.props;
      var value = _props.value;
      var format = _props.format;

      var formattedTime = value ? _time2.default.formatTime(value, format) : null;
      return _react3.default.createElement(
        'div',
        { 'data-react-toolbox': 'time-picker' },
        _react3.default.createElement(_input2.default, {
          className: _style2.default.input,
          error: this.props.error,
          label: this.props.label,
          onMouseDown: this.handleInputMouseDown,
          readOnly: true,
          type: 'text',
          value: formattedTime
        }),
        _react3.default.createElement(_TimePickerDialog2.default, {
          active: this.state.active,
          className: this.props.className,
          format: format,
          onDismiss: this.handleDismiss,
          onSelect: this.handleSelect,
          value: this.props.value
        })
      );
    }
  }]);

  return TimePicker;
}(_react3.default.Component), _class.propTypes = {
  className: _react3.default.PropTypes.string,
  error: _react3.default.PropTypes.string,
  format: _react3.default.PropTypes.oneOf(['24hr', 'ampm']),
  label: _react3.default.PropTypes.string,
  onChange: _react3.default.PropTypes.func,
  value: _react3.default.PropTypes.object
}, _class.defaultProps = {
  className: '',
  format: '24hr'
}, _temp2));

exports.default = TimePicker;