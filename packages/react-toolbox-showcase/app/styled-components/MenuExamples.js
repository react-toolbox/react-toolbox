import React, { Component } from 'react';
import styled from 'styled-components';
import Button from 'react-toolbox-sc/lib/Button';
import FontIcon from 'react-toolbox-sc/lib/FontIcon';
import Menu, { MenuDivider, MenuItem, MenuText } from 'react-toolbox-sc/lib/Menu';

class MenuTest extends Component {
  state = {
    firstLevel: false,
    secondLevel: null,
    thirdLevel: null,
  };

  secondCloseTimeout;
  thirdCloseTimeout;

  toggleFirstLevel = () => {
    this.setState({
      firstLevel: !this.state.firstLevel,
    });
  }

  handleSecondMouseEnter = (event, value) => {
    if (this.secondCloseTimeout) {
      clearTimeout(this.secondCloseTimeout);
    }

    this.setState({
      secondLevel: value,
    });
  }

  handleSecondMouseLeave = () => {
    this.secondCloseTimeout = setTimeout(() => {
      this.setState({
        secondLevel: null,
        thirdLevel: null,
      });
    }, 150);
  }

  handleThirdMouseEnter = (event, value) => {
    if (this.thirdCloseTimeout) {
      clearTimeout(this.thirdCloseTimeout);
    }

    this.setState({
      thirdLevel: value,
    });
  }

  handleThirdMouseLeave = () => {
    this.thirdCloseTimeout = setTimeout(() => {
      this.setState({ thirdLevel: null });
    }, 150);
  }

  handleClickOutside = () => {
    this.setState({
      firstLevel: false,
      secondLevel: null,
      thirdLevel: null,
    });
  };

  render() {
    const { secondLevel, firstLevel, thirdLevel } = this.state;
    return (
      <section>
        <h5>Menus</h5>
        <p>An amazing menu that can be cascade!</p>

        <WrapperNode>
          <Button onClick={this.toggleFirstLevel} primary raised>
            Test it!
          </Button>
          <Menu
            active={firstLevel}
            onClickOutside={this.handleClickOutside}
            orientation="horizontal"
          >
            <MenuItem
              onMouseEnter={this.handleSecondMouseEnter}
              onMouseLeave={this.handleSecondMouseLeave}
              selectable
              value="bands"
            >
              <FontIcon value="music_note" />
              <MenuText>Favorite Bands</MenuText>
              <FontIcon value="keyboard_arrow_right" />
              <Menu
                active={secondLevel === 'bands'}
                offsetY={8 * -1}
                onClickOutside={this.handleClickOutside}
                onMouseEnter={this.handleSecondMouseEnter}
                orientation="horizontal"
                value="bands"
                withPortal
              >
                <MenuItem selectable>Pixies</MenuItem>
                <MenuItem
                  onMouseEnter={this.handleThirdMouseEnter}
                  onMouseLeave={this.handleThirdMouseLeave}
                  selectable
                  value="qotsa"
                >
                  <MenuText>Queens of the Stone Age</MenuText>
                  <FontIcon value="keyboard_arrow_right" />
                  <Menu
                    active={thirdLevel === 'qotsa'}
                    offsetY={8 * -1}
                    onClickOutside={this.handleClickOutside}
                    onMouseEnter={this.handleThirdMouseEnter}
                    onMouseLeave={this.handleThirdMouseLeave}
                    orientation="horizontal"
                    value="qotsa"
                    withPortal
                  >
                    <MenuItem selectable>Josh Homme</MenuItem>
                    <MenuItem selectable>Troy Van Leeuwen</MenuItem>
                    <MenuItem selectable>Dean Fertita</MenuItem>
                    <MenuItem selectable>Michael Shuman</MenuItem>
                    <MenuItem selectable>Jon Theodore</MenuItem>
                  </Menu>
                </MenuItem>
                <MenuItem selectable>Radiohead</MenuItem>
                <MenuItem selectable>Savages</MenuItem>
              </Menu>
            </MenuItem>
            <MenuItem
              onMouseEnter={this.handleSecondMouseEnter}
              onMouseLeave={this.handleSecondMouseLeave}
              selectable
              value="characters"
            >
              <FontIcon value="movie" />
              <MenuText>Movie characters</MenuText>
              <FontIcon value="keyboard_arrow_right" />
              <Menu
                active={secondLevel === 'characters'}
                offsetY={8 * -1}
                onClickOutside={this.handleClickOutside}
                onMouseEnter={this.handleSecondMouseEnter}
                orientation="horizontal"
                value="characters"
                withPortal
              >
                <MenuItem selectable>Imperator Furiosa</MenuItem>
                <MenuItem selectable>Louis Bloom</MenuItem>
                <MenuItem selectable>Patrick Bateman</MenuItem>
                <MenuItem selectable>Tyler Durden</MenuItem>
              </Menu>
            </MenuItem>
            <MenuDivider />
            <MenuItem selectable>Anything else</MenuItem>
          </Menu>
        </WrapperNode>
      </section>
    );
  }
}

const WrapperNode = styled.div`
  display: inline-block;
  position: relative;
`;

export default MenuTest;
