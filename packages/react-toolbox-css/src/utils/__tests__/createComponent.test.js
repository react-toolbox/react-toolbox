import React from 'react';
import { mount, shallow } from 'enzyme';
import createComponent from '../createComponent';

const theme = {
  base: 'base',
  primary: 'primary',
  secondary: 'secondary',
};

describe('createComponent', () => {
  it('creates a component with a given tagName', () => {
    const Component = createComponent('span');
    const wrapper = shallow(<Component />);
    expect(wrapper.find('span').length).toEqual(1);
  });

  it('creates a component with a given component', () => {
    const Dummy = () => <h1>Dummy</h1>;
    const Component = createComponent(Dummy);
    const wrapper = shallow(<Component />);
    expect(wrapper.find(Dummy).length).toEqual(1);
  });

  it('injects a base className based on the name from the given theme', () => {
    const Component = createComponent('span', { name: 'base' });
    const wrapper = shallow(<Component theme={theme} />);
    const element = wrapper.find('span');
    expect(element.prop('className')).toEqual(theme.base);
    expect(element.props()).not.toContain('theme');
  });

  it('injects modifier classNames corresponding to the given theme', () => {
    const Component = createComponent('span', { modifiers: ['primary', 'secondary'] });
    const wrapper = shallow(<Component primary theme={theme} />);
    const element = wrapper.find('span');
    expect(element.prop('className')).toEqual(theme.primary);
    expect(element.props()).not.toContain('primary');
  });

  it('uses an innerRef prop to retrieve references to the element', () => {
    const referenceFunction = jest.fn();
    const Component = createComponent('span');
    const wrapper = mount(<Component innerRef={referenceFunction} />);
    const element = wrapper.find('span');
    expect(referenceFunction).toHaveBeenCalledWith(element.instance());
    expect(element.props()).not.toContain('innerRef');
  });

  it('adds a readable displayName for the generated component', () => {
    const ComponentElement = createComponent('span');
    const BaseComponent = () => <h1>Dummy</h1>;
    BaseComponent.displayName = 'BaseComponent';
    const Component = createComponent(BaseComponent);
    expect(ComponentElement.displayName).toEqual('CSSComponent (span)');
    expect(Component.displayName).toEqual('CSSComponent (BaseComponent)');
  });

  it('adds a default theme given from createComponent', () => {
    const Component = createComponent('span', { modifiers: ['primary'], theme });
    const wrapper = mount(<Component primary />);
    const element = wrapper.find('span');
    expect(element.prop('className')).toEqual(theme.primary);
  });

  it('passes down a theme and innerRef if the created component is not an element', () => {
    const fn = jest.fn();
    const ComponentElement = createComponent('span');
    const Component = createComponent(ComponentElement, { modifiers: ['primary'] });
    const wrapper = mount(<Component innerRef={fn} primary theme={theme} />);
    expect(wrapper.find(ComponentElement).prop('theme')).toEqual(theme);
    expect(wrapper.find(ComponentElement).prop('innerRef')).toEqual(fn);
  });
});
