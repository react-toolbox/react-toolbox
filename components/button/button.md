# Button

```
var Button = require('react-toolbox/components/button');

<Button caption="Login" />
<Button caption="Primary" className="primary" icon="access_alarm" />
<Button caption="Secondary" className="secondary" />
<Button caption="Disabled" disabled />

<Button type="circle" icon="access_alarm" />
<Button type="circle" icon="explore" className="primary" />
<Button type="circle" icon="zoom_in" className="secondary" />
<Button type="circle" icon="input" disabled={true} />
```

## Properties

| Name              | Type          | Default         | Description|
|:-                 |:-:            | :-              |:-|
| **caption**       | String        |                 | The text string to use for the floating label element.|
| **className**     | String        |                 | Set the class-styles of the Component.|
| **disabled**      | Boolean       |                 | If true, component will be disabled.|
| **icon**          | String        |                 | Default value using JSON data.|
| **loading**       | Boolean       |                 | If true, component will be disabled and show a loading animation.|
| **type**          | String        | "text"          | Type of the component, overwrite this property if you need set a different stylesheet.|

## Methods

#### loading
If true, component will be disabled and show a loading animation.

```
input_instance.loading(true);
```
