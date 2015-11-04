import React from 'react';
import Checkbox from '../../checkbox';
import style from './style';

class Head extends React.Component {

  static propTypes = {
    className: React.PropTypes.string,
    model: React.PropTypes.object,
    onSelect: React.PropTypes.func
  };

  static defaultProps = {
    className: '',
    model: {}
  };

  handleSelectChange = (event, instance) => {
    this.props.onSelect(event, instance.getValue());
  };

  renderCellSelectable () {
    if (this.props.onSelect) {
      return (
        <th className={style.selectable}>
          <Checkbox onChange={this.handleSelectChange}/>
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
