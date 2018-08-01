'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Tabs = exports.tabsFactory = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames3 = require('classnames');

var _classnames4 = _interopRequireDefault(_classnames3);

var _reactCssThemr = require('react-css-themr');

var _identifiers = require('../identifiers');

var _FontIcon = require('../font_icon/FontIcon');

var _FontIcon2 = _interopRequireDefault(_FontIcon);

var _isComponentOfType = require('../utils/is-component-of-type');

var _isComponentOfType2 = _interopRequireDefault(_isComponentOfType);

var _Tab = require('./Tab');

var _Tab2 = _interopRequireDefault(_Tab);

var _TabContent = require('./TabContent');

var _TabContent2 = _interopRequireDefault(_TabContent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var factory = function factory(Tab, TabContent, FontIcon) {
  var isTab = function isTab(child) {
    return (0, _isComponentOfType2.default)(Tab, child);
  };
  var isTabContent = function isTabContent(child) {
    return (0, _isComponentOfType2.default)(TabContent, child);
  };

  var Tabs = function (_Component) {
    _inherits(Tabs, _Component);

    function Tabs() {
      var _ref;

      var _temp, _this, _ret;

      _classCallCheck(this, Tabs);

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Tabs.__proto__ || Object.getPrototypeOf(Tabs)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
        pointer: {},
        arrows: {}
      }, _this.handleHeaderClick = function (idx) {
        if (_this.props.onChange) {
          _this.props.onChange(idx);
        }
      }, _this.handleResize = function () {
        if (_this.resizeTimeout) clearTimeout(_this.resizeTimeout);
        _this.resizeTimeout = setTimeout(function () {
          _this.updatePointer(_this.props.index);
          _this.updateArrows();
        }, 100);
      }, _this.updatePointer = function (idx) {
        if (_this.navigationNode && _this.navigationNode.children[idx]) {
          _this.updatePointerAnimationFrame = window.requestAnimationFrame(function () {
            var nav = _this.navigationNode.getBoundingClientRect();
            var label = _this.navigationNode.children[idx].getBoundingClientRect();
            var scrollLeft = _this.navigationNode.scrollLeft;
            _this.setState({
              pointer: {
                top: nav.height + 'px',
                left: label.left + scrollLeft - nav.left + 'px',
                width: label.width + 'px'
              }
            });
          });
        }
      }, _this.updateArrows = function () {
        var idx = _this.navigationNode.children.length - 2;

        if (idx >= 0) {
          var scrollLeft = _this.navigationNode.scrollLeft;
          var nav = _this.navigationNode.getBoundingClientRect();
          var lastLabel = _this.navigationNode.children[idx].getBoundingClientRect();

          _this.setState({
            arrows: {
              left: scrollLeft > 0,
              right: nav.right < lastLabel.right - 5
            }
          });
        }
      }, _this.scrollNavigation = function (factor) {
        var oldScrollLeft = _this.navigationNode.scrollLeft;
        _this.navigationNode.scrollLeft += factor * _this.navigationNode.clientWidth;
        if (_this.navigationNode.scrollLeft !== oldScrollLeft) {
          _this.updateArrows();
        }
      }, _this.scrollRight = function () {
        return _this.scrollNavigation(-1);
      }, _this.scrollLeft = function () {
        return _this.scrollNavigation(+1);
      }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Tabs, [{
      key: 'componentDidMount',
      value: function componentDidMount() {
        window.addEventListener('resize', this.handleResize);
        this.handleResize();
      }
    }, {
      key: 'componentDidUpdate',
      value: function componentDidUpdate(prevProps) {
        var _props = this.props,
            index = _props.index,
            children = _props.children;
        var prevIndex = prevProps.index,
            prevChildren = prevProps.children;


        if (index !== prevIndex || children !== prevChildren) {
          this.updatePointer(index);
        }
      }
    }, {
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        window.removeEventListener('resize', this.handleResize);
        clearTimeout(this.resizeTimeout);
        if (this.updatePointerAnimationFrame) cancelAnimationFrame(this.updatePointerAnimationFrame);
      }
    }, {
      key: 'parseChildren',
      value: function parseChildren() {
        var _this2 = this;

        var headers = [];
        var contents = [];

        _react2.default.Children.forEach(this.props.children, function (item) {
          if (isTab(item)) {
            headers.push(item);
            if (item.props.children) {
              contents.push(_react2.default.createElement(
                TabContent,
                { theme: _this2.props.theme },
                item.props.children
              ));
            }
          } else if (isTabContent(item)) {
            contents.push(item);
          }
        });

        return { headers: headers, contents: contents };
      }
    }, {
      key: 'renderHeaders',
      value: function renderHeaders(headers) {
        var _this3 = this;

        return headers.map(function (item, idx) {
          return _react2.default.cloneElement(item, {
            children: null,
            key: idx, // eslint-disable-line
            index: idx,
            theme: _this3.props.theme,
            active: _this3.props.index === idx,
            onClick: function onClick(event, index) {
              _this3.handleHeaderClick(index);
              if (item.props.onClick) item.props.onClick(event);
            }
          });
        });
      }
    }, {
      key: 'renderContents',
      value: function renderContents(contents) {
        var _this4 = this;

        var contentElements = contents.map(function (item, idx) {
          return _react2.default.cloneElement(item, {
            key: idx, // eslint-disable-line
            theme: _this4.props.theme,
            active: _this4.props.index === idx,
            hidden: _this4.props.index !== idx && _this4.props.hideMode === 'display',
            tabIndex: idx
          });
        });

        return this.props.hideMode === 'display' ? contentElements : contentElements.filter(function (item, idx) {
          return idx === _this4.props.index;
        });
      }
    }, {
      key: 'render',
      value: function render() {
        var _classnames2,
            _this5 = this;

        var _props2 = this.props,
            className = _props2.className,
            disableAnimatedBottomBorder = _props2.disableAnimatedBottomBorder,
            theme = _props2.theme,
            fixed = _props2.fixed,
            inverse = _props2.inverse;
        var _state$arrows = this.state.arrows,
            hasLeftArrow = _state$arrows.left,
            hasRightArrow = _state$arrows.right;

        var _parseChildren = this.parseChildren(),
            headers = _parseChildren.headers,
            contents = _parseChildren.contents;

        var classNamePointer = (0, _classnames4.default)(theme.pointer, _defineProperty({}, theme.disableAnimation, disableAnimatedBottomBorder));

        var classNames = (0, _classnames4.default)(theme.tabs, (_classnames2 = {}, _defineProperty(_classnames2, theme.fixed, fixed), _defineProperty(_classnames2, theme.inverse, inverse), _classnames2), className);

        return _react2.default.createElement(
          'div',
          { 'data-react-toolbox': 'tabs', className: classNames },
          _react2.default.createElement(
            'div',
            { className: theme.navigationContainer },
            hasLeftArrow && _react2.default.createElement(
              'div',
              { className: theme.arrowContainer, onClick: this.scrollRight },
              _react2.default.createElement(FontIcon, { className: theme.arrow, value: 'keyboard_arrow_left' })
            ),
            _react2.default.createElement(
              'div',
              { className: theme.navigation, role: 'tablist', ref: function ref(node) {
                  _this5.navigationNode = node;
                } },
              this.renderHeaders(headers),
              _react2.default.createElement('span', { className: classNamePointer, style: this.state.pointer })
            ),
            hasRightArrow && _react2.default.createElement(
              'div',
              { className: theme.arrowContainer, onClick: this.scrollLeft },
              _react2.default.createElement(FontIcon, { className: theme.arrow, value: 'keyboard_arrow_right' })
            )
          ),
          this.renderContents(contents)
        );
      }
    }]);

    return Tabs;
  }(_react.Component);

  Tabs.propTypes = {
    children: _propTypes2.default.node,
    className: _propTypes2.default.string,
    disableAnimatedBottomBorder: _propTypes2.default.bool,
    fixed: _propTypes2.default.bool,
    hideMode: _propTypes2.default.oneOf(['display', 'unmounted']),
    index: _propTypes2.default.number,
    inverse: _propTypes2.default.bool,
    onChange: _propTypes2.default.func,
    theme: _propTypes2.default.shape({
      arrow: _propTypes2.default.string,
      arrowContainer: _propTypes2.default.string,
      disableAnimation: _propTypes2.default.string,
      fixed: _propTypes2.default.string,
      inverse: _propTypes2.default.string,
      navigation: _propTypes2.default.string,
      navigationContainer: _propTypes2.default.string,
      pointer: _propTypes2.default.string,
      tabs: _propTypes2.default.string
    })
  };
  Tabs.defaultProps = {
    index: 0,
    fixed: false,
    inverse: false,
    hideMode: 'unmounted'
  };


  return Tabs;
};

var Tabs = factory(_Tab2.default, _TabContent2.default, _FontIcon2.default);
exports.default = (0, _reactCssThemr.themr)(_identifiers.TABS)(Tabs);
exports.tabsFactory = factory;
exports.Tabs = Tabs;