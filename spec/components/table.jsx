import React from 'react';
import Table from '../../components/table';

const UserModel = {
  name: {type: String},
  twitter: {type: String},
  birthdate: {type: Date},
  cats: {type: Number},
  dogs: {type: Number},
  owner: {type: Boolean}
};

const users = [
  {name: 'Javi Jimenez', twitter: '@soyjavi', birthdate: new Date(1980, 3, 11), cats: 1},
  {name: 'Javi Velasco', twitter: '@javivelasco', birthdate: new Date(1987, 1, 1), dogs: 1, active: true}
];

class TableTest extends React.Component {

  handleTableChange = (event, row, dataSource) => {
    console.log('handleTableChange', row, dataSource);
  };

  handleTableRowSelect = (event, selected) => {
    console.log('handleTableRowSelect', selected);
  };

  render () {
    return (
      <section>
        <h5>Table</h5>
        <p style={{marginBottom: '10px'}}>Organized data.</p>
        <Table
          model={UserModel}
          dataSource={users}
          onChange={this.handleTableChange}
          onSelect={this.handleTableRowSelect}
        />
      </section>
    );
  }
}

export default TableTest;
