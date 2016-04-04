'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _checkbox = require('../checkbox');

var _checkbox2 = _interopRequireDefault(_checkbox);

var _utils = require('../utils/utils');

var _utils2 = _interopRequireDefault(_utils);

var _style = require('./style');

var _style2 = _interopRequireDefault(_style);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TableRow = function (_React$Component) {
  _inherits(TableRow, _React$Component);

  function TableRow() {
    var _Object$getPrototypeO;

    var _temp, _this, _ret;

    _classCallCheck(this, TableRow);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(TableRow)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.handleInputChange = function (index, key, type, event) {
      var value = type === 'checkbox' ? event.target.checked : event.target.value;
      var onChange = _this.props.model[key].onChange || _this.props.onChange;
      onChange(index, key, value);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(TableRow, [{
    key: 'renderSelectCell',
    value: function renderSelectCell() {
      if (this.props.selectable) {
        return _react2.default.createElement(
          'td',
          { className: _style2.default.selectable },
          _react2.default.createElement(_checkbox2.default, { checked: this.props.selected, onChange: this.props.onSelect })
        );
      }
    }
  }, {
    key: 'renderCells',
    value: function renderCells() {
      var _this2 = this;

      return Object.keys(this.props.model).map(function (key) {
        return _react2.default.createElement(
          'td',
          { key: key },
          _this2.renderCell(key)
        );
      });
    }
  }, {
    key: 'renderCell',
    value: function renderCell(key) {
      var value = this.props.data[key];

      // if the value is a valid React element return it directly, since it
      // cannot be edited and should not be converted to a string...
      if (_react2.default.isValidElement(value)) {
        return value;
      }

      var onChange = this.props.model[key].onChange || this.props.onChange;
      if (onChange) {
        return this.renderInput(key, value);
      } else if (value) {
        return value.toString();
      }
    }
  }, {
    key: 'renderInput',
    value: function renderInput(key, value) {
      var index = this.props.index;
      var inputType = _utils2.default.inputTypeForPrototype(this.props.model[key].type);
      var inputValue = _utils2.default.prepareValueForInput(value, inputType);
      var checked = inputType === 'checkbox' && value ? true : null;
      return _react2.default.createElement('input', {
        checked: checked,
        onChange: this.handleInputChange.bind(null, index, key, inputType),
        type: inputType,
        value: inputValue
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _ClassNames;

      var className = (0, _classnames2.default)(_style2.default.row, (_ClassNames = {}, _defineProperty(_ClassNames, _style2.default.editable, this.props.onChange), _defineProperty(_ClassNames, _style2.default.selected, this.props.selected), _ClassNames));

      return _react2.default.createElement(
        'tr',
        { 'data-react-toolbox-table': 'row', className: className },
        this.renderSelectCell(),
        this.renderCells()
      );
    }
  }]);

  return TableRow;
}(_react2.default.Component);

TableRow.propTypes = {
  data: _react2.default.PropTypes.object,
  index: _react2.default.PropTypes.number,
  model: _react2.default.PropTypes.object,
  onChange: _react2.default.PropTypes.func,
  onSelect: _react2.default.PropTypes.func,
  selectable: _react2.default.PropTypes.bool,
  selected: _react2.default.PropTypes.bool
};
exports.default = TableRow;