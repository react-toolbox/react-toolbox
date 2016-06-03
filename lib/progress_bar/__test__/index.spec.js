'use strict';

var _expect = require('expect');

var _expect2 = _interopRequireDefault(_expect);

var _style = require('../../progress_bar/style');

var _style2 = _interopRequireDefault(_style);

var _testing = require('../../utils/testing');

var _testing2 = _interopRequireDefault(_testing);

var _index = require('../index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('ProgressBar', function () {
  var progressBar = void 0;

  describe('#calculateRatio', function () {
    before(function () {
      progressBar = _testing2.default.renderComponent(_index2.default, { min: 100, max: 300 });
    });

    it('calculates the right ratio', function () {
      (0, _expect2.default)(progressBar.calculateRatio(150)).toEqual(0.25);
    });

    it('gets 0 when value is less than min', function () {
      (0, _expect2.default)(progressBar.calculateRatio(10)).toEqual(0);
    });

    it('gets 1 when value is more than max', function () {
      (0, _expect2.default)(progressBar.calculateRatio(400)).toEqual(1);
    });
  });

  describe('#render', function () {
    var buffer = void 0,
        value = void 0,
        wrapper = void 0,
        circle = void 0,
        strokeLength = void 0;

    it('renders the value and buffer bars when it is linear', function () {
      wrapper = _testing2.default.shallowRenderComponent(_index2.default).props.children;
      (0, _expect2.default)(wrapper.props.children.length).toEqual(2);
      (0, _expect2.default)(wrapper.props.children[0].ref).toEqual('buffer');
      (0, _expect2.default)(wrapper.props.children[1].ref).toEqual('value');
    });

    it('renders the value and buffer bars when it is linear', function () {
      progressBar = _testing2.default.shallowRenderComponent(_index2.default, { mode: 'determinate', value: 30, buffer: 60 });
      buffer = progressBar.props.children.props.children[0];
      value = progressBar.props.children.props.children[1];
      (0, _expect2.default)(buffer.props.style.transform).toEqual('scaleX(' + 0.6 + ')');
      (0, _expect2.default)(value.props.style.transform).toEqual('scaleX(' + 0.3 + ')');
    });

    it('renders the svg circle when it is circular', function () {
      progressBar = _testing2.default.shallowRenderComponent(_index2.default, { type: 'circular' });
      (0, _expect2.default)(progressBar.props.children.type).toEqual('svg');
      (0, _expect2.default)(progressBar.props.children.props.children.type).toEqual('circle');
    });

    it('renders the proper circle length style when it is circular and determinate', function () {
      progressBar = _testing2.default.shallowRenderComponent(_index2.default, { type: 'circular', mode: 'determinate', value: 30 });
      circle = progressBar.props.children.props.children;
      strokeLength = 2 * Math.PI * circle.props.r * 0.3;
      (0, _expect2.default)(circle.props.style.strokeDasharray).toEqual(strokeLength + ', 400');
    });

    it('contains mode and className in its className', function () {
      progressBar = _testing2.default.shallowRenderComponent(_index2.default, { mode: 'determinate', className: 'tight' });
      (0, _expect2.default)(progressBar.props.className).toContain(_style2.default.determinate);
      (0, _expect2.default)(progressBar.props.className).toContain(_style2.default.tight);
    });
  });
});