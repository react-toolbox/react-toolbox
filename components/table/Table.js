import React from 'react';
import classnames from 'classnames';
import { themr } from 'react-css-themr';
import TableHead from './TableHead';
import TableRow from './TableRow';

class Table extends React.Component {
  static propTypes = {
    className: React.PropTypes.string,
    heading: React.PropTypes.bool,
    model: React.PropTypes.object,
    multiSelectable: React.PropTypes.bool,
    onChange: React.PropTypes.func,
    onSelect: React.PropTypes.func,
    selectable: React.PropTypes.bool,
    selected: React.PropTypes.array,
    source: React.PropTypes.array,
    theme: React.PropTypes.shape({
      table: React.PropTypes.string
    })
  };

  static defaultProps = {
    className: '',
    heading: true,
    selectable: true,
    multiSelectable: true,
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
      let newSelected = [...this.props.selected];
      if (position !== -1) { newSelected.splice(position, 1); }
      if (position !== -1 && this.props.multiSelectable) {
        newSelected.push(index);
      } else {
        newSelected = [index];
      }
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
      const {model, selected, source, selectable, multiSelectable} = this.props;
      const isSelected = selected.length === source.length;
      return (
        <TableHead
          model={model}
          onSelect={this.handleFullSelect}
          selectable={selectable}
          multiSelectable={multiSelectable}
          selected={isSelected}
          theme={this.props.theme}
        />
      );
    }
  }

  renderBody () {
    const { source, model, onChange, selectable, selected, theme } = this.props;
    return (
      <tbody>
        {source.map((data, index) => (
          <TableRow
            data={data}
            index={index}
            key={index}
            model={model}
            onChange={onChange ? this.handleRowChange.bind(this) : undefined}
            onSelect={this.handleRowSelect.bind(this, index)}
            selectable={selectable}
            selected={selected.indexOf(index) !== -1}
            theme={theme}
          />
        ))}
      </tbody>
    );
  }

  render () {
    const { className, theme } = this.props;
    return (
      <table data-react-toolbox='table' className={classnames(theme.table, className)}>
        {this.renderHead()}
        {this.renderBody()}
      </table>
    );
  }
}

export default themr('ToolboxTable')(Table);
