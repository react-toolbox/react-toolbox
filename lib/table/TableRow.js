'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TableRow = exports.tableRowFactory = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames2 = require('classnames');

var _classnames3 = _interopRequireDefault(_classnames2);

var _reactCssThemr = require('react-css-themr');

var _identifiers = require('../identifiers');

var _Checkbox = require('../checkbox/Checkbox');

var _Checkbox2 = _interopRequireDefault(_Checkbox);

var _TableCell = require('./TableCell');

var _TableCell2 = _interopRequireDefault(_TableCell);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var factory = function factory(Checkbox, TableCell) {
  var TableRow = function (_Component) {
    _inherits(TableRow, _Component);

    function TableRow() {
      var _ref;

      var _temp, _this, _ret;

      _classCallCheck(this, TableRow);

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = TableRow.__proto__ || Object.getPrototypeOf(TableRow)).call.apply(_ref, [this].concat(args))), _this), _this.handleSelect = function (value) {
        var _this$props = _this.props,
            idx = _this$props.idx,
            onSelect = _this$props.onSelect;

        if (onSelect) onSelect(idx, value);
      }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(TableRow, [{
      key: 'render',
      value: function render() {
        var _props = this.props,
            children = _props.children,
            className = _props.className,
            selectable = _props.selectable,
            idx = _props.idx,
            selected = _props.selected,
            theme = _props.theme,
            other = _objectWithoutProperties(_props, ['children', 'className', 'selectable', 'idx', 'selected', 'theme']); // eslint-disable-line


        var _className = (0, _classnames3.default)(theme.row, _defineProperty({}, theme.selected, selectable && selected), className);
        return _react2.default.createElement(
          'tr',
          _extends({}, other, { className: _className }),
          selectable && _react2.default.createElement(
            TableCell,
            { className: theme.checkboxCell },
            _react2.default.createElement(Checkbox, { theme: theme, checked: selected, onChange: this.handleSelect })
          ),
          _react2.default.Children.map(children, function (child, index) {
            if (!child) return null;
            return (0, _react.cloneElement)(child, {
              column: index,
              tagName: 'td'
            });
          })
        );
      }
    }]);

    return TableRow;
  }(_react.Component);

  TableRow.propTypes = {
    children: _propTypes2.default.node,
    className: _propTypes2.default.string,
    idx: _propTypes2.default.number,
    onSelect: _propTypes2.default.func,
    selectable: _propTypes2.default.bool,
    selected: _propTypes2.default.bool,
    theme: _propTypes2.default.shape({
      checkboxCell: _propTypes2.default.string,
      row: _propTypes2.default.string,
      selected: _propTypes2.default.string
    })
  };


  return TableRow;
};

var TableRow = factory(_Checkbox2.default, _TableCell2.default);
exports.default = (0, _reactCssThemr.themr)(_identifiers.TABLE)(TableRow);
exports.tableRowFactory = factory;
exports.TableRow = TableRow;