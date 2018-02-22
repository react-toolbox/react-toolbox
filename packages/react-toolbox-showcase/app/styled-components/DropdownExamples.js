import styled from 'styled-components';
import React, { Component } from 'react';
import Dropdown, { DropdownOption } from 'react-toolbox-sc/lib/Dropdown';
import UserInfo from './UserInfo';

const users = [
  { id: 1, name: 'Kevin Garvey', bio: 'From The Leftovers', avatar: 'https://goo.gl/qHMW6D' },
  { id: 2, name: 'Louis Bloom', bio: 'From Nightcrawler', avatar: 'https://goo.gl/RLyqq1' },
  { id: 3, name: 'Tyler Durden', bio: 'From Fight Club', avatar: 'https://goo.gl/M7gNDg' },
  { id: 4, name: 'Patrick Bateman', bio: 'From American Psycho', avatar: 'https://goo.gl/asDy5v' },
];

class DropdownTest extends Component {
  state = {
    active: false,
    hoverIdx: null,
    value: null,
  };

  handleClick = () => {
    this.setState({ active: !this.state.active });
  }

  handleChange = (value) => {
    console.log('selected', value); // eslint-disable-line
    this.setState({ hoverIdx: null, value });
  }

  handleClickOutside = () => {
    this.setState({ active: false });
  };

  handleFocus = () => {
    this.setState({ active: true });
  };

  handleIsOptionSelected = (current, value) => (
    current && (current.id === value.id)
  );

  handleHoverChange = (hoverIdx) => {
    this.setState({ hoverIdx });
  }

  handleUseKeys = () => (
    this.state.active
  );

  renderUserInfoDropdownOption = (user) => (
    <DropdownOption key={user.name} value={user}>
      <UserInfo
        selected={this.handleIsOptionSelected(this.state.value, user)}
        user={user}
      />
    </DropdownOption>
  );

  renderNormalDropdownOption = (user) => (
    <DropdownOption key={user.name} value={user}>
      {user.name}
    </DropdownOption>
  );

  render() {
    const { active, hoverIdx, value } = this.state;
    return (
      <section>
        <h5>Dropdowns</h5>
        <p>No more <span aria-label="shit" role="img">💩</span></p>

        <Wrapper>
          <Dropdown
            active={active}
            hoverIdx={hoverIdx}
            isOptionSelected={this.handleIsOptionSelected}
            label="This is the label"
            onChange={this.handleChange}
            onClick={this.handleClick}
            onFocus={this.handleFocus}
            onClickOutside={this.handleClickOutside}
            onHoverChange={this.handleHoverChange}
            placeholder="Select an element"
            useKeys={active}
            value={value}
          >
            {users.map(this.renderUserInfoDropdownOption)}
          </Dropdown>
        </Wrapper>
      </section>
    );
  }
}

const Wrapper = styled.div`
  display: inline-block;
  width: 400px;
`;

export default DropdownTest;
