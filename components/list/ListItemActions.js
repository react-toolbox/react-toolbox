import React, { PropTypes } from 'react';
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
        {validChildren.map((action, i) => <ListItemAction key={i} theme={theme} action={action} />)}
      </span>
    );
  };

  ListItemActions.propTypes = {
    children: PropTypes.any,
    theme: PropTypes.shape({
      left: PropTypes.string, // eslint-disable-line react/no-unused-prop-types
      right: PropTypes.string, // eslint-disable-line react/no-unused-prop-types
    }),
    type: PropTypes.oneOf(['left', 'right']),
  };

  return ListItemActions;
};

const ListItemActions = factory(InjectListItemAction);
export default themr(LIST)(ListItemActions);
export { factory as listItemActionsFactory };
export { ListItemActions };
