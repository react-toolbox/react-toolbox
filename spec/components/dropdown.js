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

const fontSizes = [
  { value: '12', label: '12'},
  { value: '24', label: '24'},
  { value: '36', label: '36'},
  { value: '48', label: '48'},
  { value: '74', label: '74'}
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

  render () {
    return (
      <section>
        <h5>Dropdown</h5>
        <p>lorem ipsum...</p>

        <p>Custor template</p>
        <Dropdown
          label="Country"
          ref="dropdown1"
          onChange={this.handleChange.bind(this, 'dropdown1')}
          source={countries}
          template={this.customDropdownItem}
          value={this.state.dropdown1}
        />

        <p>Default</p>

        <Dropdown
          label="Country"
          ref="dropdown4"
          onChange={this.handleChange.bind(this, 'dropdown4')}
          source={countries}
          value={this.state.dropdown4}
        />

        <p>Without value</p>

        <Dropdown
          disabled
          ref="dropdown3"
          label="Country"
          onChange={this.handleChange.bind(this, 'dropdown3')}
          source={countries}
        />

        <p>Without value and required</p>

        <Dropdown
          label="Country"
          ref="dropdown5"
          onChange={this.handleChange.bind(this, 'dropdown5')}
          source={countries}
          required
        />

        <p>Generic overflow dropdown button</p>

        <Dropdown
          label="Country"
          ref="dropdown6"
          onChange={this.handleChange.bind(this, 'dropdown6')}
          source={countries}
          value={this.state.dropdown6}
          menu
        />

        <p>Segmented dropdown button</p>

        <Dropdown
          label="Country"
          ref="dropdown7"
          onChange={this.handleChange.bind(this, 'dropdown7')}
          source={countries}
          value={this.state.dropdown7}
          menu
          segmented
        />

        <p>Editable segmented dropdown button</p>

        <Dropdown
          label="Font size"
          ref="dropdown8"
          onChange={this.handleChange.bind(this, 'dropdown8')}
          // onInputChange={this.handleInputChange}
          source={fontSizes}
          value={this.state.dropdown8}
          menu
          segmented
          editable
        />
      </section>
    );
  }
}

export default DropdownTest;
