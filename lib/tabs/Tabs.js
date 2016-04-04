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

var _Tab = require('./Tab');

var _Tab2 = _interopRequireDefault(_Tab);

var _TabContent = require('./TabContent');

var _TabContent2 = _interopRequireDefault(_TabContent);

var _style = require('./style');

var _style2 = _interopRequireDefault(_style);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _components = {
  Tabs: {
    displayName: 'Tabs'
  }
};

var _reactTransformHmr2 = (0, _reactTransformHmr4.default)({
  filename: 'components/tabs/Tabs.jsx',
  components: _components,
  locals: [module],
  imports: [_react3.default]
});

var _reactTransformCatchErrors2 = (0, _reactTransformCatchErrors4.default)({
  filename: 'components/tabs/Tabs.jsx',
  components: _components,
  locals: [],
  imports: [_react3.default, _redboxReact3.default]
});

function _wrapComponent(id) {
  return function (Component) {
    return _reactTransformHmr2(_reactTransformCatchErrors2(Component, id), id);
  };
}

var Tabs = _wrapComponent('Tabs')((_temp2 = _class = function (_React$Component) {
  _inherits(Tabs, _React$Component);

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

      _react3.default.Children.forEach(this.props.children, function (item) {
        if (item.type === _Tab2.default) {
          headers.push(item);
          if (item.props.children) {
            contents.push(_react3.default.createElement(_TabContent2.default, { children: item.props.children }));
          }
        } else if (item.type === _TabContent2.default) {
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
        return _react3.default.cloneElement(item, {
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

      return _react3.default.cloneElement(contents[activeIdx], {
        key: activeIdx,
        active: true,
        tabIndex: activeIdx
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var className = _style2.default.root;

      var _parseChildren = this.parseChildren();

      var headers = _parseChildren.headers;
      var contents = _parseChildren.contents;

      if (this.props.className) className += ' ' + this.props.className;

      return _react3.default.createElement(
        'div',
        { ref: 'tabs', 'data-react-toolbox': 'tabs', className: className },
        _react3.default.createElement(
          'nav',
          { className: _style2.default.navigation, ref: 'navigation' },
          this.renderHeaders(headers)
        ),
        _react3.default.createElement('span', { className: _style2.default.pointer, style: this.state.pointer }),
        this.renderContents(contents)
      );
    }
  }]);

  return Tabs;
}(_react3.default.Component), _class.propTypes = {
  children: _react3.default.PropTypes.node,
  className: _react3.default.PropTypes.string,
  disableAnimatedBottomBorder: _react3.default.PropTypes.bool,
  index: _react3.default.PropTypes.number,
  onChange: _react3.default.PropTypes.func
}, _class.defaultProps = {
  index: 0
}, _temp2));

exports.default = Tabs;