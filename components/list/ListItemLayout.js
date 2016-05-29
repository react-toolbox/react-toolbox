import React from 'react';
import classnames from 'classnames';
import { themr } from 'react-css-themr';
import { LIST } from '../identifiers.js';
import FontIcon from '../font_icon/FontIcon.js';
import InjectAvatar from '../avatar/Avatar.js';
import InjectListItemContent from './ListItemContent.js';
import InjectListItemActions from './ListItemActions.js';

const factory = (Avatar, ListItemContent, ListItemActions) => {
  const ListItemLayout = (props) => {
    const className = classnames(props.theme.item, {
      [props.theme.disabled]: props.disabled,
      [props.theme.selectable]: props.selectable
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
    const emptyActions = (item) => !item[0] && !item[1] && !item[2];

    return (
      <span className={className}>
        {!emptyActions(leftActions) > 0 && <ListItemActions type='left'>{leftActions}</ListItemActions>}
        {content}
        {!emptyActions(rightActions) > 0 && <ListItemActions type='right'>{rightActions}</ListItemActions>}
      </span>
    );
  };

  ListItemLayout.propTypes = {
    avatar: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.element
    ]),
    caption: React.PropTypes.string,
    children: React.PropTypes.any,
    className: React.PropTypes.string,
    disabled: React.PropTypes.bool,
    itemContent: React.PropTypes.element,
    leftActions: React.PropTypes.array,
    leftIcon: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.element
    ]),
    legend: React.PropTypes.string,
    rightActions: React.PropTypes.array,
    rightIcon: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.element
    ]),
    selectable: React.PropTypes.bool,
    theme: React.PropTypes.shape({
      disabled: React.PropTypes.string.isRequired,
      item: React.PropTypes.string.isRequired,
      selectable: React.PropTypes.string.isRequired
    }),
    to: React.PropTypes.string
  };

  ListItemLayout.defaultProps = {
    disabled: false,
    selectable: false
  };

  return ListItemLayout;
};

const ListItemLayout = factory(InjectAvatar, InjectListItemContent, InjectListItemActions);
export default themr(LIST)(ListItemLayout);
export { factory as listItemLayoutFactory };
export { ListItemLayout };
