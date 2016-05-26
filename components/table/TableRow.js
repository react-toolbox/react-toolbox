import React from 'react';
import classnames from 'classnames';
import Checkbox from '../checkbox';
import utils from '../utils/utils';

class TableRow extends React.Component {
  static propTypes = {
    data: React.PropTypes.object,
    index: React.PropTypes.number,
    model: React.PropTypes.object,
    onChange: React.PropTypes.func,
    onSelect: React.PropTypes.func,
    selectable: React.PropTypes.bool,
    selected: React.PropTypes.bool,
    theme: React.PropTypes.shape({
      editable: React.PropTypes.string,
      row: React.PropTypes.string,
      selectable: React.PropTypes.string,
      selected: React.PropTypes.string
    })
  };

  handleInputChange = (index, key, type, event) => {
    const value = type === 'checkbox' ? event.target.checked : event.target.value;
    const onChange = this.props.model[key].onChange || this.props.onChange;
    onChange(index, key, value);
  };

  renderSelectCell () {
    if (this.props.selectable) {
      return (
        <td className={this.props.theme.selectable}>
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

    // if the value is a valid React element return it directly, since it
    // cannot be edited and should not be converted to a string...
    if (React.isValidElement(value)) { return value; }

    const onChange = this.props.model[key].onChange || this.props.onChange;
    if (onChange) {
      return this.renderInput(key, value);
    } else if (value) {
      return value.toString();
    }
  }

  renderInput (key, value) {
    const index = this.props.index;
    const inputType = utils.inputTypeForPrototype(this.props.model[key].type);
    const inputValue = utils.prepareValueForInput(value, inputType);
    const checked = inputType === 'checkbox' && value ? true : null;
    return (
      <input
        checked={checked}
        onChange={this.handleInputChange.bind(null, index, key, inputType)}
        type={inputType}
        value={inputValue}
      />
    );
  }

  render () {
    const className = classnames(this.props.theme.row, {
      [this.props.theme.editable]: this.props.onChange,
      [this.props.theme.selected]: this.props.selected
    });

    return (
      <tr data-react-toolbox-table='row' className={className}>
        {this.renderSelectCell()}
        {this.renderCells()}
      </tr>
    );
  }
}

export default TableRow;
