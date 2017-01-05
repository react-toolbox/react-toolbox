# Snackbar

Snackbars provide lightweight feedback about an operation by showing a brief message at the bottom of the screen. Snackbars can contain an action.

<!-- example -->
```jsx
import { Button, Snackbar } from 'react-toolbox';

class SnackbarTest extends React.Component {
  handleClick = () => {
    this.refs.snackbar.show();
  };

  handleSnackbarClick = () => {
    this.refs.snackbar.hide();
  };

  render () {
    return (
      <section>
        <Button label='Show Snackbar' raised onClick={this.handleClick} />
        <Snackbar
          action='Nice'
          label='A new developer started using React Toolbox'
          onClick={this.handleSnackbarClick}
          ref='snackbar'
          type='accept'
      />
      </section>
    );
  }
}
```

This component can be styled by context providing a theme with the key `RTSnackbar` through the theme provider.

## Properties

| Name          | Type                    | Default       | Description|
|:-----|:-----|:-----|:-----|
| `action`      | `String`                |               | Label for the action component inside the Snackbar.|
| `active`      | `Boolean`               |  `false`      | If true, the snackbar will be active.|
| `children`    | `String or Element`     |  `false`      | Text or node to be displayed in the content as alternative to `label`.|
| `className`   | `String`                | `''`          | Additional class name to provide custom styling.|
| `label`       | `String or Element`     |               | Text to display in the content.|
| `onClick`     | `Function`              |               | Callback function that will be called when the button action is clicked.|
| `onTimeout`   | `Function`              |               | Callback function when finish the set timeout.|
| `timeout`     | `Number`                |               | Amount of time in milliseconds after the Snackbar will be automatically hidden.|
| `type`        | `String`                |               | Indicates the action type. Can be `accept`, `warning` or `cancel`|

## Theme

| Name     | Description|
|:---------|:-----------|
| `accept` | Added to the root element in case it's accept type.|
| `active` | Added to the root element when its active.|
| `button` | Used for the button inside the component.|
| `cancel` | Added to the root element in case it's cancel type.|
| `label` | Used for the label element.|
| `portal` | Used for the portal container element.|
| `snackbar` | Used as the className for the root element of the component.|
| `warning` | Added to the root element in case it's warning type.|
