import React from 'react';
import style from '../style';

class Row extends React.Component {

  static propTypes = {
    changed: React.PropTypes.bool,
    className: React.PropTypes.string,
    data: React.PropTypes.object,
    index: React.PropTypes.number,
    onChange: React.PropTypes.func,
    onClick: React.PropTypes.func
  };

  static defaultProps = {
    className: ''
  };

  handlerClick = (event) => {
    if (this.props.onClick) {
      this.props.onClick(event, this.props.data);
    }
  };

  handlerInputChange = (key, event, component) => {
    this.props.onChange(event, this, key, event.target.value);
  };

  renderCell (key) {
    let value = this.props.data[key];

    if (this.props.onChange) {
      let attr = this.props.model[key];
      value = _castValue(value, attr.type);
      return (
        <input
          type={_castType(attr.type)}
          value={value}
          onChange={this.handlerInputChange.bind(null, key)}
        />
      )
    } else {
      return value
    }
  }

  render () {
    let className = `${this.props.className} ${style.row}`;
    if (this.props.changed) className += ` ${style.changed}`;
    if (this.props.onChange) className += ` ${style.editable}`;

    return (
      <tr data-component-table-row className={className}>
      {
        Object.keys(this.props.model).map((key) => {
          return (
            <td key={key} onClick={this.handlerClick}>{this.renderCell(key)}</td>
          )
        })
      }
      </tr>
    )
  }
}

export default Row;

// Private
let _castType = (type = String) => {
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

let _castValue = (value, type) => {
  if (value && type === Date) {
    value = new Date(value).toISOString().slice(0, 10);
  }
  return value;
};

