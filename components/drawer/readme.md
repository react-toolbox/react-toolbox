# Drawer

The [navigation drawer](https://www.google.com/design/spec/patterns/navigation-drawer.html) slides in from the left. It is a common pattern found in Google apps and follows the keylines and metrics for lists.

<!-- example -->
```jsx
import Drawer from 'react-toolbox/drawer';

class DrawerTest extends React.Component {
  handleClick = () => {
    this.refs.drawer.show();
  };

  render () {
    return (
      <div>
        <Button kind='raised' accent label='Show Drawer' onClick={this.handleClick} />
        <Drawer ref='drawer' hideable>
          <h5>This is your Drawer.</h5>
          <p>You can embed any content you want, for example a Menu.</p>
        </Drawer>
      </div>
    );
  }
}
```

## Properties

| Name              | Type          | Default         | Description|
|:-                 |:-:            | :-              |:-|
| active        | Boolean       |  `false`        | If true, the drawer will be active by default.|
| className     | String        |     `''`        | Sets a class to give customized styles to the drawer.|
| hideable      | Bool          | `true`           | If true, the drawer will be hidden by clicking the overlay.|
| type          | String        | `left`          | Type of drawer. It can be left or right to display the drawer on the left or right side of the screen.|

## Methods

The Drawer has state to determine if it is being shown or not. It exposes methods to show and hide:

- `show` is used to show the drawer.
- `hide` is used to hide the drawer.

