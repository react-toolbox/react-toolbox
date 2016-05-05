'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _style = require('./style');

var _style2 = _interopRequireDefault(_style);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TabHeader = function (_React$Component) {
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

      return _react2.default.createElement(
        'label',
        { 'data-react-toolbox': 'tab', className: className, onClick: this.handleClick },
        this.props.label
      );
    }
  }]);

  return TabHeader;
}(_react2.default.Component);

TabHeader.propTypes = {
  active: _react2.default.PropTypes.bool,
  activeClassName: _react2.default.PropTypes.string,
  className: _react2.default.PropTypes.string,
  disabled: _react2.default.PropTypes.bool,
  hidden: _react2.default.PropTypes.bool,
  label: _react2.default.PropTypes.any.isRequired,
  onActive: _react2.default.PropTypes.func,
  onClick: _react2.default.PropTypes.func
};
TabHeader.defaultProps = {
  active: false,
  className: '',
  disabled: false,
  hidden: false
};
exports.default = TabHeader;