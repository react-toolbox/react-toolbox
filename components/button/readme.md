# Button

A [button](https://www.google.com/design/spec/components/buttons.html) clearly communicates what action will occur when the user touches it. It consists of text, an image, or both, designed in accordance with your app’s color theme.

<!-- example -->
```jsx
import Button from 'react-toolbox/button';

const TestButtons = () => (
  <div>
    <Button label="Flat button" />
    <Button kind="raised" label="Raised" />
    <Button kind="raised" label="Raised accent" accent icon="favorite" />
    <Button className="primary" kind="floating" icon="add" />
    <Button mini kind="floating" icon="add" accent />
  </div>
);
```

## Properties

| Name      | Type      | Default         | Description|
|:-         |:-:        | :-              |:-|
| accent    | `Bool`    | `false` | Indicates if the button should have accent color.|
| className | `String`  | `''` | Set a class to style the Component.|
| disabled  | `Boolean` | `false` | If true, component will be disabled.|
| icon      | `String`  |  | Value of the icon (See icon component). |
| kind      | `String`  | `flat`  | Type of the component, overwrite this property if you need set a different stylesheet.|
| label     | `String`  |  | The text string to use for the name of the button.|
| loading   | `Boolean`  | `false` | If true, component will be disabled and show a loading animation.|
| mini  | `Boolean` | `false`  | To be used with floating button. If true the button will be smaller.|
| onClick  | `Function` |  | Callback called when the button is clicked.|
| primary  | `false` | | If true, component will have the primary color.|
| ripple  | `Boolean`  | `true`    | If true, component will have a ripple effect on click.|

Also, any additional properties will be directly transferred to the `button` tag.
