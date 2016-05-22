import React from 'react';
import classnames from 'classnames';
import { themr } from 'react-css-themr';
import ListItem from './ListItem';

class List extends React.Component {
  static propTypes = {
    children: React.PropTypes.node,
    className: React.PropTypes.string,
    ripple: React.PropTypes.bool,
    selectable: React.PropTypes.bool,
    theme: React.PropTypes.shape({
      list: React.PropTypes.string.isRequired
    })
  };

  static defaultProps = {
    className: '',
    ripple: false,
    selectable: false
  };

  renderItems () {
    return React.Children.map(this.props.children, (item) => {
      if (item.type === ListItem) {
        return React.cloneElement(item, {
          ripple: this.props.ripple,
          selectable: this.props.selectable
        });
      } else {
        return React.cloneElement(item);
      }
    });
  }

  render () {
    return (
      <ul data-react-toolbox='list' className={classnames(this.props.theme.list, this.props.className)}>
        {this.renderItems()}
      </ul>
    );
  }
}

export default themr('ToolboxList')(List);
