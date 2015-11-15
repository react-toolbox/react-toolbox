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
        <Dialog actions={this.actions} active={this.state.active} title='My awesome dialog'>
          <p>Here you can add arbitrary content. Components like Pickers are using dialogs now.</p>
        </Dialog>
      </div>
    );
  }
}
```

## Properties

| Name              | Type          | Default         | Description|
|:-----|:-----|:-----|:-----|
| `active`        | `Boolean`       |  `false`        | If true, the dialog will be active.|
| `actions`       | `Array`         |    `[]`         | A array of objects representing the buttons for the dialog navigation area. The properties will be transferred to the buttons.|
| `className`     | `String`        |     `''`        | Sets a class to give customized styles to the dialog.|
| `onOverlayClick`   | `Function`   |             | Callback to be invoked when the dialog overlay is clicked.|
| `title`         | `String`        |                 | The text string to use as standar title of the dialog.|
| `type`          | `String`        |  `normal`       | Used to determine the size of the dialog. It can be `small`, `normal` or `large`. |
