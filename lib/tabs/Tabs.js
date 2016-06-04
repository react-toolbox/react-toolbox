'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Tabs = exports.tabsFactory = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _reactCssThemr = require('react-css-themr');

var _identifiers = require('../identifiers.js');

var _Tab = require('./Tab.js');

var _Tab2 = _interopRequireDefault(_Tab);

var _TabContent = require('./TabContent.js');

var _TabContent2 = _interopRequireDefault(_TabContent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var factory = function factory(Tab, TabContent) {
  var Tabs = function (_Component) {
    _inherits(Tabs, _Component);

    function Tabs() {
      var _Object$getPrototypeO;

      var _temp, _this, _ret;

      _classCallCheck(this, Tabs);

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(Tabs)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.state = {
        pointer: {}
      }, _this.handleHeaderClick = function (idx) {
        if (_this.props.onChange) _this.props.onChange(idx);
      }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Tabs, [{
      key: 'componentDidMount',
      value: function componentDidMount() {
        !this.props.disableAnimatedBottomBorder && this.updatePointer(this.props.index);
      }
    }, {
      key: 'componentWillReceiveProps',
      value: function componentWillReceiveProps(nextProps) {
        !this.props.disableAnimatedBottomBorder && this.updatePointer(nextProps.index);
      }
    }, {
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        clearTimeout(this.pointerTimeout);
      }
    }, {
      key: 'parseChildren',
      value: function parseChildren() {
        var headers = [];
        var contents = [];

        _react2.default.Children.forEach(this.props.children, function (item) {
          if (item.type === Tab) {
            headers.push(item);
            if (item.props.children) {
              contents.push(_react2.default.createElement(TabContent, { children: item.props.children }));
            }
          } else if (item.type === TabContent) {
            contents.push(item);
          }
        });

        return { headers: headers, contents: contents };
      }
    }, {
      key: 'updatePointer',
      value: function updatePointer(idx) {
        var _this2 = this;

        clearTimeout(this.pointerTimeout);
        this.pointerTimeout = setTimeout(function () {
          var startPoint = _this2.refs.tabs.getBoundingClientRect().left;
          var label = _this2.refs.navigation.children[idx].getBoundingClientRect();
          _this2.setState({
            pointer: {
              top: _this2.refs.navigation.getBoundingClientRect().height + 'px',
              left: label.left - startPoint + 'px',
              width: label.width + 'px'
            }
          });
        }, 20);
      }
    }, {
      key: 'renderHeaders',
      value: function renderHeaders(headers) {
        var _this3 = this;

        return headers.map(function (item, idx) {
          return _react2.default.cloneElement(item, {
            key: idx,
            active: _this3.props.index === idx,
            onClick: _this3.handleHeaderClick.bind(_this3, idx, item)
          });
        });
      }
    }, {
      key: 'renderContents',
      value: function renderContents(contents) {
        var _this4 = this;

        var activeIdx = contents.findIndex(function (item, idx) {
          return _this4.props.index === idx;
        });

        if (contents && contents[activeIdx]) {
          return _react2.default.cloneElement(contents[activeIdx], {
            key: activeIdx,
            active: true,
            tabIndex: activeIdx
          });
        }
      }
    }, {
      key: 'render',
      value: function render() {
        var _props = this.props;
        var className = _props.className;
        var theme = _props.theme;

        var _parseChildren = this.parseChildren();

        var headers = _parseChildren.headers;
        var contents = _parseChildren.contents;

        return _react2.default.createElement(
          'div',
          { ref: 'tabs', 'data-react-toolbox': 'tabs', className: (0, _classnames2.default)(theme.tabs, className) },
          _react2.default.createElement(
            'nav',
            { className: theme.navigation, ref: 'navigation' },
            this.renderHeaders(headers)
          ),
          _react2.default.createElement('span', { className: theme.pointer, style: this.state.pointer }),
          this.renderContents(contents)
        );
      }
    }]);

    return Tabs;
  }(_react.Component);

  Tabs.propTypes = {
    children: _react.PropTypes.node,
    className: _react.PropTypes.string,
    disableAnimatedBottomBorder: _react.PropTypes.bool,
    index: _react.PropTypes.number,
    onChange: _react.PropTypes.func,
    theme: _react.PropTypes.shape({
      navigation: _react.PropTypes.string,
      pointer: _react.PropTypes.string,
      tabs: _react.PropTypes.string
    })
  };
  Tabs.defaultProps = {
    index: 0
  };


  return Tabs;
};

var Tabs = factory(_Tab2.default, _TabContent2.default);
exports.default = (0, _reactCssThemr.themr)(_identifiers.TABS)(Tabs);
exports.tabsFactory = factory;
exports.Tabs = Tabs;