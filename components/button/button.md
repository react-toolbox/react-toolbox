# Button

```
var Button = require('react-toolbox/components/button');


<Button caption="Login" />
<Button caption="Primary" style="primary" icon="access_alarm" />
<Button caption="Secondary" style="secondary" />
<Button caption="Disabled" disabled />

<Button type="circle" icon="access_alarm" />
<Button type="circle" icon="explore" style="primary" />
<Button type="circle" icon="zoom_in" style="secondary" />
<Button type="circle" icon="input" disabled={true} />
```

## Properties

```
type        : React.PropTypes.string
caption     : React.PropTypes.string
icon        : React.PropTypes.string
className   : React.PropTypes.string
disabled    : React.PropTypes.bool
loading     : React.PropTypes.bool
```

| Name              | Type          | Default         | Description|
|:-                 |:-:            | :-              |:-|
| **type**          | String        | "text"          | Type of the component, overwrite this property if you need set a different stylesheet.|
| **caption**       | String        |                 | The text string to use for the floating label element.|
| **icon**          | String        |                 | Default value using JSON data.|
| **className**     | String        |                 | Set the class-styles of the Component.|
| **disabled**      | Boolean       | false           | If true, component will be disabled.|
| **loading**       | Boolean       | false           | If true, component will be disabled and show a loading animation.|

## Methods

#### loading
If true, component will be disabled and show a loading animation.

```
input_instance.loading(true);
```
