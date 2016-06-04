import React from 'react';
import expect from 'expect';
import TestUtils from 'react-addons-test-utils';
import ProgressBar, { ProgressBar as RawProgressBar } from '../ProgressBar';
import theme from '../theme.scss';
import utils from '../../utils/testing';

describe('ProgressBar', function () {
  let progressBar;

  describe('#calculateRatio', function () {
    before(function () {
      const tree = TestUtils.renderIntoDocument(<ProgressBar min={100} max={300} theme={theme} />);
      progressBar = TestUtils.findRenderedComponentWithType(tree, RawProgressBar);
    });

    it('calculates the right ratio', function () {
      expect(progressBar.calculateRatio(150)).toEqual(0.25);
    });

    it('gets 0 when value is less than min', function () {
      expect(progressBar.calculateRatio(10)).toEqual(0);
    });

    it('gets 1 when value is more than max', function () {
      expect(progressBar.calculateRatio(400)).toEqual(1);
    });
  });

  describe('#render', function () {
    let buffer, value, wrapper, circle, strokeLength;

    it('renders the value and buffer bars when it is linear', function () {
      wrapper = utils.shallowRenderComponent(RawProgressBar, {theme}).props.children;
      expect(wrapper.props.children.length).toEqual(2);
      expect(wrapper.props.children[0].ref).toEqual('buffer');
      expect(wrapper.props.children[1].ref).toEqual('value');
    });

    it('renders the value and buffer bars when it is linear', function () {
      progressBar = utils.shallowRenderComponent(RawProgressBar, {mode: 'determinate', value: 30, buffer: 60, theme});
      buffer = (progressBar.props.children.props.children[0]);
      value = (progressBar.props.children.props.children[1]);
      expect(buffer.props.style.transform).toEqual(`scaleX(${0.6})`);
      expect(value.props.style.transform).toEqual(`scaleX(${0.3})`);
    });

    it('renders the svg circle when it is circular', function () {
      progressBar = utils.shallowRenderComponent(RawProgressBar, {type: 'circular', theme});
      expect(progressBar.props.children.type).toEqual('svg');
      expect(progressBar.props.children.props.children.type).toEqual('circle');
    });

    it('renders the proper circle length style when it is circular and determinate', function () {
      progressBar = utils.shallowRenderComponent(RawProgressBar, {type: 'circular', mode: 'determinate', value: 30, theme});
      circle = progressBar.props.children.props.children;
      strokeLength = 2 * Math.PI * circle.props.r * 0.3;
      expect(circle.props.style.strokeDasharray).toEqual(`${strokeLength}, 400`);
    });

    it('contains mode and className in its className', function () {
      progressBar = utils.shallowRenderComponent(RawProgressBar, {mode: 'determinate', className: 'tight', theme});
      expect(progressBar.props.className).toContain(theme.determinate);
      expect(progressBar.props.className).toContain(theme.tight);
    });
  });
});
