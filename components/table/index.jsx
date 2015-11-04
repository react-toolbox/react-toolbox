import React from 'react';
import Head from './components/head';
import Row from './components/row';
import style from './style';
import utils from '../utils';

class Table extends React.Component {

  static propTypes = {
    className: React.PropTypes.string,
    dataSource: React.PropTypes.array,
    model: React.PropTypes.object,
    heading: React.PropTypes.bool,
    onChange: React.PropTypes.func,
    onSelect: React.PropTypes.func,
  };

  static defaultProps = {
    className: '',
    dataSource: [],
    heading: true
  };

  state = {
    dataSource: utils.cloneObject(this.props.dataSource),
    selected: false
  };

  componentWillReceiveProps = (next_props) => {
    if (next_props.dataSource) {
      this.setState({dataSource: utils.cloneObject(next_props.datasSource)});
    }
  };

  handleRowChange = (event, row, key, value) => {
    let dataSource = this.state.dataSource;
    dataSource[row.props.index][key] = value;
    this.setState({ dataSource: dataSource });
    if (this.props.onChange) {
      this.props.onChange(event, this, row);
    }
  };

  handleRowSelect = (event, selected, data) => {
    if (selected && this.props.onSelect) {
      this.props.onSelect(event, data);
    }
  };

  handleRowsSelect = (event, selected) => {
    this.setState({ selected: selected });
  };

  isChanged = (data, base) => {
    let changed = false;
    Object.keys(data).map( (key, index) => {
      if (data[key] !== base[key]) {
        changed = true;
      }
    })
    return changed;
  };

  renderHead () {
    if (this.props.heading) {
      return (
        <Head
          model={this.props.model}
          onSelect={this.props.onSelect ? this.handleRowsSelect : null}
        />
      )
    }
  };

  renderBody () {
    return (
      <tbody>
      {
        this.state.dataSource.map((data, index) => {
          return (
            <Row
              key={index}
              index={index}
              changed={this.isChanged(data, this.props.dataSource[index])}
              data={data}
              model={this.props.model}
              onChange={this.props.onChange ? this.handleRowChange : null}
              onSelect={this.props.onSelect ? this.handleRowSelect : null}
              selected={this.state.selected}
            />
          )
        })
      }
      </tbody>
    )
  }

  render () {
    const className = `${this.props.className} ${style.root}`;
    return (
      <table data-component-table className={className}>
        { this.renderHead() }
        { this.renderBody() }
      </table>
    );
  }

  getValue () {
    return this.state.dataSource;
  }
}

export default Table;
