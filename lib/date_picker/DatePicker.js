'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DatePicker = exports.datePickerFactory = exports.DatePickerDialog = undefined;

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

var _IconButton = require('../button/IconButton.js');

var _IconButton2 = _interopRequireDefault(_IconButton);

var _Input = require('../input/Input.js');

var _Input2 = _interopRequireDefault(_Input);

var _Dialog = require('../dialog/Dialog.js');

var _Dialog2 = _interopRequireDefault(_Dialog);

var _Calendar = require('./Calendar.js');

var _Calendar2 = _interopRequireDefault(_Calendar);

var _DatePickerDialog = require('./DatePickerDialog.js');

var _DatePickerDialog2 = _interopRequireDefault(_DatePickerDialog);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _components = {
  DatePicker: {
    displayName: 'DatePicker',
    isInFunction: true
  }
};

var _reactTransformHmr2 = (0, _reactTransformHmr4.default)({
  filename: 'components/date_picker/DatePicker.js',
  components: _components,
  locals: [module],
  imports: [_react3.default]
});

var _reactTransformCatchErrors2 = (0, _reactTransformCatchErrors4.default)({
  filename: 'components/date_picker/DatePicker.js',
  components: _components,
  locals: [],
  imports: [_react3.default, _redboxReact3.default]
});

function _wrapComponent(id) {
  return function (Component) {
    return _reactTransformHmr2(_reactTransformCatchErrors2(Component, id), id);
  };
}

var factory = function factory(Input, DatePickerDialog) {
  var _class, _temp2;

  var DatePicker = _wrapComponent('DatePicker')((_temp2 = _class = function (_Component) {
    _inherits(DatePicker, _Component);

    function DatePicker() {
      var _ref;

      var _temp, _this, _ret;

      _classCallCheck(this, DatePicker);

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = DatePicker.__proto__ || Object.getPrototypeOf(DatePicker)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
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

    _createClass(DatePicker, [{
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
        var autoOk = _props.autoOk;
        var inputClassName = _props.inputClassName;
        var inputFormat = _props.inputFormat;
        var locale = _props.locale;
        var maxDate = _props.maxDate;
        var minDate = _props.minDate;
        var onEscKeyDown = _props.onEscKeyDown;
        var onOverlayClick = _props.onOverlayClick;
        var readonly = _props.readonly;
        var sundayFirstDayOfWeek = _props.sundayFirstDayOfWeek;
        var value = _props.value;

        var others = _objectWithoutProperties(_props, ['active', 'autoOk', 'inputClassName', 'inputFormat', 'locale', 'maxDate', 'minDate', 'onEscKeyDown', 'onOverlayClick', 'readonly', 'sundayFirstDayOfWeek', 'value']);

        var finalInputFormat = inputFormat || _time2.default.formatDate;
        var date = Object.prototype.toString.call(value) === '[object Date]' ? value : undefined;
        var formattedDate = date === undefined ? '' : finalInputFormat(value, locale);

        return _react3.default.createElement(
          'div',
          { 'data-react-toolbox': 'date-picker' },
          _react3.default.createElement(Input, _extends({}, others, {
            className: (0, _classnames3.default)(this.props.theme.input, _defineProperty({}, inputClassName, inputClassName)),
            disabled: readonly,
            error: this.props.error,
            icon: this.props.icon,
            label: this.props.label,
            name: this.props.name,
            onFocus: this.handleInputFocus,
            onKeyPress: this.handleInputKeyPress,
            onClick: this.handleInputClick,
            readOnly: true,
            type: 'text',
            value: formattedDate
          })),
          _react3.default.createElement(DatePickerDialog, {
            active: this.state.active,
            autoOk: autoOk,
            className: this.props.className,
            locale: locale,
            maxDate: maxDate,
            minDate: minDate,
            name: this.props.name,
            onDismiss: this.handleDismiss,
            onEscKeyDown: onEscKeyDown || this.handleDismiss,
            onOverlayClick: onOverlayClick || this.handleDismiss,
            onSelect: this.handleSelect,
            sundayFirstDayOfWeek: sundayFirstDayOfWeek,
            theme: this.props.theme,
            value: date
          })
        );
      }
    }]);

    return DatePicker;
  }(_react2.Component), _class.propTypes = {
    active: _react2.PropTypes.bool,
    autoOk: _react2.PropTypes.bool,
    className: _react2.PropTypes.string,
    error: _react2.PropTypes.string,
    icon: _react2.PropTypes.oneOfType([_react2.PropTypes.string, _react2.PropTypes.element]),
    inputClassName: _react2.PropTypes.string,
    inputFormat: _react2.PropTypes.func,
    label: _react2.PropTypes.string,
    locale: _react3.default.PropTypes.oneOfType([_react3.default.PropTypes.string, _react3.default.PropTypes.object]),
    maxDate: _react2.PropTypes.object,
    minDate: _react2.PropTypes.object,
    name: _react2.PropTypes.string,
    onChange: _react2.PropTypes.func,
    onClick: _react2.PropTypes.func,
    onEscKeyDown: _react2.PropTypes.func,
    onKeyPress: _react2.PropTypes.func,
    onOverlayClick: _react2.PropTypes.func,
    readonly: _react2.PropTypes.bool,
    sundayFirstDayOfWeek: _react3.default.PropTypes.bool,
    theme: _react2.PropTypes.shape({
      input: _react2.PropTypes.string
    }),
    value: _react2.PropTypes.oneOfType([_react2.PropTypes.instanceOf(Date), _react2.PropTypes.string])
  }, _class.defaultProps = {
    active: false,
    locale: 'en',
    sundayFirstDayOfWeek: false
  }, _temp2));

  return DatePicker;
};

var Calendar = (0, _Calendar2.default)(_IconButton2.default);
var DatePickerDialog = (0, _DatePickerDialog2.default)(_Dialog2.default, Calendar);
var DatePicker = factory(_Input2.default, DatePickerDialog);

exports.default = (0, _reactCssThemr.themr)(_identifiers.DATE_PICKER)(DatePicker);
exports.DatePickerDialog = DatePickerDialog;
exports.datePickerFactory = factory;
exports.DatePicker = DatePicker;