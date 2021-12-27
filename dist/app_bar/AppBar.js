'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AppBar = exports.appBarFactory = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _reactCssThemr = require('react-css-themr');

var _identifiers = require('../identifiers');

var _IconButton = require('../button/IconButton');

var _IconButton2 = _interopRequireDefault(_IconButton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var factory = function factory(IconButton) {
  var AppBar = function (_React$Component) {
    _inherits(AppBar, _React$Component);

    function AppBar() {
      var _ref;

      var _temp, _this, _ret;

      _classCallCheck(this, AppBar);

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = AppBar.__proto__ || Object.getPrototypeOf(AppBar)).call.apply(_ref, [this].concat(args))), _this), _this.state = { hidden: false, height: 0 }, _this.handleScroll = function () {
        var scrollDiff = _this.curScroll - window.scrollY;
        var hidden = scrollDiff < 0 && window.scrollY !== undefined && window.scrollY > _this.state.height;
        _this.setState({ hidden: hidden });
        _this.curScroll = window.scrollY;
      }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(AppBar, [{
      key: 'componentDidMount',
      value: function componentDidMount() {
        if (this.props.scrollHide) {
          this.initializeScroll();
        }
      }
    }, {
      key: 'componentWillReceiveProps',
      value: function componentWillReceiveProps(nextProps) {
        if (!this.props.scrollHide && nextProps.scrollHide) {
          this.initializeScroll();
        }

        if (this.props.scrollHide && !nextProps.scrollHide) {
          this.endScroll();
        }
      }
    }, {
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        if (this.props.scrollHide) {
          this.endScroll();
        }
      }
    }, {
      key: 'initializeScroll',
      value: function initializeScroll() {
        window.addEventListener('scroll', this.handleScroll);

        var _rootNode$getBounding = this.rootNode.getBoundingClientRect(),
            height = _rootNode$getBounding.height;

        this.curScroll = window.scrollY;
        this.setState({ height: height });
      }
    }, {
      key: 'endScroll',
      value: function endScroll() {
        window.removeEventListener('scroll', this.handleScroll);
      }
    }, {
      key: 'render',
      value: function render() {
        var _cn,
            _this2 = this;

        var _props = this.props,
            children = _props.children,
            leftIcon = _props.leftIcon,
            onLeftIconClick = _props.onLeftIconClick,
            onRightIconClick = _props.onRightIconClick,
            rightIcon = _props.rightIcon,
            theme = _props.theme,
            title = _props.title;


        var className = (0, _classnames2.default)(theme.appBar, (_cn = {}, _defineProperty(_cn, theme.fixed, this.props.fixed), _defineProperty(_cn, theme.flat, this.props.flat), _defineProperty(_cn, theme.scrollHide, this.state.hidden), _cn), this.props.className);

        var renderedTitle = typeof title === 'string' ? _react2.default.createElement(
          'h1',
          { className: (0, _classnames2.default)(theme.title) },
          title
        ) : title;

        var renderedLeftIcon = leftIcon && _react2.default.createElement(IconButton, {
          inverse: true,
          className: (0, _classnames2.default)(theme.leftIcon),
          onClick: onLeftIconClick,
          icon: leftIcon
        });

        var renderedRightIcon = rightIcon && _react2.default.createElement(IconButton, {
          inverse: true,
          className: (0, _classnames2.default)(theme.rightIcon),
          onClick: onRightIconClick,
          icon: rightIcon
        });

        return _react2.default.createElement(
          'header',
          {
            className: className,
            'data-react-toolbox': 'app-bar',
            ref: function ref(node) {
              _this2.rootNode = node;
            }
          },
          _react2.default.createElement(
            'div',
            { className: theme.inner },
            renderedLeftIcon,
            renderedTitle,
            children,
            renderedRightIcon
          )
        );
      }
    }]);

    return AppBar;
  }(_react2.default.Component);

  AppBar.propTypes = {
    children: _propTypes2.default.node,
    className: _propTypes2.default.string,
    fixed: _propTypes2.default.bool,
    flat: _propTypes2.default.bool,
    leftIcon: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.element]),
    onLeftIconClick: _propTypes2.default.func,
    onRightIconClick: _propTypes2.default.func,
    rightIcon: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.element]),
    scrollHide: _propTypes2.default.bool,
    theme: _propTypes2.default.shape({
      appBar: _propTypes2.default.string,
      inner: _propTypes2.default.string,
      fixed: _propTypes2.default.string,
      flat: _propTypes2.default.string,
      leftIcon: _propTypes2.default.string,
      rightIcon: _propTypes2.default.string,
      scrollHide: _propTypes2.default.string,
      title: _propTypes2.default.string
    }),
    title: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.element])
  };
  AppBar.defaultProps = {
    className: '',
    fixed: false,
    flat: false,
    scrollHide: false
  };


  return AppBar;
};

var AppBar = factory(_IconButton2.default);
exports.default = (0, _reactCssThemr.themr)(_identifiers.APP_BAR)(AppBar);
exports.appBarFactory = factory;
exports.AppBar = AppBar;