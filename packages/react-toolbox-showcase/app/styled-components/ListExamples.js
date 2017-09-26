import { withProps } from 'recompose';
import React, { Component } from 'react';
import styled from 'styled-components';
import Avatar from 'react-toolbox-sc/lib/Avatar';
import FontIcon from 'react-toolbox-sc/lib/FontIcon';
import Collapsable from 'react-toolbox-sc/lib/Collapsable';
import List, {
  ListDivider,
  ListItem,
  ListSubheader,
  ListText,
  ListTextPrimary,
  ListTextSecondary,
} from 'react-toolbox-sc/lib/List';

class ListExamples extends Component {
  state = {
    mainHoverIdx: undefined,
    nestedHoverIdx: undefined,
    nestedOpen: true,
  };

  toggleNested = () => {
    this.setState({
      nestedOpen: !this.state.nestedOpen,
    });
  }

  handleMainHoverChange = (idx) => {
    const { nestedOpen, mainHoverIdx } = this.state;
    if (mainHoverIdx === 0 && idx === 2 && nestedOpen) {
      this.setState({
        mainHoverIdx: undefined,
        nestedHoverIdx: 0,
      });
    } else if (mainHoverIdx === 2 && idx === 0 && nestedOpen) {
      this.setState({
        mainHoverIdx: undefined,
        nestedHoverIdx: 1,
      });
    } else {
      this.setState({
        mainHoverIdx: idx,
        nestedHoverIdx: undefined,
      });
    }
  }

  handleNestedStartReached = () => {
    this.setState({
      mainHoverIdx: 0,
      nestedHoverIdx: undefined,
    });
  }

  handleNestedHoverChange = (idx) => {
    this.setState({
      mainHoverIdx: undefined,
      nestedHoverIdx: idx,
    });
  }

  handleNestedEndReached = () => {
    this.setState({
      mainHoverIdx: 2,
      nestedHoverIdx: undefined,
    });
  }

  handleRootList = (node) => {
    this.rootList = node;
  }

  mainUseKeys = () => (
    this.state.navigable &&
      this.state.nestedHoverIdx === undefined
  );

  nestedUseKeys = () => (
    this.state.navigable &&
      !this.mainUseKeys()
  );

  handleToggleNavigation = (event) => {
    event.preventDefault();
    this.setState({
      navigable: !this.state.navigable,
    });
  }

