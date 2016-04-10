import React from 'react';
import Dropdown from '../../components/dropdown';
import style from '../style';

const countries = [
  { value: 'EN-gb', label: 'England', img: 'http://' },
  { value: 'ES-es', label: 'Spain', img: 'http://' },
  { value: 'TH-th', label: 'Thailand', img: 'http://' },
  { value: 'EN-en', label: 'USA', img: 'http://' },
  { value: 'FR-fr', label: 'France', img: 'http://' }
];

class DropdownTest extends React.Component {
  state = {
    dropdown4: 'TH-th'
  };

  handleChange = (dropdown, value) => {
    const newState = {};
    newState[dropdown] = value;
    this.setState(newState);
  };

  customDropdownItem (data) {
    return (
      <div className={style.dropdownTemplate}>
        <img className={style.dropdownTemplateImage} src={data.img} />
        <div className={style.dropdownTemplateContent}>
          <strong>{data.label}</strong>
          <small>{data.value}</small>
        </div>
      </div>
    );
  }

  handleFocus = (dropdowns) => {
    dropdowns.forEach((dropdown) => {
      this.refs[dropdown].close();
    });
  }

  render () {
    return (
      <section>
        <h5>Dropdown</h5>
        <p>lorem ipsum...</p>

        <Dropdown
          label="Country"
          ref="dropdown1"
          onFocus={this.handleFocus.bind(this, ['dropdown3', 'dropdown4'])}
          onChange={this.handleChange.bind(this, 'dropdown1')}
          source={countries}
          template={this.customDropdownItem}
          value={this.state.dropdown1}
        />

        <Dropdown
          label="Country"
          ref="dropdown4"
          onFocus={this.handleFocus.bind(this, ['dropdown1', 'dropdown4'])}
          onChange={this.handleChange.bind(this, 'dropdown4')}
          source={countries}
          value={this.state.dropdown4}
        />

        <Dropdown
          disabled
          ref="dropdown3"
          label="Country"
          onFocus={this.handleFocus.bind(this, ['dropdown1', 'dropdown4'])}
          onChange={this.handleChange.bind(this, 'dropdown3')}
          source={countries}
        />
      </section>
    );
  }
}

export default DropdownTest;
