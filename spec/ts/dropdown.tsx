import * as React from 'react';
import Dropdown from '../../components/dropdown';

const style = require('../style.module.css');

const countries = [
  { value: 'EN-gb', label: 'England', img: 'http://' },
  { value: 'ES-es', label: 'Spain', img: 'http://' },
  { value: 'TH-th', label: 'Thailand', img: 'http://' },
  { value: 'EN-en', label: 'USA', img: 'http://' },
  { value: 'FR-fr', label: 'France', img: 'http://' },
];

class DropdownTest extends React.Component<any, any> {
  state: any = {
    dropdown4: 'TH-th',
  };

  handleChange = (dropdown: any, value: any) => {
    console.log('selected', value);
    const newState: any = {};
    newState[dropdown] = value;
    this.setState(newState);
  };

  customDropdownItem(data: any) {
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

  render() {
    return (
      <section>
        <h5>Dropdown</h5>
        <p>lorem ipsum...</p>

        <Dropdown
          label="Country"
          ref="dropdown1"
          onChange={this.handleChange.bind(this, 'dropdown1')}
          source={countries}
          template={this.customDropdownItem}
          value={this.state.dropdown1}
        />

        <Dropdown
          label="Country"
          ref="dropdown4"
          onChange={this.handleChange.bind(this, 'dropdown4')}
          source={countries}
          value={this.state.dropdown4}
        />

        <Dropdown
          disabled
          ref="dropdown3"
          label="Country"
          onChange={this.handleChange.bind(this, 'dropdown3')}
          source={countries}
        />

        <Dropdown
          label="Country"
          ref="dropdown5"
          onChange={this.handleChange.bind(this, 'dropdown5')}
          source={countries}
          value={this.state.dropdown5}
          required
        />
      </section>
    );
  }
}

export default DropdownTest;
