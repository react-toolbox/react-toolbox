import React from 'react';
import { shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';

import { Dropdown } from '../Dropdown';
import theme from '../theme.css';

const countries = [
  { value: 'EN-gb', label: 'England' },
  { value: 'ES-es', label: 'Spain' },
  { value: 'TH-th', label: 'Thailand', disabled: true },
  { value: 'EN-en', label: 'USA' },
];

describe('Dropdown', () => {
  describe('snapshot testing', () => {
    it('with no properties', () => {
      expect(() => shallow(<Dropdown theme={theme} />)).toThrow();
    });
    it('with minimum properties', () => {
      const wrapper = shallow(<Dropdown theme={theme} source={countries} />);
      expect(toJson(wrapper)).toMatchSnapshot();
    });
    it('Spain selected', () => {
      const wrapper = shallow(<Dropdown theme={theme} source={countries} value="ES-es" />);
      expect(toJson(wrapper)).toMatchSnapshot();
    });
    it('none selected', () => {
      const wrapper = shallow(<Dropdown theme={theme} source={countries} value="xxx" />);
      expect(toJson(wrapper)).toMatchSnapshot();
    });
    it('allowBlank=false', () => {
      const wrapper = shallow(<Dropdown theme={theme} source={countries} allowBlank={false} value="xxx" />);
      expect(toJson(wrapper)).toMatchSnapshot();
    });
    it('with className', () => {
      const wrapper = shallow(<Dropdown theme={theme} source={countries} className="something fancy" />);
      expect(toJson(wrapper)).toMatchSnapshot();
    });
    it('disabled', () => {
      const wrapper = shallow(<Dropdown theme={theme} source={countries} disabled />);
      expect(toJson(wrapper)).toMatchSnapshot();
    });
    it('with error message', () => {
      const wrapper = shallow(<Dropdown theme={theme} source={countries} error="some error message" />);
      expect(toJson(wrapper)).toMatchSnapshot();
    });
    it('with label', () => {
      const wrapper = shallow(<Dropdown theme={theme} source={countries} label="Select country" />);
      expect(toJson(wrapper)).toMatchSnapshot();
    });
    it('with template', () => {
      const template = JSON.stringify;
      const wrapper = shallow(<Dropdown theme={theme} source={countries} template={template} />);
      expect(toJson(wrapper)).toMatchSnapshot();
    });
    it('required=true', () => {
      const wrapper = shallow(<Dropdown theme={theme} source={countries} required />);
      expect(toJson(wrapper)).toMatchSnapshot();
    });
  });
  describe('Events testing', () => {
    it('when clicked it should unfold the list', () => {
      const wrapper = mount(<Dropdown theme={theme} source={countries} label="clicked" />);
      expect(wrapper.find('div.dropdown').hasClass('active')).toBeFalsy();
      wrapper.find('input.inputElement').simulate('click');
      expect(wrapper.find('div.dropdown').hasClass('active')).toBeTruthy();
    });
    it('when item is clicked it should fire onChange event', () => {
      const onChangeHandler = jest.fn();
      const wrapper = mount(
        <Dropdown
          theme={theme}
          source={countries}
          onChange={onChangeHandler}
          name="thisOne"
        />);
      expect(wrapper.find('div.dropdown').hasClass('active')).toBeFalsy();
      wrapper.find('input.inputElement').simulate('click');
      expect(wrapper.find('div.dropdown').hasClass('active')).toBeTruthy();
      wrapper.find('ul.values').childAt(1).simulate('click');
      expect(onChangeHandler).toHaveBeenCalled();
      const [value, ev] = onChangeHandler.mock.calls[0];
      expect(value).toEqual(countries[1].value);
      expect(ev.target.name).toEqual('thisOne');
      expect(wrapper.find('div.dropdown').hasClass('active')).toBeFalsy();
    });
    it('when disabled item is clicked it should do nothing', () => {
      const onChangeHandler = jest.fn();
      const wrapper = mount(
        <Dropdown
          theme={theme}
          source={countries}
          onChange={onChangeHandler}
          name="thisOne"
        />);
      expect(wrapper.find('div.dropdown').hasClass('active')).toBeFalsy();
      wrapper.find('input.inputElement').simulate('click');
      expect(wrapper.find('div.dropdown').hasClass('active')).toBeTruthy();
      wrapper.find('ul.values').childAt(2).simulate('click');
      expect(wrapper.find('div.dropdown').hasClass('active')).toBeTruthy();
      expect(onChangeHandler).not.toHaveBeenCalled();
    });
  });
});
