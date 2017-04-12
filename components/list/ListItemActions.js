import React from 'react';
import PropTypes from 'prop-types';
import { themr } from 'react-css-themr';
import { LIST } from '../identifiers';
import InjectListItemAction from './ListItemAction';

const factory = (ListItemAction) => {
  const ListItemActions = ({ type, children, theme }) => {
    const validChildren = React.Children.toArray(children).filter(c => (
      React.isValidElement(c)
    ));

    return (
      <span className={theme[type]}>
        {validChildren.map((action, i) => (
          <ListItemAction key={i} theme={theme} action={action} /> // eslint-disable-line
        ))}
      </span>
    );
  };

  ListItemActions.propTypes = {
    children: PropTypes.node,
    theme: PropTypes.shape({
      left: PropTypes.string,
      right: PropTypes.string,
    }),
    type: PropTypes.oneOf(['left', 'right']),
  };

  return ListItemActions;
};

const ListItemActions = factory(InjectListItemAction);
export default themr(LIST)(ListItemActions);
export { factory as listItemActionsFactory };
export { ListItemActions };
