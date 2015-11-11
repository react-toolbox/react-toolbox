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
    onSelect: React.PropTypes.func
  };

  static defaultProps = {
    className: '',
    dataSource: [],
    heading: true
  };

  state = {
    all: false,
    dataSource: utils.cloneObject(this.props.dataSource),
    selected_index: []
  };

  componentWillReceiveProps = (next_props) => {
    if (next_props.dataSource) {
      this.setState({dataSource: utils.cloneObject(next_props.datasSource)});
    }
  };

  handleRowChange = (event, row, key, value) => {
    const dataSource = this.state.dataSource;
    dataSource[row.props.index][key] = value;
    this.setState({ dataSource });
    if (this.props.onChange) {
      this.props.onChange(event, dataSource[row.props.index], dataSource);
    }
  };

  handleRowSelect = (event, instance) => {
    const index = instance.props.index;
    const selected_index = this.state.selected_index;
    const selected = selected_index.indexOf(index) === -1;
    if (selected) {
      selected_index.push(index);
    } else {
      delete selected_index[selected_index.indexOf(index)];
    }
    this.setState({ selected_index: selected_index });
    this.props.onSelect(event, this.getSelected());
  };

  handleRowsSelect = (event) => {
    const all = !this.state.all;
    this.setState({ all });
    this.props.onSelect(event, this.getSelected(all));
  };

  isChanged = (data, base) => {
    let changed = false;
    Object.keys(data).map((key) => {
      if (data[key] !== base[key]) {
        changed = true;
      }
    });
    return changed;
  };

  getSelected = (all = false) => {
    const rows = [];
    this.state.dataSource.map((row, index) => {
      if (all || this.state.selected_index.indexOf(index) !== -1) rows.push(row);
    });
    return rows;
  }

  renderHead () {
    if (this.props.heading) {
      return (
        <Head
          model={this.props.model}
          onSelect={this.props.onSelect ? this.handleRowsSelect : null}
          selected={this.state.all}
        />
      );
    }
  }

  renderBody () {
    return (
      <tbody>
      {
        this.state.dataSource.map((data, index) => {
          return (
            <Row
              changed={this.isChanged(data, this.props.dataSource[index])}
              data={data}
              index={index}
              key={index}
              model={this.props.model}
              onChange={this.props.onChange ? this.handleRowChange : null}
              onSelect={this.props.onSelect ? this.handleRowSelect : null}
              selected={this.state.all || this.state.selected_index.indexOf(index) !== -1}
            />
          );
        })
      }
      </tbody>
    );
  }

  render () {
    const className = `${this.props.className} ${style.root}`;
    return (
      <table data-react-toolbox='table' className={className}>
        { this.renderHead() }
        { this.renderBody() }
      </table>
    );
  }
}

export default Table;
