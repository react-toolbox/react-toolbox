import React from 'react';
import { Tabs, Tab } from '../../components/tabs';

export default React.createClass({
  displayName: 'TabsTest',

  render () {
    return (
      <section>
      <h5>Tabs</h5>
      <p>This tabs can be disabled or hidden</p>

      <Tabs>
          <Tab label='Primary'><small>Primary content</small></Tab>
          <Tab label='Secondary'><small>Secondary content</small></Tab>
          <Tab label='Third' disabled><small>Disabled content</small></Tab>
          <Tab label='Fourth' hidden><small>Fourth content hidden</small></Tab>
          <Tab label='Fifth'><small>Fifth content</small></Tab>
        </Tabs>
      </section>
    );
  }
});
