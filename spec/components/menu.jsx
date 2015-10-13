import React from 'react';
import { Menu, MenuItem, MenuDivider } from '../../components/menu';

export default React.createClass({
  displayName: 'MenuTest',

  render () {
    return (
      <section>
        <h5>Menus</h5>
        <p>This tabs can be disabled or hidden</p>

        <Menu>
          <MenuItem caption='Caption' />
          <MenuItem caption='Caption & Shortcut' shortcut='ctrl + P' />
          <MenuItem caption='Disabled ...' disabled shortcut='ctrl + P' />
          <MenuDivider />
          <MenuItem caption='Caption & Icon' icon='phone' />
          <MenuItem caption='Caption, Icon & Shortcut' icon='phone' shortcut='ctrl + P' />
          <MenuItem caption='Disabled ...' icon='phone' shortcut='ctrl + P' disabled/>
        </Menu>
      </section>
    );
  }
});
