'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _TableHead = require('./TableHead');

var _TableHead2 = _interopRequireDefault(_TableHead);

var _TableRow = require('./TableRow');

var _TableRow2 = _interopRequireDefault(_TableRow);

var _style = require('./style');

var _style2 = _interopRequireDefault(_style);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Table = function (_React$Component) {
  _inherits(Table, _React$Component);

  function Table() {
    var _Object$getPrototypeO;

    var _temp, _this, _ret;

    _classCallCheck(this, Table);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(Table)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.handleFullSelect = function () {
      if (_this.props.onSelect) {
        var _this$props = _this.props;
        var source = _this$props.source;
        var selected = _this$props.selected;

        var newSelected = source.length === selected.length ? [] : source.map(function (i, idx) {
          return idx;
        });
        _this.props.onSelect(newSelected);
      }
    }, _this.handleRowSelect = function (index) {
      if (_this.props.onSelect) {
        var position = _this.props.selected.indexOf(index);
        var newSelected = [].concat(_toConsumableArray(_this.props.selected));
        if (position !== -1) newSelected.splice(position, 1);else newSelected.push(index);
        _this.props.onSelect(newSelected);
      }
    }, _this.handleRowChange = function (index, key, value) {
      if (_this.props.onChange) {
        _this.props.onChange(index, key, value);
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Table, [{
    key: 'renderHead',
    value: function renderHead() {
      if (this.props.heading) {
        var _props = this.props;
        var model = _props.model;
        var selected = _props.selected;
        var source = _props.source;
        var selectable = _props.selectable;

        var isSelected = selected.length === source.length;
        return _react2.default.createElement(_TableHead2.default, {
          model: model,
          onSelect: this.handleFullSelect,
          selectable: selectable,
          selected: isSelected
        });
      }
    }
  }, {
    key: 'renderBody',
    value: function renderBody() {
      var _this2 = this;

      var rows = this.props.source.map(function (data, index) {
        return _react2.default.createElement(_TableRow2.default, {
          data: data,
          index: index,
          key: index,
          model: _this2.props.model,
          onChange: _this2.props.onChange ? _this2.handleRowChange.bind(_this2) : undefined,
          onSelect: _this2.handleRowSelect.bind(_this2, index),
          selectable: _this2.props.selectable,
          selected: _this2.props.selected.indexOf(index) !== -1
        });
      });

      return _react2.default.createElement(
        'tbody',
        null,
        rows
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var className = _style2.default.root;
      if (this.props.className) className += ' ' + this.props.className;
      return _react2.default.createElement(
        'table',
        { 'data-react-toolbox': 'table', className: className },
        this.renderHead(),
        this.renderBody()
      );
    }
  }]);

  return Table;
}(_react2.default.Component);

Table.propTypes = {
  className: _react2.default.PropTypes.string,
  heading: _react2.default.PropTypes.bool,
  model: _react2.default.PropTypes.object,
  onChange: _react2.default.PropTypes.func,
  onSelect: _react2.default.PropTypes.func,
  selectable: _react2.default.PropTypes.bool,
  selected: _react2.default.PropTypes.array,
  source: _react2.default.PropTypes.array
};
Table.defaultProps = {
  className: '',
  heading: true,
  selectable: true,
  selected: [],
  source: []
};
exports.default = Table;