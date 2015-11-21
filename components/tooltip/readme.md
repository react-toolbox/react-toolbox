# Tooltip

A tooltip is Useful for show information on hover in any kind of component. Out of the box react-toolbox offers you a property `tooltip` in the component `<Button>`.

<!-- example -->
```jsx
import Button from 'react-toolbox/lib/button';
import Tooltip from 'react-toolbox/lib/tooltip';

const TooltipTest = () => (
  <div>
    <p>Lorem ipsum dolor sit amet, <strong>consectetur<Tooltip label='This is a auto show tooltip' /></strong> adipiscing elit.</p>
    <Button label='Button with tooltip' raised accent tooltip='This is a tooltip by property' />
  </div>
);
```

## Properties

| Name      | Type      | Default         | Description|
|:-----|:-----|:-----|:-----|
| `className` | `String`  | `''` | Set a class to style the Component.|
| `delay`     | `Number`  |  | Amount of time in miliseconds before the tooltip is visible.|
| `label`     | `String`  |  | The text string to use for the tooltip.|
