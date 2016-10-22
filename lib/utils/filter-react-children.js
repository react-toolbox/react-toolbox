'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/**
 * Looks through a collection of React children elements, filtering them
 * according to the predicate passed.
 *
 * @param {Array/Object} children - colleciton of >=1 react elements
 * @param {function} predicate - function returning true when provided with an entry as argument
 */


exports.default = function (children, predicate) {
  var _this = this;

  if (children) {
    var _ret = function () {
      var result = [];
      _react2.default.Children.forEach(children, function (entry, idx) {
        if (predicate && predicate.call(_this, entry, idx)) {
          result.push(entry);
        }
      });
      return {
        v: result
      };
    }();

    if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
  }

  return undefined;
};

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }