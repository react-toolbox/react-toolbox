import React from 'react';
import Table from '../../components/table';

const UserModel = {
  name: {type: String},
  twitter: {type: String, title: '@twitter'},
  birthdate: {type: Date},
  cats: {type: Number, onChange (...args) { console.log('changes:', ...args); } },
  dogs: {type: Number},
  owner: {type: Boolean }
};

const users = [
  {name: 'Javi Jimenez', twitter: '@soyjavi', birthdate: new Date(1980, 3, 11), cats: 1},
  {name: 'Javi Velasco', twitter: '@javivelasco', birthdate: new Date(1987, 1, 1), dogs: 1, owner: true}
];

class TableTest extends React.Component {
  state = {
    selected: [],
    source: users
  };

  handleChange = (row, key, value) => {
    const source = this.state.source;
    source[row][key] = value;
    this.setState({source});
  };

  handleSelect = (selected) => {
    this.setState({selected});
  };

  render () {
    return (
      <section>
        <h5>Table</h5>
        <p style={{marginBottom: '10px'}}>Organized data.</p>
        <Table
          model={UserModel}
          onChange={this.handleChange}
          onSelect={this.handleSelect}
          selectable
          selected={this.state.selected}
          source={this.state.source}
        />
      </section>
    );
  }
}

export default TableTest;
