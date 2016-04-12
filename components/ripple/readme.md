# Ripple

The ripple is a surface reaction that happens when the user interacts with the component. It's useful to provide feedback about a click or touch action. In React Toolbox it's implemented as an higher order component (HOC) being a requirement for the child to implement `children` and `onMouseDown` props. Also it should be placed as relative. Hiding the overflow is up to you.

<!-- example -->
```jsx
import Ripple from 'react-toolbox/lib/ripple';

const Link = (props) => (
  <a {...props} style={{position: 'relative'}}>
    {props.children}
  </a>
);

const RippleLink = Ripple({spread: 3})(Link);
const RippleTest = () => <RippleLink href='#'>Test</RippleLink>;
```

## Properties

In any component you decorate with the Ripple you'd get some additional props:

| Name            | Type        | Default     | Description|
|:-----|:-----|:-----|:-----|
| `centered`      | `Boolean`   | `false`     | True in case you want a centered ripple.|
| `className`     | `String`    | `''`        | String to customize appearance (color and opacity for example).|
| `onRippleEnded` | `Function`  |             | Function that will be called when the ripple animation ends. |
| `spread`        | `Number`    | `2`         | Factor to indicate how much should the ripple spread under the component.|
