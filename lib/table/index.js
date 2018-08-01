'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TableCell = exports.TableRow = exports.TableHead = exports.Table = undefined;

var _reactCssThemr = require('react-css-themr');

var _identifiers = require('../identifiers');

var _checkbox = require('../checkbox');

var _font_icon = require('../font_icon');

var _Table = require('./Table');

var _TableHead = require('./TableHead');

var _TableRow = require('./TableRow');

var _TableCell = require('./TableCell');

var _theme = require('./theme.css');

var _theme2 = _interopRequireDefault(_theme);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var applyTheme = function applyTheme(Component) {
  return (0, _reactCssThemr.themr)(_identifiers.TABLE, _theme2.default)(Component);
};
var ThemedTableCell = applyTheme((0, _TableCell.tableCellFactory)(_font_icon.FontIcon));
var ThemedTableHead = applyTheme((0, _TableHead.tableHeadFactory)(_checkbox.Checkbox, ThemedTableCell));
var ThemedTableRow = applyTheme((0, _TableRow.tableRowFactory)(_checkbox.Checkbox, ThemedTableCell));
var ThemedTable = applyTheme((0, _Table.tableFactory)(ThemedTableHead, ThemedTableRow));

exports.default = ThemedTable;
exports.Table = ThemedTable;
exports.TableHead = ThemedTableHead;
exports.TableRow = ThemedTableRow;
exports.TableCell = ThemedTableCell;