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

var _components = {
  TableRow: {
    displayName: 'TableRow'
  }
};

var _reactTransformHmr2 = (0, _reactTransformHmr4.default)({
  filename: 'components/table/TableRow.jsx',
  components: _components,
  locals: [module],
  imports: [_react3.default]
});

var _reactTransformCatchErrors2 = (0, _reactTransformCatchErrors4.default)({
  filename: 'components/table/TableRow.jsx',
  components: _components,
  locals: [],
  imports: [_react3.default, _redboxReact3.default]
});

function _wrapComponent(id) {
  return function (Component) {
    return _reactTransformHmr2(_reactTransformCatchErrors2(Component, id), id);
  };
}

var TableRow = _wrapComponent('TableRow')((_temp2 = _class = function (_React$Component) {
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
        return _react3.default.createElement(
          'td',
          { className: _style2.default.selectable },
          _react3.default.createElement(_checkbox2.default, { checked: this.props.selected, onChange: this.props.onSelect })
        );
      }
    }
  }, {
    key: 'renderCells',
    value: function renderCells() {
      var _this2 = this;

      return Object.keys(this.props.model).map(function (key) {
        return _react3.default.createElement(
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
      if (_react3.default.isValidElement(value)) {
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
      return _react3.default.createElement('input', {
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

      return _react3.default.createElement(
        'tr',
        { 'data-react-toolbox-table': 'row', className: className },
        this.renderSelectCell(),
        this.renderCells()
      );
    }
  }]);

  return TableRow;
}(_react3.default.Component), _class.propTypes = {
  data: _react3.default.PropTypes.object,
  index: _react3.default.PropTypes.number,
  model: _react3.default.PropTypes.object,
  onChange: _react3.default.PropTypes.func,
  onSelect: _react3.default.PropTypes.func,
  selectable: _react3.default.PropTypes.bool,
  selected: _react3.default.PropTypes.bool
}, _temp2));

exports.default = TableRow;