'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.overrideComponentTypeChecker = overrideComponentTypeChecker;
exports.defaultChecker = defaultChecker;
exports.default = isComponentOfType;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var customChecker = void 0;

/**
 *  Sets customChecker which will be used for all components.
 *
 * @param providedChecker {Function} - Checker function
 */
function overrideComponentTypeChecker(providedChecker) {
  customChecker = providedChecker;
}

/**
 * Returns true if the provided element is a component of the provided type.
 *
 * @param classType {ReactElement class} - the class of a React Element
 * @param reactElement {ReactElement} - any React Element (not a real DOM node)
 */
function defaultChecker(classType, reactElement) {
  if (process.env.NODE_ENV !== 'production') {
    // https://github.com/gaearon/react-hot-loader/blob/v3.0.0-beta.7/docs/Known%20Limitations.md#checking-element-types
    classType = _react2.default.createElement(classType).type; // eslint-disable-line no-param-reassign
  }
  return reactElement && reactElement.type === classType;
}

/**
 * Executes customChecker if it's set or defaultChecker.
 *
 * @param classType {ReactElement class} - the class of a React Element
 * @param reactElement {ReactElement} - any React Element (not a real DOM node)
 */
function isComponentOfType(classType, reactElement) {
  return customChecker ? customChecker(classType, reactElement) : defaultChecker(classType, reactElement);
}