import React from 'react';
import ClassNames from 'classnames';
import FontIcon from '../font_icon';
import Avatar from '../avatar';
import ListItemContent from './ListItemContent';
import ListItemActions from './ListItemActions';
import style from './style';

const ListItemLayout = (props) => {
  const className = ClassNames(style.item, {
    [style.disabled]: props.disabled,
    [style.selectable]: props.selectable
  }, props.className);

  const leftActions = [
    props.leftIcon && <FontIcon value={props.leftIcon} key='leftIcon'/>,
    props.avatar && <Avatar image={props.avatar} key='avatar'/>,
    ...props.leftActions
  ];
  const rightActions = [
    props.rightIcon && <FontIcon value={props.rightIcon} key='rightIcon'/>,
    ...props.rightActions
  ];
  const content = props.itemContent || <ListItemContent caption={props.caption} legend={props.legend} />;

  return (
    <span className={className}>
      <ListItemActions type='left'>{leftActions}</ListItemActions>
      {content}
      <ListItemActions type='right'>{rightActions}</ListItemActions>
    </span>
  );
};

ListItemLayout.propTypes = {
  avatar: React.PropTypes.string,
  caption: React.PropTypes.string,
  children: React.PropTypes.any,
  className: React.PropTypes.string,
  disabled: React.PropTypes.bool,
  itemContent: React.PropTypes.element,
  leftActions: React.PropTypes.array,
  leftIcon: React.PropTypes.any,
  legend: React.PropTypes.string,
  rightActions: React.PropTypes.array,
  rightIcon: React.PropTypes.any,
  selectable: React.PropTypes.bool,
  to: React.PropTypes.string
};

ListItemLayout.defaultProps = {
  disabled: false,
  selectable: false
};

export default ListItemLayout;
