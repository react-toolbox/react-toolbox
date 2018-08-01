'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Autocomplete = undefined;

var _reactCssThemr = require('react-css-themr');

var _identifiers = require('../identifiers');

var _Autocomplete = require('./Autocomplete');

var _chip = require('../chip');

var _input = require('../input');

var _theme = require('./theme.css');

var _theme2 = _interopRequireDefault(_theme);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Autocomplete = (0, _Autocomplete.autocompleteFactory)(_chip.Chip, _input.Input);
var ThemedAutocomplete = (0, _reactCssThemr.themr)(_identifiers.AUTOCOMPLETE, _theme2.default, { withRef: true })(Autocomplete);

exports.default = ThemedAutocomplete;
exports.Autocomplete = ThemedAutocomplete;