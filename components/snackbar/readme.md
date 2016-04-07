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
          icon='question_answer'
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

## Properties

| Name          | Type                    | Default       | Description|
|:-----|:-----|:-----|:-----|
| `action`      | `String`                |               | Label for the action component inside the Snackbar.|
| `active`      | `Boolean`               |  `false`      | If true, the snackbar will be active.|
| `className`   | `String`                | `''`          | Additional class name to provide custom styling.|
| `icon`        | `String` or `Element`   |               | String key for an icon or Element which will be displayed in left side of the snackbar.|
| `label`       | `String`                |               | Text to display in the content. Required.|
| `onClick`     | `Function`              |               | Callback function that will be called when the button action is clicked.|
| `onTimeout`   | `Function`              |               | Callback function when finish the set timeout.|
| `timeout`     | `Number`                |               | Amount of time in milliseconds after the Snackbar will be automatically hidden.|
| `type`        | `String`                |               | Indicates the action type. Can be `accept`, `warning` or `cancel`|
