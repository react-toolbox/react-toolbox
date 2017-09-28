import React from 'react';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { themr } from 'react-css-themr';
import { CHIP } from '../../identifiers';
import { tooltipFactory } from '../../tooltip';
import { chipFactory } from '../Chip';

configure({ adapter: new Adapter() });

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
      expect(wrapper.find('div').prop('className')).toMatch(/\bavatar-class\b/);
    });

    it('works with non-flat children', () => {
      const TooltippedChip = tooltipFactory()(Chip);
      const wrapper = mount(
        <TooltippedChip theme={{ avatar: 'avatar-class' }} tooltip="Test tooltip">
          <Avatar title="Test" />
          <span>Test</span>
        </TooltippedChip>,
      );
      expect(wrapper.find('div').prop('className')).toMatch(/\bavatar-class\b/);
    });
  });

  describe('without avatar', () => {
    it('does not add avatar class to the element', () => {
      const wrapper = mount(
        <Chip theme={{ avatar: 'avatar-class' }}>
          <span>Test</span>
        </Chip>,
      );
      expect(wrapper.find('div').prop('className')).not.toMatch(/\bavatar-class\b/);
    });
  });
});
