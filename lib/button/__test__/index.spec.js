'use strict';

var _expect = require('expect');

var _expect2 = _interopRequireDefault(_expect);

var _style = require('../../button/style');

var _style2 = _interopRequireDefault(_style);

var _testing = require('../../utils/testing');

var _testing2 = _interopRequireDefault(_testing);

var _Button = require('../Button');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Button', function () {
  var button = void 0;

  describe('#render', function () {
    it('uses flat and neutral styles by default', function () {
      button = _testing2.default.shallowRenderComponent(_Button.RawButton);

      (0, _expect2.default)(button.props.className).toContain(_style2.default.flat);
      (0, _expect2.default)(button.props.className).toContain(_style2.default.neutral);
    });

    it('renders accent button with accent style', function () {
      button = _testing2.default.shallowRenderComponent(_Button.RawButton, { accent: true });

      (0, _expect2.default)(button.props.className).toContain(_style2.default.flat);
      (0, _expect2.default)(button.props.className).toContain(_style2.default.accent);
    });

    it('renders mini button with mini style', function () {
      button = _testing2.default.shallowRenderComponent(_Button.RawButton, { floating: true, mini: true });

      (0, _expect2.default)(button.props.className).toContain(_style2.default.floating);
      (0, _expect2.default)(button.props.className).toContain(_style2.default.neutral);
      (0, _expect2.default)(button.props.className).toContain(_style2.default.mini);
    });

    it('renders mini accented button with both styles', function () {
      button = _testing2.default.shallowRenderComponent(_Button.RawButton, { mini: true, accent: true });

      (0, _expect2.default)(button.props.className).toContain(_style2.default.flat);
      (0, _expect2.default)(button.props.className).toContain(_style2.default.accent);
      (0, _expect2.default)(button.props.className).toContain(_style2.default.mini);
    });
  });
});