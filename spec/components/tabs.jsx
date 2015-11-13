import React from 'react';
import { Tabs, Tab } from '../../components/tabs';

class TabsTest extends React.Component {

  state = {
    active: 1
  };

  handleTabChange = (active) => {
    this.setState({active});
    console.log('change active');
  };

  handleActive = () => {
    console.log('special one activated');
  };

  render () {
    return (
      <section>
        <h5>Tabs</h5>
        <p>This tabs can be disabled or hidden</p>

        <Tabs active={this.state.active} onChange={this.handleTabChange}>
          <Tab label='Primary'>
            <small>Primary content</small>
          </Tab>

          <Tab label='Secondary' onActive={this.handleActive}>
            <small>Secondary content</small>
          </Tab>

          <Tab label='Third' disabled>
            <small>Disabled content</small>
          </Tab>

          <Tab label='Fourth' hidden>
            <small>Fourth content hidden</small>
          </Tab>

          <Tab label='Fifth'>
            <small>Fifth content</small>
          </Tab>
        </Tabs>
      </section>
    );
  }
}

export default TabsTest;
