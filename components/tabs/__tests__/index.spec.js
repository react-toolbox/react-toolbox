import React, { Component } from 'react';
import { mount } from 'enzyme';
import { Tabs } from '../Tabs';
import { Tab } from '../Tab';
import { TabContent } from '../TabContent';
import theme from '../theme.css';

describe('Tabs', () => {
  class Composition extends Component {
    constructor() {
      super();
      this.state = { index: 0 };
    }

    render() {
      return (
        <Tabs index={this.state.index} {...this.props}>
          <Tab label="tab1">tab1</Tab>
          <Tab label="tab2">tab2</Tab>
        </Tabs>
      );
    }
  }

  it('defaults to only rendering the current tab', () => {
    const wrapper = mount(<Composition />);

    expect(wrapper.find(TabContent).length).toEqual(1);
    expect(wrapper.find(TabContent).first().prop('tabIndex')).toEqual(0);

    wrapper.instance().setState({ index: 1 });
    wrapper.update();

    expect(wrapper.find(TabContent).length).toEqual(1);
    expect(wrapper.find(TabContent).first().prop('tabIndex')).toEqual(1);
  });

  it('renders inactive tabs when hideMode is set to display', () => {
    const wrapper = mount(<Composition hideMode="display" />);

    expect(wrapper.find(TabContent).length).toEqual(2);
    expect(wrapper.find(TabContent).at(0).prop('hidden')).toEqual(false);
    expect(wrapper.find(TabContent).at(1).prop('hidden')).toEqual(true);

    wrapper.instance().setState({ index: 1 });
    wrapper.update();

    expect(wrapper.find(TabContent).length).toEqual(2);
    expect(wrapper.find(TabContent).at(0).prop('hidden')).toEqual(true);
    expect(wrapper.find(TabContent).at(1).prop('hidden')).toEqual(false);
  });

  describe('#render', () => {
    it('does not use fixed by default', () => {
      const wrapper = mount(<Tabs theme={theme} />);
      expect(wrapper.find('div').first().prop('className')).not.toContain(theme.fixed);
    });

    it('uses fixed when set', () => {
      const wrapper = mount(<Tabs fixed theme={theme} />);
      expect(wrapper.find('div').first().prop('className')).toContain(theme.fixed);
    });

    it('does not use inverse by default', () => {
      const wrapper = mount(<Tabs theme={theme} />);
      expect(wrapper.find('div').first().prop('className')).not.toContain(theme.inverse);
    });

    it('uses inverse when set', () => {
      const wrapper = mount(<Tabs inverse theme={theme} />);
      expect(wrapper.find('div').first().prop('className')).toContain(theme.inverse);
    });
  });
});
