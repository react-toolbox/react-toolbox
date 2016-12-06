import expect from 'expect';
import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-addons-test-utils';
import { themr } from 'react-css-themr';
import { CHIP } from '../../identifiers.js';
import { chipFactory } from '../Chip';
import { tooltipFactory } from '../../tooltip';

const Avatar = ({title}) => <span>{title}</span>; // eslint-disable-line react/prop-types
const Chip = themr(CHIP)(chipFactory(Avatar));

describe('Chip', function () {
  describe('with avatar', function () {
    it('adds the avatar class to the element', function () {
      const tree = ReactTestUtils.renderIntoDocument(
        <Chip theme={{avatar: 'avatar-class'}}>
          <Avatar title='Test'/>
          <span>Test</span>
        </Chip>
      );
      const chip = ReactTestUtils.findRenderedComponentWithType(tree, Chip);
      const chipNode = ReactDOM.findDOMNode(chip);
      expect(chipNode.className).toMatch(/\bavatar-class\b/);
    });

    it('works with non-flat children', function () {
      const TooltippedChip = tooltipFactory()(Chip);
      const tree = ReactTestUtils.renderIntoDocument(
        <TooltippedChip theme={{avatar: 'avatar-class'}} tooltip='Test tooltip'>
          <Avatar title='Test'/>
          <span>Test</span>
        </TooltippedChip>
      );
      const chip = ReactTestUtils.findRenderedComponentWithType(tree, Chip);
      const chipNode = ReactDOM.findDOMNode(chip);
      expect(chipNode.className).toMatch(/\bavatar-class\b/);
    });
  });

  describe('without avatar', function () {
    it('does not add avatar class to the element', function () {
      const tree = ReactTestUtils.renderIntoDocument(
        <Chip theme={{avatar: 'avatar-class'}}>
          <span>Test</span>
        </Chip>
      );
      const chip = ReactTestUtils.findRenderedComponentWithType(tree, Chip);
      const chipNode = ReactDOM.findDOMNode(chip);
      expect(chipNode.className).toNotMatch(/\bavatar-class\b/);
    });
  });
});
