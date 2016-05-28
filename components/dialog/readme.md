# Dialog

[Dialogs](https://www.google.com/design/spec/components/dialogs.html) contain text and UI controls focused on a specific task. They inform users about critical information, require users to make decisions, or involve multiple tasks. You would need an additional component to take actions and display or hide the dialog.

<!-- example -->
```jsx
import Dialog from 'react-toolbox/lib/dialog';

class DialogTest extends React.Component {
  state = {
    active: false
  };

  handleToggle = () => {
    this.setState({active: !this.state.active});
  }

  actions = [
    { label: "Cancel", onClick: this.handleToggle },
    { label: "Save", onClick: this.handleToggle }
  ];

  render () {
    return (
      <div>
        <Button label='Show my dialog' onClick={this.handleToggle} />
        <Dialog
          actions={this.actions}
          active={this.state.active}
          onEscKeyDown={this.handleToggle}
          onOverlayClick={this.handleToggle}
          title='My awesome dialog'
        >
          <p>Here you can add arbitrary content. Components like Pickers are using dialogs now.</p>
        </Dialog>
      </div>
    );
  }
}
```

If you want to provide a theme via context, the component key is `RTDialog`.

## Properties

| Name                    | Type            | Default         | Description|
|:-----|:-----|:-----|:-----|
| `actions`               | `Array`         | `[]`            | A array of objects representing the buttons for the dialog navigation area. The properties will be transferred to the buttons.|
| `active`                | `Boolean`       | `false`         | If true, the dialog will be active.|
| `className`             | `String`        | `''`            | Sets a class to give customized styles to the dialog.|
| `onEscKeyDown`          | `Function`      |                 | Callback called when the ESC key is pressed with the overlay active. |
| `onOverlayClick`        | `Function`      |                 | Callback to be invoked when the dialog overlay is clicked.|
| `onOverlayMouseDown`    | `Function`      |                 | Callback called when the mouse button is pressed on the overlay. |
| `onOverlayMouseMove`    | `Function`      |                 | Callback called when the mouse is moving over the overlay. |
| `onOverlayMouseUp`      | `Function`      |                 | Callback called when the mouse button is released over the overlay. |
| `title`                 | `String`        |                 | The text string to use as standar title of the dialog.|
| `type`                  | `String`        | `normal`        | Used to determine the size of the dialog. It can be `small`, `normal` or `large`. |

## Theme

| Name     | Description|
|:---------|:-----------|
| `active` | Used for the root when the dialog is active.|
| `body`  | Used to wrap the dialog body.|
| `button` | Used in buttons when the dialog implements actions.|
| `dialog` | Used for the root element.|
| `navigation` | Used for the navigation element when it implements actions.|
| `title`   | Used for the title element of the dialog.|
