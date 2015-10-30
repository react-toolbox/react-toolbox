# Button

A button clearly communicates what action will occur when the user touches it. It consists of text, an image, or both, designed in accordance with your app’s color theme.

<!-- example -->
```
class Test extends React.Component {
  render () {
    return (
      <div>
        <Button label="Flat button" />
        <Button kind="raised" label="Raised" />
        <Button kind="raised" label="Raised accent" accent icon="favorite" />
        <Button className="primary" kind="floating" icon="add" />
        <Button mini kind="floating" icon="add" accent />
      </div>
    );
  }
}

return <Test />;
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
