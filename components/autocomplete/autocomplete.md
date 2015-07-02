# Aside

```
var Autocomplete = require('react-toolbox/components/autocomplete');

var data = [
   { '1': 'Never' },
   { '2': 'Every Night' },
   { '3': 'Weeknights' },
   { '4': 'Weekends' },
   { '5': 'Weekly' },
];

<Autocomplete label="Period" dataSource={data} value='4' />
```

## Properties

| Name              | Type          | Default         | Description|
|:-                 |:-:            | :-              |:-|
| **type**          | String        | "text"          | Type of the component, overwrite this property if you need set a different stylesheet.|
| **label**         | String        |                 | The text string to use for the floating label element.|
| **value**         | String        |                 | Default value using JSON data.|
| **error**         | String        |                 | Sets the error string.|
| **multiple**      | Bool          | true            | If true, component can hold multiple values.|
| **exact**         | Bool          | true            | If true, component only accepts values from dataSource property..|
| **required**      | Boolean       | false           | If true, component needs has a value.|
| **disabled**      | Boolean       | false           | If true, component will be disabled.|
| **dataSource**    | Object        |                 | JSON data representing all items in the component.|
| **colors**        | Object        |                 | JSON data representing all colors per key in the dropdown.||
| **onChange**      | Function      |                 | Callback function that is fired when the components's value changes.|

## Methods

#### getValue
Returns the value of the input.

```
input_instance.getValue();
```

#### setValue
Sets the value of the input element.

```
input_instance.setValue(newValue);
```

#### setError

```
input_instance.setError("Something is wrong...");
```
