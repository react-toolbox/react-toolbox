import React from 'react';
import { ListCheckbox, ListSubHeader, List, ListItem, ListDivider } from '../../components/list';
import { ListItemLeft, ListItemRight, ListItemCaption, ListItemLegend, ListItemAvatar } from '../../components/list';

const listStyle = {
  border: '1px solid #EEE',
  display: 'inline-block',

  minWidth: 340
};

class ListTest extends React.Component {
  state = {
    checkbox1: false,
    checkbox2: true,
    checkbox3: true
  };

  handleCheckboxChange = (field) => {
    const newState = {};
    newState[field] = !this.state[field];
    this.setState(newState);
  };

  render () {
    return (
      <section>
        <h5>With simple text and icons</h5>
        <p>This list can be used inside a Drawer for a list of options or as navigation.</p>
        <div style={listStyle}>
          <List selectable ripple>
            <ListSubHeader caption='Contacts' />
            <ListItem caption='Inbox' leftIcon='inbox' />
            <ListItem caption='Outbox' leftIcon='send' />
            <ListItem caption='Trash' leftIcon='delete' />
            <ListItem caption='Spam' leftIcon='report' />
          </List>
        </div>

        <h5>Two text lines, avatar and right icon</h5>
        <p>Useful for a list of contacts or similar.</p>
        <div style={listStyle}>
          <List selectable ripple>
            <ListSubHeader caption='Contacts' />
            <ListItem
              avatar='https://pbs.twimg.com/profile_images/614407428/s6pTalMzZs-nusCGWqoV.0_400x400.jpeg'
              caption='Alfonso Rocha'
              legend='Product Manager at Fon'
              rightIcon='star'
            />
            <ListItem
              avatar='https://pbs.twimg.com/profile_images/459485216499720192/ufS4YGOY_400x400.png'
              caption='Javi Velasco'
              legend='Frontend engineer at Socialbro'
              rightIcon='star'
            />
            <ListItem
              avatar='https://avatars2.githubusercontent.com/u/559654?v=3&s=460'
              caption='Javi Jiménez'
              legend='Frontend engineer at MediaSmart'
              rightIcon='star'
            />
            <ListItem
              avatar='https://pbs.twimg.com/profile_images/477103691506282499/bsIaPEiM_400x400.jpeg'
              caption='Tobias Van Schneider'
              legend='Designer at Spotify'
              rightIcon='star'
            />
          </List>
        </div>

        <h5>Two line options and checkbox items</h5>
        <p>It can be used to embed little checkboxes in the list. These behave as checkboxes.</p>
        <div style={listStyle}>
          <List>
            <ListSubHeader caption='General' />
            <ListItem caption='Profile Photo' legend='Change your Google+ profile photo' />
            <ListItem disabled caption='Show your status' legend='Your status is visible to everyone you use with' />
          </List>
          <ListDivider />
          <List>
            <ListSubHeader caption='Hangout notifications' />
            <ListCheckbox
              caption='Notifications'
              checked={this.state.checkbox1}
              legend='Allow notifications'
              onChange={this.handleCheckboxChange.bind(this, 'checkbox1')}
            />
            <ListCheckbox
              caption='Sound'
              checked={this.state.checkbox2}
              legend='Hangouts message'
              onChange={this.handleCheckboxChange.bind(this, 'checkbox2')}
            />
            <ListCheckbox
              caption='Video sounds'
              checked
              disabled
              legend='Hangouts video call'
            />
          </List>
        </div>

        <h5>Avatar, single text and icon</h5>
        <p>Similar to a previous one but only with one text line</p>
        <div style={listStyle}>
          <List>
            <ListItem
              avatar='https://pbs.twimg.com/profile_images/614407428/s6pTalMzZs-nusCGWqoV.0_400x400.jpeg'
              caption='Alfonso Rocha'
              rightIcon='mail'
            />
            <ListItem
              avatar='https://pbs.twimg.com/profile_images/459485216499720192/ufS4YGOY_400x400.png'
              caption='Javi Velasco'
              rightIcon='mail'
            />
            <ListItem
              avatar='https://avatars2.githubusercontent.com/u/559654?v=3&s=460'
              caption='Javi Jiménez'
              rightIcon='mail'
            />
            <ListItem
              avatar='https://pbs.twimg.com/profile_images/477103691506282499/bsIaPEiM_400x400.jpeg'
              caption='Tobias Van Schneider'
              rightIcon='mail'
            />
          </List>
        </div>

        <h5>Simple with just one text line</h5>
        <p>The most simple list.</p>
        <div style={listStyle}>
          <List>
            <ListItem caption='Alfonso Rocha' />
            <ListItem caption='Javi Velasco' />
            <ListItem caption='Javi Jiménez' />
            <ListItem caption='Tobias Van Schneider' />
            <ListDivider />
            <ListItem caption='Other people' />
          </List>
        </div>

        <h5>Customized list items</h5>
        <p>Use custom components in the item</p>
        <div style={listStyle}>
          <List>
            <ListItem>
              <ListItemLeft> <span> left </span> </ListItemLeft>
              <ListItemAvatar> <img src='https://pbs.twimg.com/profile_images/614407428/s6pTalMzZs-nusCGWqoV.0_400x400.jpeg'/> </ListItemAvatar>
              <ListItemRight> <span> right </span> </ListItemRight>
              <ListItemCaption> <span> custom caption </span> </ListItemCaption>
              <ListItemLegend> <span> custom legend </span> </ListItemLegend> 
            </ListItem> 
            <ListItem
              leftIcon='done'
              rightIcon='delete'
              caption='combine'
              legend='with props'
              >
              <ListItemLeft> <span> left </span> </ListItemLeft>
            </ListItem> 
          </List>
        </div>
      </section>
    );
  }
}

export default ListTest;
