'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Dropdown = exports.dropdownFactory = undefined;

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

var _components = {
  Dropdown: {
    displayName: 'Dropdown',
    isInFunction: true
  }
};

var _reactTransformHmr2 = (0, _reactTransformHmr4.default)({
  filename: 'components/dropdown/Dropdown.js',
  components: _components,
  locals: [module],
  imports: [_react3.default]
});

var _reactTransformCatchErrors2 = (0, _reactTransformCatchErrors4.default)({
  filename: 'components/dropdown/Dropdown.js',
  components: _components,
  locals: [],
  imports: [_react3.default, _redboxReact3.default]
});

function _wrapComponent(id) {
  return function (Component) {
    return _reactTransformHmr2(_reactTransformCatchErrors2(Component, id), id);
  };
}

var factory = function factory(Input) {
  var _class, _temp2;

  var Dropdown = _wrapComponent('Dropdown')((_temp2 = _class = function (_Component) {
    _inherits(Dropdown, _Component);

    function Dropdown() {
      var _ref;

      var _temp, _this, _ret;

      _classCallCheck(this, Dropdown);

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Dropdown.__proto__ || Object.getPrototypeOf(Dropdown)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
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
      }, _this.handleClick = function (event) {
        _events2.default.pauseEvent(event);
        var client = event.target.getBoundingClientRect();
        var screen_height = window.innerHeight || document.documentElement.offsetHeight;
        var up = _this.props.auto ? client.top > screen_height / 2 + client.height : false;
        if (_this.props.onClick) _this.props.onClick(event);
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
      }, _this.renderValue = function (item, idx) {
        var theme = _this.props.theme;

        var className = item.value === _this.props.value ? theme.selected : null;
        return _react3.default.createElement(
          'li',
          { key: idx, className: className, onClick: _this.handleSelect.bind(_this, item.value) },
          _this.props.template ? _this.props.template(item) : item.label
        );
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

        return _react3.default.createElement(
          'div',
          { className: className, onClick: this.handleClick },
          _react3.default.createElement(
            'div',
            { className: theme.templateValue + ' ' + theme.value },
            this.props.template(selected)
          ),
          this.props.label ? _react3.default.createElement(
            'label',
            { className: theme.label },
            this.props.label
          ) : null,
          this.props.error ? _react3.default.createElement(
            'span',
            { className: theme.error },
            this.props.error
          ) : null
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
        var allowBlank = _props.allowBlank;
        var auto = _props.auto;

        var others = _objectWithoutProperties(_props, ['template', 'theme', 'source', 'allowBlank', 'auto']); //eslint-disable-line no-unused-vars


        var selected = this.getSelectedItem();
        var className = (0, _classnames4.default)(theme.dropdown, (_classnames2 = {}, _defineProperty(_classnames2, theme.up, this.state.up), _defineProperty(_classnames2, theme.active, this.state.active), _defineProperty(_classnames2, theme.disabled, this.props.disabled), _classnames2), this.props.className);

        return _react3.default.createElement(
          'div',
          { 'data-react-toolbox': 'dropdown', className: className },
          _react3.default.createElement(Input, _extends({}, others, {
            className: theme.value,
            onClick: this.handleClick,
            readOnly: true,
            type: template && selected ? 'hidden' : null,
            value: selected && selected.label ? selected.label : ''
          })),
          template && selected ? this.renderTemplateValue(selected) : null,
          _react3.default.createElement(
            'ul',
            { className: theme.values, ref: 'values' },
            source.map(this.renderValue)
          )
        );
      }
    }]);

    return Dropdown;
  }(_react2.Component), _class.propTypes = {
    allowBlank: _react2.PropTypes.bool,
    auto: _react2.PropTypes.bool,
    className: _react2.PropTypes.string,
    disabled: _react2.PropTypes.bool,
    error: _react2.PropTypes.string,
    label: _react2.PropTypes.string,
    name: _react2.PropTypes.string,
    onBlur: _react2.PropTypes.func,
    onChange: _react2.PropTypes.func,
    onClick: _react2.PropTypes.func,
    onFocus: _react2.PropTypes.func,
    source: _react2.PropTypes.array.isRequired,
    template: _react2.PropTypes.func,
    theme: _react2.PropTypes.shape({
      active: _react2.PropTypes.string,
      disabled: _react2.PropTypes.string,
      dropdown: _react2.PropTypes.string,
      error: _react2.PropTypes.string,
      errored: _react2.PropTypes.string,
      field: _react2.PropTypes.string,
      label: _react2.PropTypes.string,
      selected: _react2.PropTypes.string,
      templateValue: _react2.PropTypes.string,
      up: _react2.PropTypes.string,
      value: _react2.PropTypes.string,
      values: _react2.PropTypes.string
    }),
    value: _react2.PropTypes.oneOfType([_react2.PropTypes.string, _react2.PropTypes.number])
  }, _class.defaultProps = {
    auto: true,
    className: '',
    allowBlank: true,
    disabled: false
  }, _temp2));

  return Dropdown;
};

var Dropdown = factory(_Input2.default);
exports.default = (0, _reactCssThemr.themr)(_identifiers.DROPDOWN)(Dropdown);
exports.dropdownFactory = factory;
exports.Dropdown = Dropdown;