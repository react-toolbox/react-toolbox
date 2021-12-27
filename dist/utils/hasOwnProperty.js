"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = hasOwnProperty;
function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}