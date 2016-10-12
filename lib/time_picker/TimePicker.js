'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TimePicker = exports.timePickerFactory = undefined;

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

var _classnames2 = require('classnames');

var _classnames3 = _interopRequireDefault(_classnames2);

var _reactCssThemr = require('react-css-themr');

var _identifiers = require('../identifiers.js');

var _events = require('../utils/events.js');

var _events2 = _interopRequireDefault(_events);

var _time = require('../utils/time.js');

var _time2 = _interopRequireDefault(_time);

var _Dialog = require('../dialog/Dialog.js');

var _Dialog2 = _interopRequireDefault(_Dialog);

var _Input = require('../input/Input.js');

var _Input2 = _interopRequireDefault(_Input);

var _TimePickerDialog = require('./TimePickerDialog.js');

var _TimePickerDialog2 = _interopRequireDefault(_TimePickerDialog);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _components = {
  TimePicker: {
    displayName: 'TimePicker',
    isInFunction: true
  }
};

var _reactTransformHmr2 = (0, _reactTransformHmr4.default)({
  filename: 'components/time_picker/TimePicker.js',
  components: _components,
  locals: [module],
  imports: [_react3.default]
});

var _reactTransformCatchErrors2 = (0, _reactTransformCatchErrors4.default)({
  filename: 'components/time_picker/TimePicker.js',
  components: _components,
  locals: [],
  imports: [_react3.default, _redboxReact3.default]
});

function _wrapComponent(id) {
  return function (Component) {
    return _reactTransformHmr2(_reactTransformCatchErrors2(Component, id), id);
  };
}

var factory = function factory(TimePickerDialog, Input) {
  var _class, _temp2;

  var TimePicker = _wrapComponent('TimePicker')((_temp2 = _class = function (_Component) {
    _inherits(TimePicker, _Component);

    function TimePicker() {
      var _ref;

      var _temp, _this, _ret;

      _classCallCheck(this, TimePicker);

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = TimePicker.__proto__ || Object.getPrototypeOf(TimePicker)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
        active: _this.props.active
      }, _this.handleDismiss = function () {
        _this.setState({ active: false });
      }, _this.handleInputFocus = function (event) {
        _events2.default.pauseEvent(event);
        _this.setState({ active: true });
      }, _this.handleInputBlur = function (event) {
        _events2.default.pauseEvent(event);
        _this.setState({ active: false });
      }, _this.handleInputClick = function (event) {
        _events2.default.pauseEvent(event);
        _this.setState({ active: true });
        if (_this.props.onClick) _this.props.onClick(event);
      }, _this.handleInputKeyPress = function (event) {
        if (event.charCode === 13) {
          _events2.default.pauseEvent(event);
          _this.setState({ active: true });
        }
        if (_this.props.onKeyPress) _this.props.onKeyPress(event);
      }, _this.handleSelect = function (value, event) {
        if (_this.props.onChange) _this.props.onChange(value, event);
        _this.setState({ active: false });
      }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(TimePicker, [{
      key: 'componentWillReceiveProps',
      value: function componentWillReceiveProps(nextProps) {
        if (this.state.active !== nextProps.active) {
          this.setState({ active: nextProps.active });
        }
      }
    }, {
      key: 'render',
      value: function render() {
        var _props = this.props;
        var active = _props.active;
        var format = _props.format;
        var inputClassName = _props.inputClassName;
        var onEscKeyDown = _props.onEscKeyDown;
        var onOverlayClick = _props.onOverlayClick;
        var readonly = _props.readonly;
        var value = _props.value;

        var others = _objectWithoutProperties(_props, ['active', 'format', 'inputClassName', 'onEscKeyDown', 'onOverlayClick', 'readonly', 'value']);

        var formattedTime = value ? _time2.default.formatTime(value, format) : '';
        return _react3.default.createElement(
          'div',
          { 'data-react-toolbox': 'time-picker' },
          _react3.default.createElement(Input, _extends({}, others, {
            className: (0, _classnames3.default)(this.props.theme.input, _defineProperty({}, inputClassName, inputClassName)),
            disabled: readonly,
            error: this.props.error,
            label: this.props.label,
            name: this.props.name,
            onKeyPress: this.handleInputKeyPress,
            onClick: this.handleInputClick,
            readOnly: true,
            type: 'text',
            value: formattedTime
          })),
          _react3.default.createElement(TimePickerDialog, {
            active: this.state.active,
            className: this.props.className,
            format: format,
            name: this.props.name,
            onDismiss: this.handleDismiss,
            onEscKeyDown: onEscKeyDown,
            onOverlayClick: onOverlayClick,
            onSelect: this.handleSelect,
            theme: this.props.theme,
            value: this.props.value
          })
        );
      }
    }]);

    return TimePicker;
  }(_react2.Component), _class.propTypes = {
    active: _react2.PropTypes.bool,
    className: _react2.PropTypes.string,
    error: _react2.PropTypes.string,
    format: _react2.PropTypes.oneOf(['24hr', 'ampm']),
    inputClassName: _react2.PropTypes.string,
    label: _react2.PropTypes.string,
    name: _react2.PropTypes.string,
    onChange: _react2.PropTypes.func,
    onClick: _react2.PropTypes.func,
    onEscKeyDown: _react2.PropTypes.func,
    onKeyPress: _react2.PropTypes.func,
    onOverlayClick: _react2.PropTypes.func,
    readonly: _react2.PropTypes.bool,
    theme: _react2.PropTypes.shape({
      input: _react2.PropTypes.string
    }),
    value: _react2.PropTypes.object
  }, _class.defaultProps = {
    active: false,
    className: '',
    format: '24hr'
  }, _temp2));

  return TimePicker;
};

var TimePickerDialog = (0, _TimePickerDialog2.default)(_Dialog2.default);
var TimePicker = factory(TimePickerDialog, _Input2.default);
exports.default = (0, _reactCssThemr.themr)(_identifiers.TIME_PICKER)(TimePicker);
exports.timePickerFactory = factory;
exports.TimePicker = TimePicker;