'use strict';

var _redboxReact2 = require('redbox-react');

var _redboxReact3 = _interopRequireDefault(_redboxReact2);

var _reactTransformCatchErrors3 = require('react-transform-catch-errors');

var _reactTransformCatchErrors4 = _interopRequireDefault(_reactTransformCatchErrors3);

var _react2 = require('react');

var _react3 = _interopRequireDefault(_react2);

var _reactTransformHmr3 = require('react-transform-hmr');

var _reactTransformHmr4 = _interopRequireDefault(_reactTransformHmr3);

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _expect = require('expect');

var _expect2 = _interopRequireDefault(_expect);

var _testing = require('../../utils/testing');

var _testing2 = _interopRequireDefault(_testing);

var _reactAddonsTestUtils = require('react-addons-test-utils');

var _reactAddonsTestUtils2 = _interopRequireDefault(_reactAddonsTestUtils);

var _Tabs = require('../Tabs');

var _Tabs2 = _interopRequireDefault(_Tabs);

var _Tab = require('../Tab');

var _Tab2 = _interopRequireDefault(_Tab);

var _TabContent = require('../TabContent');

var _TabContent2 = _interopRequireDefault(_TabContent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _components = {
  Composition: {
    displayName: 'Composition',
    isInFunction: true
  }
};

var _reactTransformHmr2 = (0, _reactTransformHmr4.default)({
  filename: 'components/tabs/__tests__/index.spec.jsx',
  components: _components,
  locals: [module],
  imports: [_react3.default]
});

var _reactTransformCatchErrors2 = (0, _reactTransformCatchErrors4.default)({
  filename: 'components/tabs/__tests__/index.spec.jsx',
  components: _components,
  locals: [],
  imports: [_react3.default, _redboxReact3.default]
});

function _wrapComponent(id) {
  return function (Component) {
    return _reactTransformHmr2(_reactTransformCatchErrors2(Component, id), id);
  };
}

describe('Tabs', function () {
  var tabContents = void 0,
      composition = void 0;

  it('only renders the current tab', function () {
    var Composition = _wrapComponent('Composition')(function (_Component) {
      _inherits(Composition, _Component);

      function Composition() {
        _classCallCheck(this, Composition);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Composition).call(this));

        _this.state = { index: 0 };
        return _this;
      }

      _createClass(Composition, [{
        key: 'render',
        value: function render() {
          return _react3.default.createElement(
            _Tabs2.default,
            { index: this.state.index },
            _react3.default.createElement(
              _Tab2.default,
              { label: 'tab1' },
              'tab1'
            ),
            _react3.default.createElement(
              _Tab2.default,
              { label: 'tab2' },
              'tab2'
            )
          );
        }
      }]);

      return Composition;
    }(_react2.Component));

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
});