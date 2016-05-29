import React from 'react';
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
    children: React.PropTypes.any,
    theme: React.PropTypes.shape({
      left: React.PropTypes.string.isRequired,
      right: React.PropTypes.string.isRequired
    }),
    type: React.PropTypes.oneOf(['left', 'right'])
  };

  return ListItemActions;
};

const ListItemActions = factory(InjectListItemAction);
export default themr(LIST)(ListItemActions);
export { factory as listItemActionsFactory };
export { ListItemActions };
