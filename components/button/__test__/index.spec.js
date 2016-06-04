import expect from 'expect';
import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import theme from '../theme.scss';
import Button, { Button as RawButton } from '../Button';

const getRenderedClassName = (tree, Component) => {
  const rendered = TestUtils.findRenderedComponentWithType(tree, Component);
  return ReactDOM.findDOMNode(rendered).getAttribute('class');
};

describe('Button', function () {
  describe('#render', function () {
    it('uses flat and neutral styles by default', function () {
      const tree = TestUtils.renderIntoDocument(<Button theme={theme} />);
      const className = getRenderedClassName(tree, RawButton);
      expect(className).toContain(theme.flat);
      expect(className).toContain(theme.neutral);
    });

    it('renders accent button with accent style', function () {
      const tree = TestUtils.renderIntoDocument(<Button accent theme={theme} />);
      const className = getRenderedClassName(tree, RawButton);
      expect(className).toContain(theme.flat);
      expect(className).toContain(theme.accent);
    });

    it('renders mini button with mini style', function () {
      const tree = TestUtils.renderIntoDocument(<Button floating mini theme={theme} />);
      const className = getRenderedClassName(tree, RawButton);
      expect(className).toContain(theme.floating);
      expect(className).toContain(theme.neutral);
      expect(className).toContain(theme.mini);
    });

    it('renders mini accented button with both styles', function () {
      const tree = TestUtils.renderIntoDocument(<Button accent mini theme={theme} />);
      const className = getRenderedClassName(tree, RawButton);
      expect(className).toContain(theme.flat);
      expect(className).toContain(theme.accent);
      expect(className).toContain(theme.mini);
    });
  });
});
