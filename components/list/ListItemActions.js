import React, { PropTypes } from 'react';
import { themr } from 'react-css-themr';
import { LIST } from '../identifiers.js';
import InjectListItemAction from './ListItemAction.js';

const factory = (ListItemAction) => {
  const ListItemActions = ({type, children, theme}) => {
    const validChildren = React.Children.toArray(children).filter(c => (
      React.isValidElement(c)
    ));

    return (
      <span className={theme[type]}>
        {validChildren.map((action, i) => <ListItemAction key={i} action={action} />)}
      </span>
    );
  };

  ListItemActions.propTypes = {
    children: PropTypes.any,
    theme: PropTypes.shape({
      left: PropTypes.string,
      right: PropTypes.string
    }),
    type: PropTypes.oneOf(['left', 'right'])
  };

  return ListItemActions;
};

const ListItemActions = factory(InjectListItemAction);
export default themr(LIST)(ListItemActions);
export { factory as listItemActionsFactory };
export { ListItemActions };
