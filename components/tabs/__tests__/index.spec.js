import expect from 'expect';
import utils from '../../utils/testing';
import ReactTestUtils from 'react-addons-test-utils';

import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import Tabs, { Tabs as RawTabs } from '../Tabs';
import Tab from '../Tab';
import TabContent from '../TabContent';
import theme from '../theme.scss';

const getRenderedClassName = (tree, TargetComponent) => {
  const rendered = ReactTestUtils.findRenderedComponentWithType(tree, TargetComponent);
  return ReactDOM.findDOMNode(rendered).getAttribute('class');
};

describe('Tabs', function () {
  let tabContents, composition;

  class Composition extends Component {
    constructor () {
      super();
      this.state = { index: 0 };
    }

    render () {
      return (
        <Tabs index={this.state.index} {...this.props}>
          <Tab label="tab1">tab1</Tab>
          <Tab label="tab2">tab2</Tab>
        </Tabs>
      );
    }
  }

  it('defaults to only rendering the current tab', function () {
    // initial render
    composition = utils.renderComponent(Composition);

    tabContents = ReactTestUtils
      .scryRenderedComponentsWithType(composition, TabContent);

    expect(tabContents.length).toEqual(1);
    expect(tabContents[0].props.tabIndex).toEqual(0);

    // after tab change
    composition.setState({ index: 1 });
    composition.forceUpdate();

    tabContents = ReactTestUtils
      .scryRenderedComponentsWithType(composition, TabContent);

    expect(tabContents.length).toEqual(1);
    expect(tabContents[0].props.tabIndex).toEqual(1);
  });

  it('renders inactive tabs when hideMode is set to display', function () {
    // initial render
    composition = utils.renderComponent(Composition, { hideMode: 'display' });

    tabContents = ReactTestUtils
      .scryRenderedComponentsWithType(composition, TabContent);

    expect(tabContents.length).toEqual(2);

    let tabOne = tabContents.find((tab) => (tab.props.children === 'tab1'));
    let tabTwo = tabContents.find((tab) => (tab.props.children === 'tab2'));

    expect(tabOne.props.hidden).toEqual(false);
    expect(tabTwo.props.hidden).toEqual(true);

    // after tab change
    composition.setState({ index: 1 });
    composition.forceUpdate();

    tabContents = ReactTestUtils
      .scryRenderedComponentsWithType(composition, TabContent);

    expect(tabContents.length).toEqual(2);

    tabOne = tabContents.find((tab) => (tab.props.children === 'tab1'));
    tabTwo = tabContents.find((tab) => (tab.props.children === 'tab2'));

    expect(tabOne.props.hidden).toEqual(true);
    expect(tabTwo.props.hidden).toEqual(false);
  });

  describe('#render', function () {
    it('does not use fixed by default', function () {
      const tree = ReactTestUtils.renderIntoDocument(<Tabs theme={theme} />);
      const className = getRenderedClassName(tree, RawTabs);
      expect(className).toNotContain(theme.fixed);
    });

    it('uses fixed when set', function () {
      const tree = ReactTestUtils.renderIntoDocument(<Tabs theme={theme} fixed />);
      const className = getRenderedClassName(tree, RawTabs);
      expect(className).toContain(theme.fixed);
    });

    it('does not use inverse by default', function () {
      const tree = ReactTestUtils.renderIntoDocument(<Tabs theme={theme} />);
      const className = getRenderedClassName(tree, RawTabs);
      expect(className).toNotContain(theme.inverse);
    });

    it('uses inverse when set', function () {
      const tree = ReactTestUtils.renderIntoDocument(<Tabs theme={theme} inverse />);
      const className = getRenderedClassName(tree, RawTabs);
      expect(className).toContain(theme.inverse);
    });
  });
});
