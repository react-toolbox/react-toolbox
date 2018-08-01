'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListCheckbox = exports.listCheckboxFactory = undefined;

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

var _ListItemContent = require('./ListItemContent');

var _ListItemContent2 = _interopRequireDefault(_ListItemContent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var factory = function factory(Checkbox, ListItemContent) {
  var ListCheckbox = function ListCheckbox(_ref) {
    var caption = _ref.caption,
        checked = _ref.checked,
        className = _ref.className,
        disabled = _ref.disabled,
        legend = _ref.legend,
        name = _ref.name,
        onBlur = _ref.onBlur,
        onChange = _ref.onChange,
        onFocus = _ref.onFocus,
        theme = _ref.theme;

    var _className = (0, _classnames3.default)(theme.item, theme.checkboxItem, _defineProperty({}, theme.disabled, disabled), className);

    return _react2.default.createElement(
      'li',
      { className: _className },
      _react2.default.createElement(Checkbox, {
        checked: checked,
        className: theme.checkbox,
        disabled: disabled,
        label: _react2.default.createElement(ListItemContent, { caption: caption, legend: legend }),
        name: name,
        onBlur: onBlur,
        onChange: onChange,
        onFocus: onFocus
      })
    );
  };

  ListCheckbox.propTypes = {
    caption: _propTypes2.default.string,
    checked: _propTypes2.default.bool,
    className: _propTypes2.default.string,
    disabled: _propTypes2.default.bool,
    legend: _propTypes2.default.string,
    name: _propTypes2.default.string,
    onBlur: _propTypes2.default.func,
    onChange: _propTypes2.default.func,
    onFocus: _propTypes2.default.func,
    theme: _propTypes2.default.shape({
      checkbox: _propTypes2.default.string,
      checkboxItem: _propTypes2.default.string,
      disabled: _propTypes2.default.string,
      item: _propTypes2.default.string
    })
  };

  ListCheckbox.defaultProps = {
    checked: false,
    disabled: false
  };

  return ListCheckbox;
};

var ListCheckbox = factory(_Checkbox2.default, _ListItemContent2.default);

exports.default = (0, _reactCssThemr.themr)(_identifiers.LIST)(ListCheckbox);
exports.listCheckboxFactory = factory;
exports.ListCheckbox = ListCheckbox;