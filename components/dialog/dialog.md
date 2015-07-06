# Dialog

```
var Dialog  = require('react-toolbox/components/dialog');
var actions = [
  { caption: "Cancel", style: "transparent", onClick: this.onClose }
,
  { caption: "Save", style: "transparent", onClick: this.onSave }
]

<Dialog title='Hello World' actions={actions}>
  /* -- more content -- */
</Dialog>
```

## Properties

```
    caption     : React.PropTypes.string
    disabled    : React.PropTypes.bool
    icon        : React.PropTypes.string
    loading     : React.PropTypes.bool
    style       : React.PropTypes.string
    type        : React.PropTypes.string
```

| Name              | Type          | Default         | Description|
|:-                 |:-:            | :-              |:-|
| **active**        | Boolean       | false           | If true, component will be shows.|
| **actions**       | Array         |                 | A array of actions callbacks for the component.|
| **className**     | String        | "normal"        | Set the class-styles of the Component.|
| **title**         | String        |                 | The text string to use for the title of the component.|
| **type**          | String        |                 | Type of the component, overwrite this property if you need set a different stylesheet.|

## Methods

#### show
Shows the dialog.

```
dialog_instance.show();
```

#### hide
Hides the dialog.

```
dialog_instance.hide();
```
