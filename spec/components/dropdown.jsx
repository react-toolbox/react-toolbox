import React from 'react';
import Dropdown from '../../components/dropdown';

const countries = [
  { value: 'EN-gb', label: 'England', img: 'http://' },
  { value: 'ES-es', label: 'Spain', img: 'http://' },
  { value: 'TH-th', label: 'Thailand', img: 'http://' },
  { value: 'EN-en', label: 'USA', img: 'http://' },
  { value: 'FR-fr', label: 'France', img: 'http://' }
];

class DropdownTest extends React.Component {
  state = {
    dropdown1: 'ES-es',
    dropdown4: 'TH-th'
  };

  handleChange = (dropdown, value) => {
    const newState = {};
    newState[dropdown] = value;
    this.setState(newState);
  };

  customDropdownItem (data) {
    const style = {
      width: 32,
      height: 32,
      backgroundColor: '#ccc',
      marginRight: 8
    };

    return (
      <div data-flex="horizontal grow" data-flex-content="center">
        <img src={data.img} data-flex-grow="min" style={style} />
        <div data-flex-grow="max" data-flex="vertical" >
          <strong>{data.label}</strong>
          <small>{data.value}</small>
        </div>
      </div>
    );
  }

  render () {
    return (
      <section>
        <h5>Dropdown</h5>
        <p>lorem ipsum...</p>

        <Dropdown
          onChange={this.handleChange.bind(this, 'dropdown1')}
          source={countries}
          template={this.customDropdownItem}
          value={this.state.dropdown1}
        />

        <Dropdown
          label="Countries"
          onChange={this.handleChange.bind(this, 'dropdown2')}
          source={countries}
        />

        <Dropdown
          onChange={this.handleChange.bind(this, 'dropdown4')}
          source={countries}
          value={this.state.dropdown4}
        />

        <Dropdown
          source={countries}
          disabled
          onChange={this.handleChange.bind(this, 'dropdown3')}
        />
      </section>
    );
  }
}

export default DropdownTest;
