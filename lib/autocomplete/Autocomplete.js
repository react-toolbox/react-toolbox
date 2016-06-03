'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

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

var _chip = require('../chip');

var _chip2 = _interopRequireDefault(_chip);

var _style = require('./style');

var _style2 = _interopRequireDefault(_style);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var POSITION = {
  AUTO: 'auto',
  DOWN: 'down',
  UP: 'up'
};

var Autocomplete = function (_React$Component) {
  _inherits(Autocomplete, _React$Component);

  function Autocomplete() {
    var _Object$getPrototypeO;

    var _temp, _this, _ret;

    _classCallCheck(this, Autocomplete);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(Autocomplete)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.state = {
      direction: _this.props.direction,
      focus: false,
      query: _this.query(_this.props.value)
    }, _this.handleChange = function (keys, event) {
      var key = _this.props.multiple ? keys : keys[0];
      var query = _this.query(key);
      if (_this.props.onChange) _this.props.onChange(key, event);
      _this.setState({ focus: false, query: query }, function () {
        _this.refs.input.blur();
      });
    }, _this.handleQueryBlur = function () {
      if (_this.state.focus) _this.setState({ focus: false });
    }, _this.handleQueryChange = function (value) {
      _this.setState({ query: value });
    }, _this.handleQueryFocus = function () {
      _this.refs.suggestions.scrollTop = 0;
      _this.setState({ active: '', focus: true });
    }, _this.handleQueryKeyUp = function (event) {
      if (event.which === 13 && _this.state.active) _this.select(_this.state.active, event);
      if (event.which === 27) _this.refs.input.blur();
      if ([40, 38].indexOf(event.which) !== -1) {
        var suggestionsKeys = [].concat(_toConsumableArray(_this.suggestions().keys()));
        var index = suggestionsKeys.indexOf(_this.state.active) + (event.which === 40 ? +1 : -1);
        if (index < 0) index = suggestionsKeys.length - 1;
        if (index >= suggestionsKeys.length) index = 0;
        _this.setState({ active: suggestionsKeys[index] });
      }
    }, _this.handleSuggestionHover = function (key) {
      _this.setState({ active: key });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Autocomplete, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (!this.props.multiple) {
        this.setState({ query: nextProps.value });
      }
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      if (!this.state.focus && nextState.focus && this.props.direction === POSITION.AUTO) {
        var direction = this.calculateDirection();
        if (this.state.direction !== direction) {
          this.setState({ direction: direction });
          return false;
        }
      }
      return true;
    }
  }, {
    key: 'calculateDirection',
    value: function calculateDirection() {
      if (this.props.direction === 'auto') {
        var client = _reactDom2.default.findDOMNode(this.refs.input).getBoundingClientRect();
        var screen_height = window.innerHeight || document.documentElement.offsetHeight;
        var up = client.top > screen_height / 2 + client.height;
        return up ? 'up' : 'down';
      } else {
        return this.props.direction;
      }
    }
  }, {
    key: 'query',
    value: function query(key) {
      return !this.props.multiple && key ? this.source().get(key) : '';
    }
  }, {
    key: 'suggestions',
    value: function suggestions() {
      var suggest = new Map();
      var query = this.state.query.toLowerCase().trim() || '';
      var values = this.values();
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this.source()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var _step$value = _slicedToArray(_step.value, 2);

          var key = _step$value[0];
          var value = _step$value[1];

          if (value.toLowerCase().trim().startsWith(query) && (!values.has(key) || !this.props.multiple)) {
            suggest.set(key, value);
          }
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

      return suggest;
    }
  }, {
    key: 'source',
    value: function source() {
      var src = this.props.source;

      if (src.hasOwnProperty('length')) {
        return new Map(src.map(function (item) {
          return Array.isArray(item) ? [].concat(_toConsumableArray(item)) : [item, item];
        }));
      } else {
        return new Map(Object.keys(src).map(function (key) {
          return [key, src[key]];
        }));
      }
    }
  }, {
    key: 'values',
    value: function values() {
      var valueMap = new Map();
      var vals = this.props.multiple ? this.props.value : [this.props.value];
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = this.source()[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var _step2$value = _slicedToArray(_step2.value, 2);

          var k = _step2$value[0];
          var v = _step2$value[1];

          if (vals.indexOf(k) !== -1) valueMap.set(k, v);
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }

      return valueMap;
    }
  }, {
    key: 'select',
    value: function select(key, event) {
      _events2.default.pauseEvent(event);
      var values = this.values(this.props.value);
      this.handleChange([key].concat(_toConsumableArray(values.keys())), event);
    }
  }, {
    key: 'unselect',
    value: function unselect(key, event) {
      if (!this.props.disabled) {
        var values = this.values(this.props.value);
        values.delete(key);
        this.handleChange([].concat(_toConsumableArray(values.keys())), event);
      }
    }
  }, {
    key: 'renderSelected',
    value: function renderSelected() {
      var _this2 = this;

      if (this.props.multiple) {
        var selectedItems = [].concat(_toConsumableArray(this.values())).map(function (_ref) {
          var _ref2 = _slicedToArray(_ref, 2);

          var key = _ref2[0];
          var value = _ref2[1];

          return _react2.default.createElement(
            _chip2.default,
            {
              key: key,
              className: _style2.default.value,
              deletable: true,
              onDeleteClick: _this2.unselect.bind(_this2, key)
            },
            value
          );
        });

        return _react2.default.createElement(
          'ul',
          { className: _style2.default.values },
          selectedItems
        );
      }
    }
  }, {
    key: 'renderSuggestions',
    value: function renderSuggestions() {
      var _this3 = this;

      var suggestions = [].concat(_toConsumableArray(this.suggestions())).map(function (_ref3) {
        var _ref4 = _slicedToArray(_ref3, 2);

        var key = _ref4[0];
        var value = _ref4[1];

        var className = (0, _classnames2.default)(_style2.default.suggestion, _defineProperty({}, _style2.default.active, _this3.state.active === key));
        return _react2.default.createElement(
          'li',
          {
            key: key,
            className: className,
            onMouseDown: _this3.select.bind(_this3, key),
            onMouseOver: _this3.handleSuggestionHover.bind(_this3, key)
          },
          value
        );
      });

      var className = (0, _classnames2.default)(_style2.default.suggestions, _defineProperty({}, _style2.default.up, this.state.direction === 'up'));
      return _react2.default.createElement(
        'ul',
        { ref: 'suggestions', className: className },
        suggestions
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props;
      var error = _props.error;
      var label = _props.label;

      var other = _objectWithoutProperties(_props, ['error', 'label']);

      var className = (0, _classnames2.default)(_style2.default.root, _defineProperty({}, _style2.default.focus, this.state.focus), this.props.className);

      return _react2.default.createElement(
        'div',
        { 'data-react-toolbox': 'autocomplete', className: className },
        this.props.selectedPosition === 'above' ? this.renderSelected() : null,
        _react2.default.createElement(_input2.default, _extends({}, other, {
          ref: 'input',
          className: _style2.default.input,
          error: error,
          label: label,
          onBlur: this.handleQueryBlur,
          onChange: this.handleQueryChange,
          onFocus: this.handleQueryFocus,
          onKeyUp: this.handleQueryKeyUp,
          value: this.state.query
        })),
        this.renderSuggestions(),
        this.props.selectedPosition === 'below' ? this.renderSelected() : null
      );
    }
  }]);

  return Autocomplete;
}(_react2.default.Component);

Autocomplete.propTypes = {
  className: _react2.default.PropTypes.string,
  direction: _react2.default.PropTypes.oneOf(['auto', 'up', 'down']),
  disabled: _react2.default.PropTypes.bool,
  error: _react2.default.PropTypes.string,
  label: _react2.default.PropTypes.string,
  multiple: _react2.default.PropTypes.bool,
  onChange: _react2.default.PropTypes.func,
  selectedPosition: _react2.default.PropTypes.oneOf(['above', 'below']),
  source: _react2.default.PropTypes.any,
  value: _react2.default.PropTypes.any
};
Autocomplete.defaultProps = {
  className: '',
  direction: 'auto',
  selectedPosition: 'above',
  multiple: true,
  source: {}
};
exports.default = Autocomplete;