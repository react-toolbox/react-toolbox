import React, { PropTypes } from 'react';
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
    avatar: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.element
    ]),
    caption: PropTypes.string,
    children: PropTypes.any,
    className: PropTypes.string,
    disabled: PropTypes.bool,
    itemContent: PropTypes.element,
    leftActions: PropTypes.array,
    leftIcon: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.element
    ]),
    legend: PropTypes.string,
    rightActions: PropTypes.array,
    rightIcon: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.element
    ]),
    selectable: PropTypes.bool,
    theme: PropTypes.shape({
      disabled: PropTypes.string,
      item: PropTypes.string,
      selectable: PropTypes.string
    }),
    to: PropTypes.string
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
