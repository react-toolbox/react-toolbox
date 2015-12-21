import React from 'react';
import ClassNames from 'classnames';
import FontIcon from '../font_icon';
import ListItemContent from './ListItemContent';
import ListItemLeft from './ListItemLeft'
import ListItemRight from './ListItemRight'
import ListItemCaption from './ListItemCaption'
import ListItemLegend from './ListItemLegend'
import ListItemAvatar from './ListItemAvatar'
import Ripple from '../ripple';
import style from './style';

class ListItem extends React.Component {
  static propTypes = {
    avatar: React.PropTypes.string,
    caption: React.PropTypes.string,
    children: React.PropTypes.any,
    className: React.PropTypes.string,
    disabled: React.PropTypes.bool,
    leftIcon: React.PropTypes.string,
    legend: React.PropTypes.string,
    onClick: React.PropTypes.func,
    rightIcon: React.PropTypes.string,
    ripple: React.PropTypes.bool,
    selectable: React.PropTypes.bool,
    to: React.PropTypes.string
  };

  static defaultProps = {
    disabled: false,
    ripple: false,
    selectable: false
  };

  reservedChildrenTypes = new Set([ListItemLeft, ListItemRight, ListItemCaption, ListItemLegend, ListItemAvatar]);

  handleClick = (event) => {
    if (this.props.onClick && !this.props.disabled) {
      this.props.onClick(event);
    }
  };

  isReservedChild(child) {
    return child && this.reservedChildrenTypes.has(child.type);
  }

  reservedChildren() {
    let children = {};
    React.Children.forEach(this.props.children, (child) => {
      if (this.isReservedChild(child)) {
        children[child.type] = child;
      }
    });

    return children; 
  }

  renderContent () {
    const className = ClassNames(style.item, {
      [style.withLegend]: this.props.legend,
      [style.disabled]: this.props.disabled,
      [style.selectable]: this.props.selectable
    }, this.props.className);

    const defaultLeftElement = this.props.leftIcon ? <ListItemLeft><FontIcon value={this.props.leftIcon} /></ListItemLeft> : null;
    const defaultRightElement = this.props.rightIcon ? <ListItemRight><FontIcon value={this.props.rightIcon} /></ListItemRight> : null;
    const defaultCaption = <ListItemCaption> {this.props.caption} </ListItemCaption>;
    const defaultLegend = <ListItemLegend> {this.props.legend} </ListItemLegend>;
    const defaultAvatar = this.props.avatar? <ListItemAvatar> <img src={this.props.avatar} /> </ListItemAvatar> : null;
    const reservedChildren = this.reservedChildren();

    return (
      <span className={className}>
        {reservedChildren[ListItemLeft] || defaultLeftElement}
        {reservedChildren[ListItemAvatar] || defaultAvatar}
        <ListItemContent>
          {reservedChildren[ListItemCaption] || defaultCaption}
          {reservedChildren[ListItemLegend] || defaultLegend}
        </ListItemContent>
        {reservedChildren[ListItemRight] || defaultRightElement}
      </span>
    );
  }

  render () {
    return (
      <li className={style.listItem} onClick={this.handleClick} onMouseDown={this.props.onMouseDown}>
        {this.props.to ? <a href={this.props.to}>{this.renderContent()}</a> : this.renderContent()}
        {React.Children.toArray(this.props.children).filter((child) => !this.isReservedChild(child))}
      </li>
    );
  }
}

export default Ripple({
  className: style.ripple,
  centered: false
})(ListItem);
