'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CardTitle = exports.CardText = exports.CardMedia = exports.CardActions = exports.Card = undefined;

var _reactCssThemr = require('react-css-themr');

var _identifiers = require('../identifiers');

var _Card = require('./Card');

var _CardActions = require('./CardActions');

var _CardMedia = require('./CardMedia');

var _CardText = require('./CardText');

var _CardTitle = require('./CardTitle');

var _avatar = require('../avatar');

var _theme = require('./theme.css');

var _theme2 = _interopRequireDefault(_theme);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CardTitle = (0, _CardTitle.cardTitleFactory)(_avatar.Avatar);
var ThemedCard = (0, _reactCssThemr.themr)(_identifiers.CARD, _theme2.default)(_Card.Card);
var ThemedCardActions = (0, _reactCssThemr.themr)(_identifiers.CARD, _theme2.default)(_CardActions.CardActions);
var ThemedCardMedia = (0, _reactCssThemr.themr)(_identifiers.CARD, _theme2.default)(_CardMedia.CardMedia);
var ThemedCardText = (0, _reactCssThemr.themr)(_identifiers.CARD, _theme2.default)(_CardText.CardText);
var ThemedCardTitle = (0, _reactCssThemr.themr)(_identifiers.CARD, _theme2.default)(CardTitle);

exports.default = ThemedCard;
exports.Card = ThemedCard;
exports.CardActions = ThemedCardActions;
exports.CardMedia = ThemedCardMedia;
exports.CardText = ThemedCardText;
exports.CardTitle = ThemedCardTitle;