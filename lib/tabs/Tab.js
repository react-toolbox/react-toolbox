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

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _style = require('./style');

var _style2 = _interopRequireDefault(_style);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _components = {
  TabHeader: {
    displayName: 'TabHeader'
  }
};

var _reactTransformHmr2 = (0, _reactTransformHmr4.default)({
  filename: 'components/tabs/Tab.jsx',
  components: _components,
  locals: [module],
  imports: [_react3.default]
});

var _reactTransformCatchErrors2 = (0, _reactTransformCatchErrors4.default)({
  filename: 'components/tabs/Tab.jsx',
  components: _components,
  locals: [],
  imports: [_react3.default, _redboxReact3.default]
});

function _wrapComponent(id) {
  return function (Component) {
    return _reactTransformHmr2(_reactTransformCatchErrors2(Component, id), id);
  };
}

var TabHeader = _wrapComponent('TabHeader')((_temp2 = _class = function (_React$Component) {
  _inherits(TabHeader, _React$Component);

  function TabHeader() {
    var _Object$getPrototypeO;

    var _temp, _this, _ret;

    _classCallCheck(this, TabHeader);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(TabHeader)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.handleClick = function (event) {
      if (!_this.props.disabled && _this.props.onClick) {
        _this.props.onClick(event);
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(TabHeader, [{
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps) {
      if (!prevProps.active && this.props.active && this.props.onActive) {
        this.props.onActive();
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _ClassNames;

      var className = (0, _classnames2.default)(_style2.default.label, (_ClassNames = {}, _defineProperty(_ClassNames, _style2.default.active, this.props.active), _defineProperty(_ClassNames, _style2.default.hidden, this.props.hidden), _defineProperty(_ClassNames, _style2.default.disabled, this.props.disabled), _defineProperty(_ClassNames, this.props.activeClassName, this.props.active), _ClassNames), this.props.className);

      return _react3.default.createElement(
        'label',
        { 'data-react-toolbox': 'tab', className: className, onClick: this.handleClick },
        this.props.label
      );
    }
  }]);

  return TabHeader;
}(_react3.default.Component), _class.propTypes = {
  active: _react3.default.PropTypes.bool,
  activeClassName: _react3.default.PropTypes.string,
  className: _react3.default.PropTypes.string,
  disabled: _react3.default.PropTypes.bool,
  hidden: _react3.default.PropTypes.bool,
  label: _react3.default.PropTypes.any.isRequired,
  onActive: _react3.default.PropTypes.func,
  onClick: _react3.default.PropTypes.func
}, _class.defaultProps = {
  active: false,
  className: '',
  disabled: false,
  hidden: false
}, _temp2));

exports.default = TabHeader;