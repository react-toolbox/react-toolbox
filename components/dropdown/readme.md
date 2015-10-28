# Dropdown

```
var DropDown = require('react-toolbox/components/dropdown');

var countries: [
  value: 'ES-es', label: 'Spain', img: 'http://'
,
  value: 'TH-th', label: 'Thailand', img: 'http://'
,
  value: 'EN-gb', label: 'England', img: 'http://'
,
  value: 'EN-en', label: 'USA', img: 'http://'
,
  value: 'FR-fr', label: 'France', img: 'http://'
];

<DropDown dataSource={countries} value='TH-th' />
```

## Properties

| Name              | Type          | Default         | Description |
|:-                 |:-:            | :-              |:-|
| **className**     | String        |                 | Set the class-styles of the Component.
| **dataSource**    | Array         |                 | JSON data representing all items in the dropdown.
| **disabled**      | Boolean       | false           | Set components disabled.
| **label**         | String        |                 | The text string to use for the floating label element.
| **onChange**      | Function      |                 | Callback function that is fired when the components's value changes.
| **template**      | Function      |                 | Callback function that represents a item for the component.
| **type**          | String        | "normal"        | Type of the component, overwrite this property if you need set a different stylesheet.
| **value**         | String        |                 | Default value using JSON data.

## Methods

#### getValue
Returns the value of the input.

```
dropdown_instance.getValue();
> 'TH-th'
```

#### setValue
Sets the value of the input element.

```
var new_value = 'ES-es'
dropdown_instance.setValue(new_value);
```
