import React from 'react';
import { Menu, MenuItem, MenuDivider } from '../../components/menu';

class MenuTest extends React.Component {
  state = {
    value: undefined
  };

  handleSelect = (item) => {
    console.log('Menu selection changed!!, now its', item);
    this.setState({value: item});
  };

  handleItemClick = () => {
    console.log('This item is so special that has a special handler');
  };

  render () {
    return (
      <section>
        <h5>Menus</h5>
        <p>This tabs can be disabled or hidden</p>

        <Menu onSelect={this.handleSelect} selectable={false} selected={this.state.value}>
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
}

export default MenuTest;
