import React from 'react';
import { mount } from 'enzyme';
import { themr } from 'react-css-themr';
import { CHIP } from '../../identifiers';
import { tooltipFactory } from '../../tooltip';
import { chipFactory } from '../Chip';

const Avatar = ({ title }) => <span>{title}</span>; // eslint-disable-line react/prop-types
const Chip = themr(CHIP)(chipFactory(Avatar));

describe('Chip', () => {
  describe('with avatar', () => {
    it('adds the avatar class to the element', () => {
      const wrapper = mount(
        <Chip theme={{ avatar: 'avatar-class' }}>
          <Avatar title="Test" />
          <span>Test</span>
        </Chip>,
      );
      const chipNode = wrapper.find('div').instance();
      expect(chipNode.className).toMatch(/\bavatar-class\b/);
    });

    it('works with non-flat children', () => {
      const TooltippedChip = tooltipFactory()(Chip);
      const wrapper = mount(
        <TooltippedChip theme={{ avatar: 'avatar-class' }} tooltip="Test tooltip">
          <Avatar title="Test" />
          <span>Test</span>
        </TooltippedChip>,
      );
      const chipNode = wrapper.find('div').instance();
      expect(chipNode.className).toMatch(/\bavatar-class\b/);
    });
  });

  describe('without avatar', () => {
    it('does not add avatar class to the element', () => {
      const wrapper = mount(
        <Chip theme={{ avatar: 'avatar-class' }}>
          <span>Test</span>
        </Chip>,
      );
      const chipNode = wrapper.find('div').instance();
      expect(chipNode.className).not.toMatch(/\bavatar-class\b/);
    });
  });
});
