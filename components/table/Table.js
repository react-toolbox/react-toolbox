import React from 'react';
import TableHead from './TableHead';
import TableRow from './TableRow';
import style from './style';

class Table extends React.Component {
  static propTypes = {
    className: React.PropTypes.string,
    heading: React.PropTypes.bool,
    model: React.PropTypes.object,
    onChange: React.PropTypes.func,
    onSelect: React.PropTypes.func,
    selectable: React.PropTypes.bool,
    selected: React.PropTypes.array,
    source: React.PropTypes.array
  };

  static defaultProps = {
    className: '',
    heading: true,
    selectable: true,
    selected: [],
    source: []
  };

  handleFullSelect = () => {
    if (this.props.onSelect) {
      const {source, selected} = this.props;
      const newSelected = source.length === selected.length ? [] : source.map((i, idx) => idx);
      this.props.onSelect(newSelected);
    }
  };

  handleRowSelect = (index) => {
    if (this.props.onSelect) {
      const position = this.props.selected.indexOf(index);
      const newSelected = [...this.props.selected];
      if (position !== -1) newSelected.splice(position, 1); else newSelected.push(index);
      this.props.onSelect(newSelected);
    }
  };

  handleRowChange = (index, key, value) => {
    if (this.props.onChange) {
      this.props.onChange(index, key, value);
    }
  };

  renderHead () {
    if (this.props.heading) {
      const {model, selected, source, selectable} = this.props;
      const isSelected = selected.length === source.length;
      return (
        <TableHead
          model={model}
          onSelect={this.handleFullSelect}
          selectable={selectable}
          selected={isSelected}
        />
      );
    }
  }

  renderBody () {
    const rows = this.props.source.map((data, index) => {
      return (
        <TableRow
          data={data}
          index={index}
          key={index}
          model={this.props.model}
          onChange={this.props.onChange ? this.handleRowChange.bind(this) : undefined}
          onSelect={this.handleRowSelect.bind(this, index)}
          selectable={this.props.selectable}
          selected={this.props.selected.indexOf(index) !== -1}
        />
      );
    });

    return <tbody>{rows}</tbody>;
  }

  render () {
    let className = style.root;
    if (this.props.className) className += ` ${this.props.className}`;
    return (
      <table data-react-toolbox='table' className={className}>
        {this.renderHead()}
        {this.renderBody()}
      </table>
    );
  }
}

export default Table;
