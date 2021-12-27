'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var WEBKIT = 'Webkit';
var MICROSOFT = 'Ms';

var properties = {
  transform: [WEBKIT, MICROSOFT]
};

function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.substr(1);
}

function getPrefixes(property, value) {
  return properties[property].reduce(function (acc, item) {
    acc['' + item + capitalize(property)] = value; // eslint-disable-line no-param-reassign
    return acc;
  }, {});
}

function addPrefixesTo(style, property, value) {
  var vendor = getPrefixes(property, value);
  for (var prefix in vendor) {
    // eslint-disable-line no-restricted-syntax
    if ({}.hasOwnProperty.call(vendor, prefix)) {
      style[prefix] = vendor[prefix]; // eslint-disable-line no-param-reassign
    }
  }

  return style;
}

function prefixer(style) {
  var defaultValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var _style = defaultValue;
  for (var property in style) {
    // eslint-disable-line no-restricted-syntax
    if ({}.hasOwnProperty.call(style, property)) {
      _style[property] = style[property];
      if (properties[property]) {
        addPrefixesTo(_style, property, style[property]);
      }
    }
  }

  return _style;
}

exports.default = prefixer;