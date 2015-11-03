import React from 'react';
import Table from '../../components/table';

class TableTest extends React.Component {

  state = {
    model: {
      name: {type: String, required: true}
    ,
      twitter: {type: String, required: true}
    ,
      birthdate: {type: Date}
    ,
      cats: {type: Number}
    ,
      active: {type: Boolean}
    },

    dataSource: [
      {name: 'Javi Jimenez', twitter: '@soyjavi', birthdate: Date(1980, 4, 10), cats: 1}
    ,
      {name: 'Javi Velasco', twitter: '@javivelasco', birthdate: Date(1987, 4, 10), active: true}
    ]
  };

  handleTableChange = (event, instance, row) => {
    console.log('handleTableChange', instance.getValue(), row);
  };

  handleTableSelect = (event, row) => {
    console.log('handleTableSelect', row);
  };

  render () {
    return (
      <section>
        <h5>Table</h5>
        <p style={{marginBottom: '10px'}}>Table who doesn't suck...</p>
        <Table
          model={this.state.model}
          dataSource={this.state.dataSource}
          onChange={this.handleTableChange}
          onSelect={this.handleTableSelect}
        />
      </section>
    );
  }
}

export default TableTest;
