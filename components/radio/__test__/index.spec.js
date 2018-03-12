import React from 'react';
import { mount } from 'enzyme';
import { RadioButton } from '../RadioButton';
import { RadioGroup } from '../RadioGroup';
import theme from '../theme.css';

describe('RadioButton', () => {
  describe('#on mount', () => {
    it('is not disabled by default', () => {
      const wrapper = mount(<RadioButton theme={theme} />);
      expect(wrapper.props().disabled).toBe(false);
    });
    it('is not checked by default', () => {
      const wrapper = mount(<RadioButton theme={theme} />);
      expect(wrapper.props().checked).toBe(false);
    });

    it('has no className by default', () => {
      const wrapper = mount(<RadioButton theme={theme} />);
      expect(wrapper.props().className).toBe('');
    });
  });
});

describe('RadioGroup', () => {
  class RadioTest extends React.Component {
    constructor() {
      super();
      this.state = { value: 'vue' };
    }

    handleChange = (value) => {
      this.setState({ value });
    };

    render() {
      return (
        <RadioGroup name="library" value={this.state.value} onChange={this.handleChange}>
          <RadioButton label="React" value="react" />
          <RadioButton label="Vue" value="vue" />
          <RadioButton label="Angular" value="angular" disabled />
          <RadioButton label="Redux" value="redux" />
        </RadioGroup>
      );
    }
  }

  it('renders the value in the parent components state', () => {
    const wrapper = mount(<RadioTest />);
    expect(wrapper.find(RadioGroup).props().value).toEqual('vue');
  });

  it('disables a specified button', () => {
    const wrapper = mount(<RadioTest />);
    expect(wrapper.find(RadioGroup).props().children[0].props.disabled).toEqual(false);
    expect(wrapper.find(RadioGroup).props().children[2].props.disabled).toEqual(true);
  });

  it('only selects a single value', () => {
    const wrapper = mount(<RadioTest />);
    expect(wrapper.find(RadioGroup).props().value).toEqual('vue');
    wrapper.find(RadioButton).first().find('input').simulate('click');
    expect(wrapper.find(RadioGroup).props().value).toEqual('react');
  });
});
