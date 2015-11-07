import React from 'react';
import Checkbox from '../../checkbox';
import style from './style';

class Head extends React.Component {

  static propTypes = {
    className: React.PropTypes.string,
    model: React.PropTypes.object,
    onSelect: React.PropTypes.func,
    selected: React.PropTypes.bool
  };

  static defaultProps = {
    className: '',
    model: {},
    selected: false
  };

  handleSelectChange = (event) => {
    this.props.onSelect(event);
  };

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
    return (
      <thead data-component-table-head className={this.props.className}>
        <tr>
        { this.renderCellSelectable() }
        {
          Object.keys(this.props.model).map((key) => {
            return (<th key={key}>{key}</th>);
          })
        }
        </tr>
      </thead>
    );
  }
}

export default Head;
