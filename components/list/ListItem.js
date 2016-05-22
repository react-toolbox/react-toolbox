import React from 'react';
import { themr } from 'react-css-themr';
import ListItemContent from './ListItemContent';
import ListItemLayout from './ListItemLayout';
import Ripple from '../ripple';

class ListItem extends React.Component {
  static propTypes = {
    children: React.PropTypes.any,
    className: React.PropTypes.string,
    disabled: React.PropTypes.bool,
    onClick: React.PropTypes.func,
    ripple: React.PropTypes.bool,
    theme: React.PropTypes.shape({
      listItem: React.PropTypes.string.isRequired
    }),
    to: React.PropTypes.string
  };

  static defaultProps = {
    className: '',
    disabled: false,
    ripple: false
  };

  handleClick = (event) => {
    if (this.props.onClick && !this.props.disabled) {
      this.props.onClick(event);
    }
  };

  groupChildren () {
    const children = {
      leftActions: [],
      rightActions: [],
      ignored: []
    };

    React.Children.forEach(this.props.children, (child, i) => {
      if (!React.isValidElement(child)) {
        return;
      }
      if (child.props.listItemIgnore) {
        children.ignored.push(child);
        return;
      }
      if (child.type === ListItemContent) {
        children.itemContent = child;
        return;
      }
      const bucket = children.itemContent ? 'rightActions' : 'leftActions';
      children[bucket].push({...child, key: i});
    });

    return children;
  }

  render () {
    const {className, onMouseDown, to, onClick, ripple, theme, ...other} = this.props; //eslint-disable-line no-unused-vars
    const children = this.groupChildren();
    const content = <ListItemLayout {...children} {...other}/>;
    return (
      <li className={`${theme.listItem} ${className}`} onClick={this.handleClick} onMouseDown={onMouseDown}>
        {to ? <a href={this.props.to}>{content}</a> : content}
        {children.ignored}
      </li>
    );
  }
}

const RawListItem = themr('ToolboxList')(ListItem);
export default themr('ToolboxList')(Ripple({
  centered: false,
  listItemIgnore: true
})(ListItem));

export {RawListItem as RawListItem};
