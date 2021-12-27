'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RadioGroup = exports.RadioButton = undefined;

var _reactCssThemr = require('react-css-themr');

var _identifiers = require('../identifiers');

var _ripple = require('../ripple');

var _ripple2 = _interopRequireDefault(_ripple);

var _Radio = require('./Radio');

var _Radio2 = _interopRequireDefault(_Radio);

var _RadioButton = require('./RadioButton');

var _RadioGroup = require('./RadioGroup');

var _theme = require('./theme.css');

var _theme2 = _interopRequireDefault(_theme);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ThemedRadio = (0, _Radio2.default)((0, _ripple2.default)({ centered: true, spread: 2.6 }));
var ThemedRadioButton = (0, _reactCssThemr.themr)(_identifiers.RADIO, _theme2.default)((0, _RadioButton.radioButtonFactory)(ThemedRadio));
var ThemedRadioGroup = (0, _reactCssThemr.themr)(_identifiers.RADIO, _theme2.default)((0, _RadioGroup.radioGroupFactory)(ThemedRadioButton));

exports.default = ThemedRadioButton;
exports.RadioButton = ThemedRadioButton;
exports.RadioGroup = ThemedRadioGroup;