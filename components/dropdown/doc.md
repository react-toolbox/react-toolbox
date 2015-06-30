# Dropdown


```
var DropDown = require('react-toolbox/components/dropdown');

var data = [
   { '1': 'Never' },
   { '2': 'Every Night' },
   { '3': 'Weeknights' },
   { '4': 'Weekends' },
   { '5': 'Weekly' },
];

<DropDown dataSource={data} value='2' />
```

## Properties

| Name              | Type          | Default         | Description |
|:-                 |:-:            | :-              |:-|
| **type**          | String        | "normal"        | Type of the component, overwrite this property if you need set a different stylesheet.
| **className**     | String        |                 | Set the class-styles of the Component.
| **dataSource**    | Object        |                 | JSON data representing all items in the dropdown.
| **value**         | String        |                 | Default value using JSON data.
| **label**         | String        |                 | The text string to use for the floating label element.
| **disabled**      | Boolean       | false           | Set components disabled.
| **onChange**      | Function      |                 | Callback function that is fired when the components's value changes.

## Methods

#### getValue
Returns the value of the input.

```
dropdown_instance.getValue();
```

#### setValue
Sets the value of the input element.

```
dropdown_instance.setValue(newValue);
```
