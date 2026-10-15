# Ripple

The ripple is a surface reaction that happens when the user interacts with the component. It's useful to provide feedback about a click or touch action. In React Toolbox it's implemented as an higher order component (HOC) being a requirement for the child to implement `children`, `onMouseDown` and `onTouchStart` (in case you want to support touch) props. Also it should be placed as relative. Hiding the overflow is up to you.

<!-- example -->
```jsx
import Ripple from '@/components/ui/material/ripple';

const Link = (props) => (
  <a {...props} style={{position: 'relative'}}>
    {props.children}
  </a>
);

const RippleLink = Ripple({spread: 3})(Link);
const RippleTest = () => <RippleLink href='#'>Test</RippleLink>;
```

## Options

You can pass some options to configure the default props for the ripple when decorating a component:

| Name            | Type        | Default     | Description|
|:-----|:-----|:-----|:-----|
| `centered`      | `Boolean`   | `false`     | True in case you want a centered ripple.|
| `className`     | `String`    | `''`        | String to customize appearance (color and opacity for example).|
| `multiple`      | `Boolean`   | `true`      | If true each touch produces a different wave. If false the same wave is restarted. |
| `passthrough`   | `Boolean`   | `true`      | If true it passes down `theme` and `disabled` properties when present.|
| `spread`        | `Number`    | `2`         | Factor to indicate how much should the ripple spread under the component.|
| `theme`         | `Object`    | `null`      | Optional class overrides for the rendered ripple parts.|

## Properties

In any component you decorate with the Ripple you'd get some additional props namespaced with `ripple` prefix. Some of them will get the default from the options given to the ripple factory function:

| Name              | Type         | Default             | Description|
|:-----|:-----|:-----|:-----|
| `onRippleEnded`   | `Function`  |        &nbsp;       | Function that will be called when the ripple animation ends. Beware if your animation supports multiple waves this function will be called for each ended ripple. |
| `ripple`          | `Boolean`   | `true`              | False in case you want to deactivate the ripple.|
| `rippleCentered`  | `Boolean`   | `options.centered`  | True in case you want a centered ripple.|
| `rippleClassName` | `String`    | `options.className` | String to customize appearance (color and opacity for example).|
| `rippleMultiple`  | `Boolean`   | `options.multiple`  | If true each touch produces a different wave. If false the same wave is restarted. |
| `rippleSpread`    | `Number`    | `options.spread`    | Factor to indicate how much should the ripple spread under the component.|
| `theme`           | `Object`    | `options.theme`     | Optional class overrides for the rendered ripple parts.|

## Theming

Default Tailwind classes are included. Use `theme` only to customize individual parts, or scoped CSS variables to adjust shared tokens:

| Name               | Description|
|:-------------------|:-----------|
| `ripple`           | Root classname for the ripple.|
| `rippleActive`     | Applied when the ripple is active.|
| `rippleRestarting` | Applied when the ripple is restarting.|
| `rippleWrapper`    | Wrapper class to fit to the parent element.|