  render() {
    const { nestedOpen } = this.state;
    return (
      <section>
        <h5>List with two text lines, avatar and right icon</h5>
        <p>Useful for a list of contacts or similar.</p>
        <SList>
          <ListSubheader>Favorite Albums</ListSubheader>
          <ListItem selectable>
            <Avatar image="http://i63.tinypic.com/2dqm6fb.jpg" title="Radiohead" />
            <ListText>
              <ListTextPrimary>A Moon Shaped Pool</ListTextPrimary>
              <ListTextSecondary>by Radiohead</ListTextSecondary>
            </ListText>
            <FontIcon value="file_download" />
          </ListItem>
          <ListItem selectable>
            <Avatar image="https://goo.gl/AVTtZS" title="Savages" />
            <ListText>
              <ListTextPrimary>Adore Life</ListTextPrimary>
              <ListTextSecondary>by Savages</ListTextSecondary>
            </ListText>
            <FontIcon value="file_download" />
          </ListItem>
          <ListItem selectable>
            <Avatar image="https://goo.gl/pLzpvw" title="Kendrick Lamar" />
            <ListText>
              <ListTextPrimary>DAMN</ListTextPrimary>
              <ListTextSecondary>by Kendrick Lamar</ListTextSecondary>
            </ListText>
            <FontIcon value="file_download" />
          </ListItem>
          <ListItem selectable>
            <Avatar image="http://i64.tinypic.com/qrzxgz.png" title="QOTSA" />
            <ListText>
              <ListTextPrimary>Villains</ListTextPrimary>
              <ListTextSecondary>by Queens of the Stone Age</ListTextSecondary>
            </ListText>
            <FontIcon value="file_download" />
          </ListItem>
        </SList>

        <h5>Collapsible nested lists</h5>
        <p>
          You can nest lists into list items and make them collapsible and even navigate them!
          Toggle navigation clicking <a href="#foo" onClick={this.handleToggleNavigation}>here</a>.
          Now its {this.state.navigable ? 'enabled' : 'disabled'}.
        </p>
        <SList
          hoverIdx={this.state.mainHoverIdx}
          innerRef={this.handleRootList}
          onHoverChange={this.handleMainHoverChange}
          restartOnEnd
          style={{ maxHeight: 260 }}
          useKeys={this.mainUseKeys}
        >
          <ListItem ripple onClick={this.toggleNested}>
            <Avatar><FontIcon value="folder" /></Avatar>
            <ListText>
              <ListTextPrimary>Photos</ListTextPrimary>
              <ListTextSecondary>Jan 9, 2014</ListTextSecondary>
            </ListText>
            <FontIcon value={nestedOpen ? 'keyboard_arrow_up' : 'keyboard_arrow_down'} />
          </ListItem>
          <ListItem nested={1}>
            <Collapsable collapsed={!nestedOpen}>
              <List
                hoverIdx={this.state.nestedHoverIdx}
                nested={1}
                onEndReached={this.handleNestedEndReached}
                onHoverChange={this.handleNestedHoverChange}
                onStartReached={this.handleNestedStartReached}
                rootNode={this.rootList}
                useKeys={this.nestedUseKeys}
              >
                <ListItem>
                  <ListText>
                    <ListTextPrimary>kinkaku-ji.jpg</ListTextPrimary>
                    <ListTextSecondary>Size: 240kb</ListTextSecondary>
                  </ListText>
                  <Thumbnail src="https://goo.gl/UFN5YF" />
                </ListItem>
                <ListItem>
                  <ListText>
                    <ListTextPrimary>wonderful-colors.jpg</ListTextPrimary>
                    <ListTextSecondary>Size: 140kb</ListTextSecondary>
                  </ListText>
                  <Thumbnail src="https://goo.gl/rneAJM" />
                </ListItem>
              </List>
            </Collapsable>
          </ListItem>
          <ListItem>
            <Avatar><FontIcon value="folder" /></Avatar>
            <ListText>
              <ListTextPrimary>Recipes</ListTextPrimary>
              <ListTextSecondary>Jan 17, 2014</ListTextSecondary>
            </ListText>
          </ListItem>
          <ListItem>
            <Avatar><FontIcon value="folder" /></Avatar>
            <ListText>
              <ListTextPrimary>Documents</ListTextPrimary>
              <ListTextSecondary>Jan 27, 2016</ListTextSecondary>
            </ListText>
          </ListItem>
          <ListItem>
            <Avatar><FontIcon value="folder" /></Avatar>
            <ListText>
              <ListTextPrimary>Music</ListTextPrimary>
              <ListTextSecondary>Jan 28, 2016</ListTextSecondary>
            </ListText>
          </ListItem>
        </SList>

        <h5>One line with inset divider, icon and right avatar.</h5>
        <p>Same as in Google spec site.</p>
        <SList>
          <ListSubheader>Contacts</ListSubheader>
          <ListItem>
            <Star starred />
            <ListText>Imperator Furiosa</ListText>
            <Avatar image="https://goo.gl/7PCb2j" cover title="Furiosa" />
          </ListItem>
          <ListItem>
            <Star starred />
            <ListText>Louis Bloom</ListText>
            <Avatar image="https://goo.gl/RLyqq1" cover title="Louis" />
          </ListItem>
          <ListItem>
            <Star starred />
            <ListText>Tyler Durden</ListText>
            <Avatar image="https://goo.gl/M7gNDg" cover title="Tyler" />
          </ListItem>
          <ListDivider inset />
          <ListItem>
            <Star />
            <ListText>John Wick</ListText>
            <Avatar image="https://goo.gl/aK43GA" cover title="Wick" />
          </ListItem>
          <ListItem>
            <Star />
            <ListText>Kevin Garvey</ListText>
            <Avatar image="https://goo.gl/qHMW6D" cover title="Kevin" />
          </ListItem>
          <ListItem>
            <Star />
            <ListText>Mikael Blomkvist</ListText>
            <Avatar image="https://goo.gl/pGriXr" cover title="Mikael" />
          </ListItem>
          <ListItem>
            <Star />
            <ListText>Patrick Bateman</ListText>
            <Avatar image="https://goo.gl/asDy5v" cover title="Patrick" />
          </ListItem>
          <ListItem>
            <Star />
            <ListText>Stella Carlin</ListText>
            <Avatar image="https://goo.gl/4YBJ9K" cover title="Stella" />
          </ListItem>
        </SList>

        <h5>Simple list</h5>
        <p>Simple list without icons or avatars.</p>
        <SList>
          <ListItem selectable>John Wick</ListItem>
          <ListItem selectable>Kevin Garvey</ListItem>
          <ListItem selectable>Mikael Blomkvist</ListItem>
          <ListItem selectable>Patrick Bateman</ListItem>
          <ListItem selectable>Stella Carlin</ListItem>
        </SList>
      </section>
    );
  }
}

const SList = styled(List) `
  border: 1px solid rgb(238, 238, 238);
  margin-top: 20px;
  max-width: 360px;
`;

const Thumbnail = styled.img`
  width: 55px;
`;

const Star = withProps({ value: 'star' })(styled(FontIcon) `
  opacity: ${props => (props.starred ? 1 : 0)};
`);

export default ListExamples;
