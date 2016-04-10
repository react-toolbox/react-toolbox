import expect from 'expect';
import utils from '../../utils/testing';
import ReactTestUtils from 'react-addons-test-utils';

import React, { Component } from 'react';

import Tabs from '../Tabs';
import Tab from '../Tab';
import TabContent from '../TabContent';

describe('Tabs', function () {
  let tabContents, composition;

  it('only renders the current tab', function () {
    class Composition extends Component {
      constructor () {
        super();
        this.state = { index: 0 };
      }

      render () {
        return (
          <Tabs index={this.state.index}>
            <Tab label="tab1">tab1</Tab>
            <Tab label="tab2">tab2</Tab>
          </Tabs>
        );
      }
    }

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

});
