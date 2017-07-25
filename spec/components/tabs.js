import React from 'react';
import { Tabs, Tab } from '../../components/tabs';
import { List, ListItem, ListSubHeader } from '../../components/list';

class TabsTest extends React.Component {
  state = {
    index: 1,
    fixedIndex: 1,
    inverseIndex: 1,
  };

  handleTabChange = (index) => {
    this.setState({ index });
  };

  handleFixedTabChange = (index) => {
    this.setState({ fixedIndex: index });
  };

  handleInverseTabChange = (index) => {
    this.setState({ inverseIndex: index });
  };

  handleActive = () => {
    console.log('Special one activated');
  };

  render() {
    return (
      <section>
        <h5>Tabs</h5>
        <p>This tabs can be disabled or hidden</p>
        <Tabs disableAnimatedBottomBorder index={this.state.index} onChange={this.handleTabChange}>
          <Tab ripple={false} label="Primary">
            <List selectable ripple>
              <ListItem
                avatar="https://pbs.twimg.com/profile_images/614407428/s6pTalMzZs-nusCGWqoV.0_400x400.jpeg"
                caption="Alfonso Rocha"
                legend="Product Manager at Fon"
                rightIcon="star"
              />
              <ListItem
                avatar="https://pbs.twimg.com/profile_images/693578804808278017/a5y4h8MN_400x400.png"
                caption="Javi Velasco"
                legend="Frontend engineer at Audiense"
                rightIcon="star"
              />
              <ListItem
                avatar="https://avatars2.githubusercontent.com/u/559654?v=3&s=460"
                caption="Javi Jiménez"
                legend="Frontend engineer at MediaSmart"
                rightIcon="star"
              />
              <ListItem
                avatar="https://pbs.twimg.com/profile_images/755797598565531649/Whsf9259.jpg"
                caption="Tobias Van Schneider"
                legend="Designer at Spotify"
                rightIcon="star"
              />
            </List>
          </Tab>
          <Tab label="Secondary" onActive={this.handleActive}><small>Secondary content</small></Tab>
          <Tab label="Third" disabled><small>Disabled content</small></Tab>
          <Tab label="Fourth" hidden><small>Fourth content hidden</small></Tab>
          <Tab label="Fifth">
            <List selectable ripple>
              <ListSubHeader caption="Contacts" />
              <ListItem
                avatar="https://pbs.twimg.com/profile_images/614407428/s6pTalMzZs-nusCGWqoV.0_400x400.jpeg"
                caption="Alfonso Rocha"
                legend="Product Manager at Fon"
                rightIcon="star"
              />
              <ListItem
                avatar="https://pbs.twimg.com/profile_images/693578804808278017/a5y4h8MN_400x400.png"
                caption="Javi Velasco"
                legend="Frontend engineer at Audiense"
                rightIcon="star"
              />
              <ListItem
                avatar="https://avatars2.githubusercontent.com/u/559654?v=3&s=460"
                caption="Javi Jiménez"
                legend="Frontend engineer at MediaSmart"
                rightIcon="star"
              />
              <ListItem
                avatar="https://pbs.twimg.com/profile_images/755797598565531649/Whsf9259.jpg"
                caption="Tobias Van Schneider"
                legend="Designer at Spotify"
                rightIcon="star"
              />
            </List>
          </Tab>
        </Tabs>
      </section>
    );
  }
}

export default TabsTest;
