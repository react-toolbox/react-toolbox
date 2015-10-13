import React from 'react';
import style from './style.menu_divider';

export default React.createClass({

  displayName: 'MenuDivider',

  render () {
    return (
      <hr data-react-toolbox='menu-divider' className={style.root}/>
    );
  }
});
