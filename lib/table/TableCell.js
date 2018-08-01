'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TableCell = exports.tableCellFactory = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

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
        var _this$props = _this.props,
            onClick = _this$props.onClick,
            row = _this$props.row,
            column = _this$props.column;

        if (onClick) onClick(event, column, row);
      }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(TableCell, [{
      key: 'render',
      value: function render() {
        var _classnames;

        var _props = this.props,
            children = _props.children,
            className = _props.className,
            numeric = _props.numeric,
            row = _props.row,
            column = _props.column,
            sorted = _props.sorted,
            tagName = _props.tagName,
            theme = _props.theme,
            other = _objectWithoutProperties(_props, ['children', 'className', 'numeric', 'row', 'column', 'sorted', 'tagName', 'theme']);

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
    children: _propTypes2.default.node,
    className: _propTypes2.default.string,
    column: _propTypes2.default.number,
    numeric: _propTypes2.default.bool,
    onClick: _propTypes2.default.func,
    row: _propTypes2.default.number,
    sorted: _propTypes2.default.oneOf([ASC, DESC]),
    tagName: _propTypes2.default.oneOf(['td', 'th']),
    theme: _propTypes2.default.shape({
      asc: _propTypes2.default.string,
      headCell: _propTypes2.default.string,
      numeric: _propTypes2.default.string,
      rowCell: _propTypes2.default.string,
      sorted: _propTypes2.default.string,
      sortIcon: _propTypes2.default.string,
      tableCell: _propTypes2.default.string
    })
  };
  TableCell.defaultProps = {
    children: _propTypes2.default.node,
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