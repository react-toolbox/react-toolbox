# Drawer

The [navigation drawer](https://www.google.com/design/spec/patterns/navigation-drawer.html) slides in from the left. It is a common pattern found in Google apps and follows the keylines and metrics for lists.

<!-- example -->
```jsx
import Drawer from 'react-toolbox/lib/drawer';
import theme from 'react-toolbox/lib/drawer/theme';
// Remember you can add styles using ThemeProvider

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
        <Drawer active={this.state.active} onOverlayClick={this.handleToggle} theme={theme}>
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
|:-----|:-----|:-----|:-----|
| `active`          | `Boolean`       | `false`       | If true, the drawer will be visible.|
| `className`       | `String`        | `''`          | Sets a class to give customized styles to the drawer.|
| `onOverlayClick`  | `Function`      |               | Callback function to be invoked when the overlay is clicked.|
| `type`            | `String`        | `left`        | Type of drawer. It can be `left` or `right` to display the drawer on the left or right side of the screen.|

## Theming

You can take a look to the `_config.scss` variables. The themed key for this component is `ToolboxDrawer`, it should implement the following interface:

| Name     | Description|
|:---------|:-----------|
| `active` | Used for the root class when the drawer is active.|
| `content`  | Used for the drawer content.|
| `drawer`   | Root class.|
| `left`   | Added to the root class when drawer is to the left.|
| `right`   | Added to the root class when drawer is to the right.|
