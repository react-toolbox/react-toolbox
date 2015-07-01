# Input

```
var Input = require('react-toolbox/components/input');

<Input value='Hello' required />
<Input multiline value='Lorem ipsum...' disabled />
<Input type='number' value='1980' label='Year of birthdate' />
```

## Properties

| Name              | Type          | Default         | Description|
|:-                 |:-:            | :-              |:-|
| **type**          | String        | "normal"        | Type of the component, overwrite this property if you need set a different stylesheet.|
| **label**         | String        |                 | The text string to use for the floating label element.|
| **value**         | String        |                 | Default value using JSON data.|
| **error**         | String        |                 | Sets the error string.|
| **className**     | String        |                 | Sets the class-styles of the Component.|
| **required**      | Boolean       | false           | If true, component needs has a value.|
| **disabled**      | Boolean       | false           | If true, component will be disabled.|
| **multiline**     | Boolean       | false           | If true, a textarea element will be rendered. The textarea also grows and shrinks according to the number of lines.|
| **onChange**      | Function      |                 | Callback function that is fired when the components's value changes.|
| **onKeyPress**    | Function      |                 | Callback function that is fired when a key is pressed.|
| **onFocus**       | Function      |                 | Callback function that is fired when components is focused.|
| **onBlur**        | Function      |                 | Callback function that is fired when components is blured.|

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
