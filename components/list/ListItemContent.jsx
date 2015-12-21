import React from 'react';
import style from './style';
import ClassNames from 'classnames';
import FontIcon from '../font_icon';
import ListItemMiddle from './ListItemMiddle';
import ListItemLeft from './ListItemLeft'
import ListItemRight from './ListItemRight'
import ListItemAvatar from './ListItemAvatar'

class ListItemContent extends React.Component {
  static propTypes = {
    avatar: React.PropTypes.string,
    caption: React.PropTypes.string,
    className: React.PropTypes.string,
    disabled: React.PropTypes.bool,
    leftIcon: React.PropTypes.string,
    legend: React.PropTypes.string,
    rightIcon: React.PropTypes.string,
    reservedChildren: React.PropTypes.object
  };

  render() {
    const className = ClassNames(style.item, {
      [style.withLegend]: this.props.legend,
      [style.disabled]: this.props.disabled,
      [style.selectable]: this.props.selectable
    }, this.props.className);

    const defaultLeftElement = this.props.leftIcon ? <ListItemLeft><FontIcon value={this.props.leftIcon} /></ListItemLeft> : null;
    const defaultRightElement = this.props.rightIcon ? <ListItemRight><FontIcon value={this.props.rightIcon} /></ListItemRight> : null;
    const defaultMiddleElement = <ListItemMiddle caption={this.props.caption} legend={this.props.legend}/>;
    const defaultAvatar = this.props.avatar? <ListItemAvatar> <img src={this.props.avatar} /> </ListItemAvatar> : null;

    return (
      <span className={className}>
        {this.props.reservedChildren[ListItemLeft] || defaultLeftElement}
        {this.props.reservedChildren[ListItemAvatar] || defaultAvatar}
        {this.props.reservedChildren[ListItemMiddle] || defaultMiddleElement}
        {this.props.reservedChildren[ListItemRight] || defaultRightElement}
      </span>
    );
  }
}

export default ListItemContent;
