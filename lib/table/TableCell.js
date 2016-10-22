'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TableCell = exports.tableCellFactory = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames3 = require('classnames');

var _classnames4 = _interopRequireDefault(_classnames3);

var _reactCssThemr = require('react-css-themr');

var _identifiers = require('../identifiers.js');

var _FontIcon = require('../font_icon/FontIcon.js');

var _FontIcon2 = _interopRequireDefault(_FontIcon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ASC = 'asc';
var DESC = 'desc';

var factory = function factory(FontIcon) {
  var TableCell = function (_Component) {
    _inherits(TableCell, _Component);

    function TableCell() {
      var _ref;

      var _temp, _this, _ret;

      _classCallCheck(this, TableCell);

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = TableCell.__proto__ || Object.getPrototypeOf(TableCell)).call.apply(_ref, [this].concat(args))), _this), _this.handleClick = function (event) {
        var _this$props = _this.props;
        var onClick = _this$props.onClick;
        var row = _this$props.row;
        var column = _this$props.column;

        if (onClick) onClick(event, column, row);
      }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(TableCell, [{
      key: 'render',
      value: function render() {
        var _classnames;

        var _props = this.props;
        var children = _props.children;
        var className = _props.className;
        var numeric = _props.numeric;
        var row = _props.row;
        var column = _props.column;
        var sorted = _props.sorted;
        var tagName = _props.tagName;
        var theme = _props.theme;

        var other = _objectWithoutProperties(_props, ['children', 'className', 'numeric', 'row', 'column', 'sorted', 'tagName', 'theme']);

        var _className = (0, _classnames4.default)(theme.tableCell, (_classnames = {}, _defineProperty(_classnames, theme.headCell, tagName === 'th'), _defineProperty(_classnames, theme.rowCell, tagName === 'td'), _defineProperty(_classnames, theme.sorted, sorted), _defineProperty(_classnames, theme.numeric, numeric), _classnames), className);

        var props = _extends({}, other, {
          className: _className,
          onClick: this.handleClick
        });

        return _react2.default.createElement(tagName, props, [sorted && _react2.default.createElement(FontIcon, {
          className: (0, _classnames4.default)(theme.sortIcon, _defineProperty({}, theme.asc, sorted === ASC)),
          key: 'icon',
          value: 'arrow_downward'
        }), children]);
      }
    }]);

    return TableCell;
  }(_react.Component);

  TableCell.propTypes = {
    children: _react.PropTypes.any,
    className: _react.PropTypes.string,
    column: _react.PropTypes.number,
    numeric: _react.PropTypes.bool,
    onClick: _react.PropTypes.func,
    row: _react.PropTypes.number,
    sorted: _react.PropTypes.oneOf([ASC, DESC]),
    tagName: _react.PropTypes.oneOf(['td', 'th']),
    theme: _react.PropTypes.shape({
      asc: _react.PropTypes.string,
      headCell: _react.PropTypes.string,
      numeric: _react.PropTypes.string,
      rowCell: _react.PropTypes.string,
      sorted: _react.PropTypes.string,
      sortIcon: _react.PropTypes.string,
      tableCell: _react.PropTypes.string
    })
  };
  TableCell.defaultProps = {
    children: _react.PropTypes.node,
    className: '',
    numeric: false,
    tagName: 'td'
  };


  return TableCell;
};

var TableCell = factory(_FontIcon2.default);
exports.default = (0, _reactCssThemr.themr)(_identifiers.TABLE)(TableCell);
exports.tableCellFactory = factory;
exports.TableCell = TableCell;