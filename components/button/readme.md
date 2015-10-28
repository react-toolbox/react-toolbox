# Button

```
var Button = require('react-toolbox/components/button');
<Button className="accent" label="Flat button" />
<Button className="primary" type="raised" label="Raised" />
<Button className="accent" type="raised" label="Raised" icon="assignment_turned_in" />
<Button className="primary" type="floating" icon="add" />
<Button className="accent mini" type="floating" icon="add" />
```

## Properties

| Name              | Type          | Default         | Description|
|:-                 |:-:            | :-              |:-|
| **className**     | String        |                 | Set the class-styles of the Component.|
| **disabled**      | Boolean       |                 | If true, component will be disabled.|
| **icon**          | String        |                 | Default value using JSON data.|
| **label**         | String        |                 | The text string to use for the floating label element.|
| **loading**       | Boolean       |                 | If true, component will be disabled and show a loading animation.|
| **ripple**        | Boolean       |                 | If true, component will have a ripple effect on click.|
| **type**          | String        | "flat"          | Type of the component, overwrite this property if you need set a different stylesheet.|

## Methods

#### loading
If true, component will be disabled and show a loading animation.

```
input_instance.loading(true);
```
