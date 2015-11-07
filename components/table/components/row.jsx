import React from 'react';
import Checkbox from '../../checkbox';
import style from './style';

// Private
const _castType = (type) => {
  let input_type = 'text';
  if (type === Date) {
    input_type = 'date';
  } else if (type === Number) {
    input_type = 'number';
  } else if (type === Boolean) {
    input_type = 'checkbox';
  }
  return input_type;
};

const _castValue = (value, type) => {
  let cast = value;
  if (value && type === Date) {
    cast = new Date(value).toISOString().slice(0, 10);
  }
  return cast;
};

class Row extends React.Component {

  static propTypes = {
    changed: React.PropTypes.bool,
    className: React.PropTypes.string,
    data: React.PropTypes.object,
    index: React.PropTypes.number,
    onChange: React.PropTypes.func,
    onSelect: React.PropTypes.func,
    selected: React.PropTypes.bool
  };

  static defaultProps = {
    className: ''
  };

  handleInputChange = (key, event) => {
    this.props.onChange(event, this, key, event.target.value);
  };

  handleSelectChange = (event) => {
    this.props.onSelect(event, this);
  };

  renderCell (key) {
    let value = this.props.data[key];

    if (this.props.onChange) {
      const attr = this.props.model[key];
      value = _castValue(value, attr.type);
      return (
        <input
          type={_castType(attr.type)}
          value={value}
          onChange={this.handleInputChange.bind(null, key)}
        />
      );
    } else {
      return value;
    }
  }

  renderCellSelectable () {
    if (this.props.onSelect) {
      return (
        <th className={style.selectable}>
          <Checkbox onChange={this.handleSelectChange} checked={this.props.selected}/>
        </th>
      );
    }
  }

  render () {
    let className = `${this.props.className} ${style.row}`;
    if (this.props.changed) className += ` ${style.changed}`;
    if (this.props.onChange) className += ` ${style.editable}`;
    if (this.props.selected) className += ` ${style.selected}`;

    return (
      <tr data-component-table-row className={className}>
      { this.renderCellSelectable() }
      {
        Object.keys(this.props.model).map((key) => {
          return (<td key={key}>{this.renderCell(key)}</td>);
        })
      }
      </tr>
    );
  }
}

export default Row;
