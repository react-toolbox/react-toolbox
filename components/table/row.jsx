import React from 'react';
import Checkbox from '../checkbox';
import utils from '../utils/utils';
import style from './style';

class TableRow extends React.Component {
  static propTypes = {
    data: React.PropTypes.object,
    onChange: React.PropTypes.func,
    onSelect: React.PropTypes.func,
    selectable: React.PropTypes.bool,
    selected: React.PropTypes.bool
  };

  handleInputChange = (key, type, event) => {
    const value = type === 'checkbox' ? event.target.checked : event.target.value;
    this.props.onChange(key, value);
  };

  renderSelectCell () {
    if (this.props.selectable) {
      return (
        <td className={style.selectable}>
          <Checkbox checked={this.props.selected} onChange={this.props.onSelect} />
        </td>
      );
    }
  }

  renderCells () {
    return Object.keys(this.props.model).map((key) => {
      return <td key={key}>{this.renderCell(key)}</td>;
    });
  }

  renderCell (key) {
    const value = this.props.data[key];
    if (this.props.onChange) {
      return this.renderInput(key, value);
    } else if (value) {
      return value.toString();
    }
  }

  renderInput (key, value) {
    const inputType = utils.inputTypeForPrototype(this.props.model[key].type);
    const inputValue = utils.prepareValueForInput(value, inputType);
    const checked = inputType === 'checkbox' && value ? true : null;
    return (
      <input
        checked={checked}
        onChange={this.handleInputChange.bind(null, key, inputType)}
        type={inputType}
        value={inputValue}
      />
    );
  }

  render () {
    let className = style.row;
    if (this.props.onChange) className += ` ${style.editable}`;
    if (this.props.selected) className += ` ${style.selected}`;

    return (
      <tr data-react-toolbox-table='row' className={className}>
        { this.renderSelectCell() }
        { this.renderCells() }
      </tr>
    );
  }
}

export default TableRow;
