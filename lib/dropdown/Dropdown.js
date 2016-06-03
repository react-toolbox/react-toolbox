'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _input = require('../input');

var _input2 = _interopRequireDefault(_input);

var _events = require('../utils/events');

var _events2 = _interopRequireDefault(_events);

var _style = require('./style');

var _style2 = _interopRequireDefault(_style);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Dropdown = function (_React$Component) {
  _inherits(Dropdown, _React$Component);

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
      var _ClassNames;

      var className = (0, _classnames2.default)(_style2.default.field, (_ClassNames = {}, _defineProperty(_ClassNames, _style2.default.errored, this.props.error), _defineProperty(_ClassNames, _style2.default.disabled, this.props.disabled), _ClassNames));

      return _react2.default.createElement(
        'div',
        { className: className, onMouseDown: this.handleMouseDown },
        _react2.default.createElement(
          'div',
          { className: _style2.default.templateValue + ' ' + _style2.default.value },
          this.props.template(selected)
        ),
        this.props.label ? _react2.default.createElement(
          'label',
          { className: _style2.default.label },
          this.props.label
        ) : null,
        this.props.error ? _react2.default.createElement(
          'span',
          { className: _style2.default.error },
          this.props.error
        ) : null
      );
    }
  }, {
    key: 'renderValue',
    value: function renderValue(item, idx) {
      var className = item.value === this.props.value ? _style2.default.selected : null;
      return _react2.default.createElement(
        'li',
        { key: idx, className: className, onMouseDown: this.handleSelect.bind(this, item.value) },
        this.props.template ? this.props.template(item) : item.label
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var _ClassNames2;

      var _props = this.props;
      var template = _props.template;
      var source = _props.source;

      var others = _objectWithoutProperties(_props, ['template', 'source']);

      var selected = this.getSelectedItem();
      var className = (0, _classnames2.default)(_style2.default.root, (_ClassNames2 = {}, _defineProperty(_ClassNames2, _style2.default.up, this.state.up), _defineProperty(_ClassNames2, _style2.default.active, this.state.active), _defineProperty(_ClassNames2, _style2.default.disabled, this.props.disabled), _ClassNames2), this.props.className);

      return _react2.default.createElement(
        'div',
        { 'data-react-toolbox': 'dropdown', className: className },
        _react2.default.createElement(_input2.default, _extends({}, others, {
          className: _style2.default.value,
          onMouseDown: this.handleMouseDown,
          readOnly: true,
          type: template && selected ? 'hidden' : null,
          value: selected && selected.label
        })),
        template && selected ? this.renderTemplateValue(selected) : null,
        _react2.default.createElement(
          'ul',
          { className: _style2.default.values, ref: 'values' },
          source.map(this.renderValue.bind(this))
        )
      );
    }
  }]);

  return Dropdown;
}(_react2.default.Component);

Dropdown.propTypes = {
  allowBlank: _react2.default.PropTypes.bool,
  auto: _react2.default.PropTypes.bool,
  className: _react2.default.PropTypes.string,
  disabled: _react2.default.PropTypes.bool,
  error: _react2.default.PropTypes.string,
  label: _react2.default.PropTypes.string,
  onBlur: _react2.default.PropTypes.func,
  onChange: _react2.default.PropTypes.func,
  onFocus: _react2.default.PropTypes.func,
  source: _react2.default.PropTypes.array.isRequired,
  template: _react2.default.PropTypes.func,
  value: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.string, _react2.default.PropTypes.number])
};
Dropdown.defaultProps = {
  auto: true,
  className: '',
  allowBlank: true,
  disabled: false
};
exports.default = Dropdown;