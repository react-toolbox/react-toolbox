# Switch

```
var Switch = require('react-toolbox/components/switch');

<Switch value={true} />
<Switch label='Online users' disabled/>
```

## Properties

| Name              | Type          | Default         | Description|
|:-                 |:-:            | :-              |:-|
| **className**     | String        |                 | Sets the class-styles of the Component.|
| **disabled**      | Boolean       | false           | If true, component will be disabled.|
| **label**         | String        |                 | The text string to use for the floating label element.|
| **onChange**      | Function      |                 | Callback function that is fired when the components's value changes.|
| **value**         | String        |                 | Default value using JSON data.|

## Methods

#### getValue
Returns the value of the input.

```
switch_instance.getValue();
```

#### setValue
Sets the value of the input element.

```
switch_instance.setValue(newValue);
```
