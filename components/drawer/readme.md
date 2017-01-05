# Drawer

The [navigation drawer](https://material.google.com/patterns/navigation-drawer.html) slides in from the left. It is a common pattern found in Google apps and follows the keylines and metrics for lists.

<!-- example -->
```jsx
import Drawer from 'react-toolbox/lib/drawer';

class DrawerTest extends React.Component {
  state = {
    active: false
  };

  handleToggle = () => {
    this.setState({active: !this.state.active});
  };

  render () {
    return (
      <div>
        <Button label='Show Drawer' raised accent onClick={this.handleToggle} />
        <Drawer active={this.state.active} onOverlayClick={this.handleToggle}>
          <h5>This is your Drawer.</h5>
          <p>You can embed any content you want, for example a Menu.</p>
        </Drawer>
      </div>
    );
  }
}
```

If you want to provide a theme via context, the component key is `RTDrawer`.

## Properties

| Name              | Type          | Default         | Description|
|:-----|:-----|:-----|:-----|
| `active`          | `Boolean`       | `false`       | If true, the drawer will be visible.|
| `className`       | `String`        | `''`          | Sets a class to give customized styles to the drawer.|
| `insideTree`      | `Boolean`       | `false`       | If true the Drawer is rendered inside the normal tree.|
| `onOverlayClick`  | `Function`      |               | Callback function to be invoked when the overlay is clicked.|
| `type`            | `String`        | `left`        | Type of drawer. It can be `left` or `right` to display the drawer on the left or right side of the screen.|
| `withOverlay`     | `String`        | `true`        | If true display an Overlay that locks the scroll when the Drawer is active.|

## Theme

| Name     | Description|
|:---------|:-----------|
| `active` | Used for the root class when the drawer is active.|
| `content`  | Used for the drawer content.|
| `drawer`   | Root class.|
| `left`   | Added to the root class when drawer is to the left.|
| `right`   | Added to the root class when drawer is to the right.|
| `wrapper`  | A wrapper class for the top of the root.|
