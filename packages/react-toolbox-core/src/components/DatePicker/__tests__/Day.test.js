import React from 'react';
import { shallow } from 'enzyme';
import dayFactory from '../Day';

function Component() {
  return (<div />);
}

const Day = dayFactory({
  DayNode: Component,
});

describe('<Day />', () => {
  it('renders', () => {
    const wrapper = shallow(<Day day={new Date()} />);
    const item = wrapper.find(Component);
    console.log(item);
    expect(true).toEqual(true);
  });
});
