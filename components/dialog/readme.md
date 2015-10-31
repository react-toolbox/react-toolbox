# Dialog

[Dialogs](https://www.google.com/design/spec/components/dialogs.html) contain text and UI controls focused on a specific task. They inform users about critical information, require users to make decisions, or involve multiple tasks. You would need an additional component to take actions and display or hide the dialog.

<!-- example -->
```
import Dialog from 'react-toolbox/dialog';

class DialogTest extends React.Component {
  showDialog = () => {
    this.refs.dialog.show();
  };

  closeDialog = () => {
    this.refs.dialog.hide();
  };

  actions = [
    { label: "Cancel", onClick: this.closeDialog },
    { label: "Save", onClick: this.closeDialog }
  ];

  render () {
    return (
      <div>
        <Button label='Show my dialog' onClick={this.showDialog} />
        <Dialog ref='dialog' title='My awesome dialog' actions={this.actions}>
          <p>Here you can add arbitrary content. Components like Pickers are using dialogs now.</p>
        </Dialog>
      </div>
    );
  }
}
```

## Properties

| Name              | Type          | Default         | Description|
|:-                 |:-:            | :-              |:-|
| actions       | Array         |    `[]`         | A array of objects representing the buttons for the dialog navigation area. The properties will be transferred to the buttons.|
| active        | Boolean       |  `false`        | If true, the dialog will be active by default.|
| className     | String        |     `''`        | Sets a class to give customized styles to the time picker.|
| title         | String        |                 | The text string to use as standar title of the dialog.|
| type          | String        |  `normal`       | Used to determine the size of the dialog. It can be `small`, `normal` or `large`. |

## Methods

The Dialog has state to determine if it is being shown or not. It exposes method to show and hide:

- `show` is used to show the dialog.
- `hide` is used to hide the dialog.

