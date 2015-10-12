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
| **className**     | String        |                 | Sets the class-styles of the Component.|
| **disabled**      | Boolean       | false           | If true, component will be disabled.|
| **error**         | String        |                 | Sets the error string.|
| **label**         | String        |                 | The text string to use for the floating label element.|
| **multiline**     | Boolean       | false           | If true, a textarea element will be rendered. The textarea also grows and shrinks according to the number of lines.|
| **icon**          | String        |                 | Icon String key.|
| **onBlur**        | Function      |                 | Callback function that is fired when components is blured.|
| **onChange**      | Function      |                 | Callback function that is fired when the components's value changes.|
| **onFocus**       | Function      |                 | Callback function that is fired when components is focused.|
| **onKeyPress**    | Function      |                 | Callback function that is fired when a key is pressed.|
| **required**      | Boolean       | false           | If true, component needs has a value.|
| **type**          | String        | "normal"        | Type of the component, overwrite this property if you need set a different stylesheet.|
| **value**         | String        |                 | Default value using JSON data.|

## Methods

#### focus
The focus event is sent to an element when it gains focus. 

```
input_instance.focus();
```


#### blur
The blur event is sent to an element when it loses focus

```
input_instance.blur();
```


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
