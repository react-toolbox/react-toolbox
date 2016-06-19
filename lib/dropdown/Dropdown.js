'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Dropdown = exports.dropdownFactory = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _classnames3 = require('classnames');

var _classnames4 = _interopRequireDefault(_classnames3);

var _reactCssThemr = require('react-css-themr');

var _identifiers = require('../identifiers.js');

var _Input = require('../input/Input.js');

var _Input2 = _interopRequireDefault(_Input);

var _events = require('../utils/events.js');

var _events2 = _interopRequireDefault(_events);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var factory = function factory(Input) {
  var Dropdown = function (_Component) {
    _inherits(Dropdown, _Component);

    function Dropdown() {
      var _Object$getPrototypeO;

      var _temp, _this, _ret;

      _classCallCheck(this, Dropdown);

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(Dropdown)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.state = {
        active: false,
        up: false
      }, _this.close = function () {
        if (_this.state.active) {
          _this.setState({ active: false });
        }
      }, _this.handleDocumentClick = function (event) {
        if (_this.state.active && !_events2.default.targetIsDescendant(event, _reactDom2.default.findDOMNode(_this))) {
          _this.setState({ active: false });
        }
      }, _this.handleMouseDown = function (event) {
        _events2.default.pauseEvent(event);
        var client = event.target.getBoundingClientRect();
        var screen_height = window.innerHeight || document.documentElement.offsetHeight;
        var up = _this.props.auto ? client.top > screen_height / 2 + client.height : false;
        if (_this.props.onFocus) _this.props.onFocus(event);
        _this.setState({ active: true, up: up });
      }, _this.handleSelect = function (item, event) {
        if (_this.props.onBlur) _this.props.onBlur(event);
        if (!_this.props.disabled && _this.props.onChange) {
          if (_this.props.name) {
            event.target.name = _this.props.name;
          }
          _this.props.onChange(item, event);
          _this.setState({ active: false });
        }
      }, _this.getSelectedItem = function () {
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = _this.props.source[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var item = _step.value;

            if (item.value === _this.props.value) return item;
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }

        if (!_this.props.allowBlank) {
          return _this.props.source[0];
        }
      }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Dropdown, [{
      key: 'componentWillUpdate',
      value: function componentWillUpdate(nextProps, nextState) {
        if (!this.state.active && nextState.active) {
          _events2.default.addEventsToDocument({ click: this.handleDocumentClick });
        }
      }
    }, {
      key: 'componentDidUpdate',
      value: function componentDidUpdate(prevProps, prevState) {
        if (prevState.active && !this.state.active) {
          _events2.default.removeEventsFromDocument({ click: this.handleDocumentClick });
        }
      }
    }, {
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        if (this.state.active) {
          _events2.default.removeEventsFromDocument({ click: this.handleDocumentClick });
        }
      }
    }, {
      key: 'renderTemplateValue',
      value: function renderTemplateValue(selected) {
        var _classnames;

        var theme = this.props.theme;

        var className = (0, _classnames4.default)(theme.field, (_classnames = {}, _defineProperty(_classnames, theme.errored, this.props.error), _defineProperty(_classnames, theme.disabled, this.props.disabled), _classnames));

        return _react2.default.createElement(
          'div',
          { className: className, onMouseDown: this.handleMouseDown },
          _react2.default.createElement(
            'div',
            { className: theme.templateValue + ' ' + theme.value },
            this.props.template(selected)
          ),
          this.props.label ? _react2.default.createElement(
            'label',
            { className: theme.label },
            this.props.label
          ) : null,
          this.props.error ? _react2.default.createElement(
            'span',
            { className: theme.error },
            this.props.error
          ) : null
        );
      }
    }, {
      key: 'renderValue',
      value: function renderValue(item, idx) {
        var theme = this.props.theme;

        var className = item.value === this.props.value ? theme.selected : null;
        return _react2.default.createElement(
          'li',
          { key: idx, className: className, onMouseDown: this.handleSelect.bind(this, item.value) },
          this.props.template ? this.props.template(item) : item.label
        );
      }
    }, {
      key: 'render',
      value: function render() {
        var _classnames2;

        var _props = this.props;
        var template = _props.template;
        var theme = _props.theme;
        var source = _props.source;

        var others = _objectWithoutProperties(_props, ['template', 'theme', 'source']);

        var selected = this.getSelectedItem();
        var className = (0, _classnames4.default)(theme.dropdown, (_classnames2 = {}, _defineProperty(_classnames2, theme.up, this.state.up), _defineProperty(_classnames2, theme.active, this.state.active), _defineProperty(_classnames2, theme.disabled, this.props.disabled), _classnames2), this.props.className);

        return _react2.default.createElement(
          'div',
          { 'data-react-toolbox': 'dropdown', className: className },
          _react2.default.createElement(Input, _extends({}, others, {
            className: theme.value,
            onMouseDown: this.handleMouseDown,
            readOnly: true,
            type: template && selected ? 'hidden' : null,
            value: selected && selected.label
          })),
          template && selected ? this.renderTemplateValue(selected) : null,
          _react2.default.createElement(
            'ul',
            { className: theme.values, ref: 'values' },
            source.map(this.renderValue.bind(this))
          )
        );
      }
    }]);

    return Dropdown;
  }(_react.Component);

  Dropdown.propTypes = {
    allowBlank: _react.PropTypes.bool,
    auto: _react.PropTypes.bool,
    className: _react.PropTypes.string,
    disabled: _react.PropTypes.bool,
    error: _react.PropTypes.string,
    label: _react.PropTypes.string,
    name: _react.PropTypes.string,
    onBlur: _react.PropTypes.func,
    onChange: _react.PropTypes.func,
    onFocus: _react.PropTypes.func,
    source: _react.PropTypes.array.isRequired,
    template: _react.PropTypes.func,
    theme: _react.PropTypes.shape({
      active: _react.PropTypes.string,
      disabled: _react.PropTypes.string,
      dropdown: _react.PropTypes.string,
      error: _react.PropTypes.string,
      errored: _react.PropTypes.string,
      field: _react.PropTypes.string,
      label: _react.PropTypes.string,
      selected: _react.PropTypes.string,
      templateValue: _react.PropTypes.string,
      up: _react.PropTypes.string,
      value: _react.PropTypes.string,
      values: _react.PropTypes.string
    }),
    value: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.number])
  };
  Dropdown.defaultProps = {
    auto: true,
    className: '',
    allowBlank: true,
    disabled: false
  };


  return Dropdown;
};

var Dropdown = factory(_Input2.default);
exports.default = (0, _reactCssThemr.themr)(_identifiers.DROPDOWN)(Dropdown);
exports.dropdownFactory = factory;
exports.Dropdown = Dropdown;