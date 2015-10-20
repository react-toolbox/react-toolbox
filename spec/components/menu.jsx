import React from 'react';
import { Menu, MenuItem, MenuDivider } from '../../components/menu';

export default class MenuTest extends React.Component {
  handleSelect (e, instance) {
    console.log('Menu selection changed!!, now its', instance.getValue());
  }

  handleItemClick () {
    console.log('This item is so special that has a special handler');
  }

  render () {
    return (
      <section>
        <h5>Menus</h5>
        <p>This tabs can be disabled or hidden</p>

        <Menu onSelect={this.handleSelect} selectable={false}>
          <MenuItem value='foo' caption='Caption' />
          <MenuItem onClick={this.handleItemClick} value='bar' caption='Caption & Shortcut' shortcut='Ctrl + P' />
          <MenuItem caption='Disabled ...' disabled shortcut='Ctrl + P' />
          <MenuDivider />
          <MenuItem caption='Caption & Icon' icon='phone' />
          <MenuItem caption='Caption, Icon & Shortcut' icon='phone' shortcut='Ctrl + P' />
          <MenuItem caption='Disabled ...' icon='phone' shortcut='Ctrl + P' disabled/>
        </Menu>
      </section>
    );
  }
};
