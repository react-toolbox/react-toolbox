'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _expect = require('expect');

var _expect2 = _interopRequireDefault(_expect);

var _testing = require('../../utils/testing');

var _testing2 = _interopRequireDefault(_testing);

var _reactAddonsTestUtils = require('react-addons-test-utils');

var _reactAddonsTestUtils2 = _interopRequireDefault(_reactAddonsTestUtils);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _Tabs = require('../Tabs');

var _Tabs2 = _interopRequireDefault(_Tabs);

var _Tab = require('../Tab');

var _Tab2 = _interopRequireDefault(_Tab);

var _TabContent = require('../TabContent');

var _TabContent2 = _interopRequireDefault(_TabContent);

var _theme = require('../theme.scss');

var _theme2 = _interopRequireDefault(_theme);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var getRenderedClassName = function getRenderedClassName(tree, TargetComponent) {
  var rendered = _reactAddonsTestUtils2.default.findRenderedComponentWithType(tree, TargetComponent);
  return _reactDom2.default.findDOMNode(rendered).getAttribute('class');
};

describe('Tabs', function () {
  var tabContents = void 0,
      composition = void 0;

  var Composition = function (_Component) {
    _inherits(Composition, _Component);

    function Composition() {
      _classCallCheck(this, Composition);

      var _this = _possibleConstructorReturn(this, (Composition.__proto__ || Object.getPrototypeOf(Composition)).call(this));

      _this.state = { index: 0 };
      return _this;
    }

    _createClass(Composition, [{
      key: 'render',
      value: function render() {
        return _react2.default.createElement(
          _Tabs2.default,
          _extends({ index: this.state.index }, this.props),
          _react2.default.createElement(
            _Tab2.default,
            { label: 'tab1' },
            'tab1'
          ),
          _react2.default.createElement(
            _Tab2.default,
            { label: 'tab2' },
            'tab2'
          )
        );
      }
    }]);

    return Composition;
  }(_react.Component);

  it('defaults to only rendering the current tab', function () {
    // initial render
    composition = _testing2.default.renderComponent(Composition);

    tabContents = _reactAddonsTestUtils2.default.scryRenderedComponentsWithType(composition, _TabContent2.default);

    (0, _expect2.default)(tabContents.length).toEqual(1);
    (0, _expect2.default)(tabContents[0].props.tabIndex).toEqual(0);

    // after tab change
    composition.setState({ index: 1 });
    composition.forceUpdate();

    tabContents = _reactAddonsTestUtils2.default.scryRenderedComponentsWithType(composition, _TabContent2.default);

    (0, _expect2.default)(tabContents.length).toEqual(1);
    (0, _expect2.default)(tabContents[0].props.tabIndex).toEqual(1);
  });

  it('renders inactive tabs when hideMode is set to display', function () {
    // initial render
    composition = _testing2.default.renderComponent(Composition, { hideMode: 'display' });

    tabContents = _reactAddonsTestUtils2.default.scryRenderedComponentsWithType(composition, _TabContent2.default);

    (0, _expect2.default)(tabContents.length).toEqual(2);

    var tabOne = tabContents.find(function (tab) {
      return tab.props.children === 'tab1';
    });
    var tabTwo = tabContents.find(function (tab) {
      return tab.props.children === 'tab2';
    });

    (0, _expect2.default)(tabOne.props.hidden).toEqual(false);
    (0, _expect2.default)(tabTwo.props.hidden).toEqual(true);

    // after tab change
    composition.setState({ index: 1 });
    composition.forceUpdate();

    tabContents = _reactAddonsTestUtils2.default.scryRenderedComponentsWithType(composition, _TabContent2.default);

    (0, _expect2.default)(tabContents.length).toEqual(2);

    tabOne = tabContents.find(function (tab) {
      return tab.props.children === 'tab1';
    });
    tabTwo = tabContents.find(function (tab) {
      return tab.props.children === 'tab2';
    });

    (0, _expect2.default)(tabOne.props.hidden).toEqual(true);
    (0, _expect2.default)(tabTwo.props.hidden).toEqual(false);
  });

  describe('#render', function () {
    it('does not use fixed by default', function () {
      var tree = _reactAddonsTestUtils2.default.renderIntoDocument(_react2.default.createElement(_Tabs2.default, { theme: _theme2.default }));
      var className = getRenderedClassName(tree, _Tabs.Tabs);
      (0, _expect2.default)(className).toNotContain(_theme2.default.fixed);
    });

    it('uses fixed when set', function () {
      var tree = _reactAddonsTestUtils2.default.renderIntoDocument(_react2.default.createElement(_Tabs2.default, { theme: _theme2.default, fixed: true }));
      var className = getRenderedClassName(tree, _Tabs.Tabs);
      (0, _expect2.default)(className).toContain(_theme2.default.fixed);
    });

    it('does not use inverse by default', function () {
      var tree = _reactAddonsTestUtils2.default.renderIntoDocument(_react2.default.createElement(_Tabs2.default, { theme: _theme2.default }));
      var className = getRenderedClassName(tree, _Tabs.Tabs);
      (0, _expect2.default)(className).toNotContain(_theme2.default.inverse);
    });

    it('uses inverse when set', function () {
      var tree = _reactAddonsTestUtils2.default.renderIntoDocument(_react2.default.createElement(_Tabs2.default, { theme: _theme2.default, inverse: true }));
      var className = getRenderedClassName(tree, _Tabs.Tabs);
      (0, _expect2.default)(className).toContain(_theme2.default.inverse);
    });
  });
});