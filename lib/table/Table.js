'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Table = exports.tableFactory = undefined;

var _redboxReact2 = require('redbox-react');

var _redboxReact3 = _interopRequireDefault(_redboxReact2);

var _reactTransformCatchErrors3 = require('react-transform-catch-errors');

var _reactTransformCatchErrors4 = _interopRequireDefault(_reactTransformCatchErrors3);

var _react2 = require('react');

var _react3 = _interopRequireDefault(_react2);

var _reactTransformHmr3 = require('react-transform-hmr');

var _reactTransformHmr4 = _interopRequireDefault(_reactTransformHmr3);

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _reactCssThemr = require('react-css-themr');

var _identifiers = require('../identifiers.js');

var _Checkbox = require('../checkbox/Checkbox.js');

var _Checkbox2 = _interopRequireDefault(_Checkbox);

var _TableHead = require('./TableHead.js');

var _TableHead2 = _interopRequireDefault(_TableHead);

var _TableRow = require('./TableRow.js');

var _TableRow2 = _interopRequireDefault(_TableRow);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _components = {
  Table: {
    displayName: 'Table',
    isInFunction: true
  }
};

var _reactTransformHmr2 = (0, _reactTransformHmr4.default)({
  filename: 'components/table/Table.js',
  components: _components,
  locals: [module],
  imports: [_react3.default]
});

var _reactTransformCatchErrors2 = (0, _reactTransformCatchErrors4.default)({
  filename: 'components/table/Table.js',
  components: _components,
  locals: [],
  imports: [_react3.default, _redboxReact3.default]
});

function _wrapComponent(id) {
  return function (Component) {
    return _reactTransformHmr2(_reactTransformCatchErrors2(Component, id), id);
  };
}

var factory = function factory(TableHead, TableRow) {
  var _class, _temp2;

  var Table = _wrapComponent('Table')((_temp2 = _class = function (_Component) {
    _inherits(Table, _Component);

    function Table() {
      var _ref;

      var _temp, _this, _ret;

      _classCallCheck(this, Table);

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Table.__proto__ || Object.getPrototypeOf(Table)).call.apply(_ref, [this].concat(args))), _this), _this.handleFullSelect = function () {
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
          var newSelection = [].concat(_toConsumableArray(_this.props.selected));
          if (_this.props.multiSelectable) {
            (function () {
              var position = _this.props.selected.indexOf(index);
              newSelection = position !== -1 ? newSelection.filter(function (el, idx) {
                return idx !== position;
              }) : newSelection.concat([index]);
            })();
          } else {
            newSelection = [index];
          }
          _this.props.onSelect(newSelection);
        }
      }, _this.handleRowChange = function (index, key, value) {
        if (_this.props.onChange) {
          _this.props.onChange(index, key, value);
        }
      }, _this.handleRowClick = function (index, event) {
        if (_this.props.onRowClick) {
          _this.props.onRowClick(index, event);
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
          var multiSelectable = _props.multiSelectable;

          var isSelected = selected.length === source.length;
          return _react3.default.createElement(TableHead, {
            model: model,
            onSelect: this.handleFullSelect,
            selectable: selectable,
            multiSelectable: multiSelectable,
            selected: isSelected,
            theme: this.props.theme
          });
        }
      }
    }, {
      key: 'renderBody',
      value: function renderBody() {
        var _this2 = this;

        var _props2 = this.props;
        var source = _props2.source;
        var model = _props2.model;
        var onChange = _props2.onChange;
        var selectable = _props2.selectable;
        var selected = _props2.selected;
        var theme = _props2.theme;

        return _react3.default.createElement(
          'tbody',
          null,
          source.map(function (data, index) {
            return _react3.default.createElement(TableRow, {
              data: data,
              index: index,
              key: index,
              model: model,
              onChange: onChange ? _this2.handleRowChange.bind(_this2) : undefined,
              onSelect: _this2.handleRowSelect.bind(_this2, index),
              onRowClick: _this2.handleRowClick.bind(_this2, index),
              selectable: selectable,
              selected: selected.indexOf(index) !== -1,
              theme: theme
            });
          })
        );
      }
    }, {
      key: 'render',
      value: function render() {
        var _props3 = this.props;
        var className = _props3.className;
        var theme = _props3.theme;

        return _react3.default.createElement(
          'table',
          { 'data-react-toolbox': 'table', className: (0, _classnames2.default)(theme.table, className) },
          this.renderHead(),
          this.renderBody()
        );
      }
    }]);

    return Table;
  }(_react2.Component), _class.propTypes = {
    className: _react2.PropTypes.string,
    heading: _react2.PropTypes.bool,
    model: _react2.PropTypes.object,
    multiSelectable: _react2.PropTypes.bool,
    onChange: _react2.PropTypes.func,
    onRowClick: _react2.PropTypes.func,
    onSelect: _react2.PropTypes.func,
    selectable: _react2.PropTypes.bool,
    selected: _react2.PropTypes.array,
    source: _react2.PropTypes.array,
    theme: _react2.PropTypes.shape({
      table: _react2.PropTypes.string
    })
  }, _class.defaultProps = {
    className: '',
    heading: true,
    selectable: true,
    multiSelectable: true,
    selected: [],
    source: []
  }, _temp2));

  return Table;
};

var TableHead = (0, _TableHead2.default)(_Checkbox2.default);
var TableRow = (0, _TableRow2.default)(_Checkbox2.default);
var Table = factory(TableHead, TableRow);

exports.default = (0, _reactCssThemr.themr)(_identifiers.TABLE)(Table);
exports.tableFactory = factory;
exports.Table = Table;