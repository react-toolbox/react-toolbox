import React from 'react';
import Head from './components/head';
import Row from './components/row';
import style from './style';

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
    dataSource: _clone(this.props.dataSource)
  };

  componentWillReceiveProps = (next_props) => {
    if (next_props.dataSource) {
      this.setState({dataSource: _clone(next_props.datasSource)});
    }
  };

  handleRowChange = (event, row, key, value) => {
    console.log('handleRowChange', arguments);
    let dataSource = this.state.dataSource;
    dataSource[row.props.index][key] = value;
    this.setState({ dataSource: dataSource });
    if (this.props.onChange) {
      this.props.onChange(event, this, row);
    }
  };

  handleClick = (event, data) => {
    if (this.props.onSelect) {
      this.props.onSelect(event, data);
    }
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

  render () {
    let className = `${this.props.className} ${style.root}`;

    return (
      <table data-component-table className={className}>
        { this.props.heading ? <Head model={this.props.model} /> : null }
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
                  onClick={this.handleClick}
                />
              )
            })
          }
        </tbody>
      </table>
    );
  }

  getValue () {
    return this.state.dataSource;
  }
}

export default Table;

let _clone = (object) => {
  return JSON.parse(JSON.stringify(object))
}
