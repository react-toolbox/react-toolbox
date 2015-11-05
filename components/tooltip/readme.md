# Tooltip

A tooltip is Useful for show information on hover in any kind of component. Out of the box react-toolbox offers you a property `tooltip` of text, an image, or both, designed in accordance with your app’s color theme.

<!-- example -->
```jsx
import Button from 'react-toolbox/button';
import Tooltip from 'react-toolbox/tooltip';

const TooltipTest = () => (
  <div>
    <p>
      Lorem ipsum dolor sit amet, <strong>consectetur<Tooltip label='This is a auto show tooltip' active /></strong> adipiscing elit.
    </p>
    
    <Button label='Button with tooltip' kind='raised' accent tooltip='This is a tooltip by property' />
  </div>
);
```

## Properties

| Name      | Type      | Default         | Description|
|:-----|:-----|:-----|:-----|
| `active`    | `Bool`    | `false` | Indicates if the tooltip is showing.|
| `className` | `String`  | `''` | Set a class to style the Component.|
| `label`     | `String`  |  | The text string to use for the tooltip.|
