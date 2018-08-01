'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isBrowser;
function isBrowser() {
  return typeof window !== 'undefined' && window.document;
}