# Tooltip

A Tooltip is useful to show information on hover in any kind of component. We have a component that can be used as a **decorator** for any kind of component. Also, it's factory function is exposed so you can create your own decorator with specific properties.

<!-- example -->
```jsx
import Button from 'react-toolbox/lib/button';
import Input from 'react-toolbox/lib/input';
import Link from 'react-toolbox/lib/link';
import Tooltip from 'react-toolbox/lib/tooltip';

const TooltipButton = Tooltip(Button);
const TooltipInput = Tooltip(Input);
const TooltipLink = Tooltip(Link);

const TooltipTest = () => (
  <div>
    <TooltipButton label='Bookmark' icon='bookmark' raised primary tooltip='Bookmark Tooltip' tooltipDelay={1000} />
    <TooltipButton icon='add' floating accent tooltip='Floating Tooltip' />
    <TooltipLink count={42} href="#" label="The answer is" icon='speaker_notes' tooltip='Question - universe?'/>
    <TooltipInput tooltip='lorem ipsum...' />
  </div>
);
```

This component can be styled by context providing a theme with the key `RTTooltip` through the theme provider.

## Properties

In any component you decorate with the Tooltip you'd get some additional props:

| Name                  | Type          | Default       | Description|
|:-----|:-----|:-----|:-----|
| `className`           | `String`      | `''`          | Sets a class to give customized styles to the tooltip.|
| `onClick`             | `Function`    |     &nbsp;    | Callback to be invoked when Component is clicked.|
| `onMouseEnter`        | `Function`    |     &nbsp;    | Callback called when the mouse enters the Component.|
| `onMouseLeave`        | `Function`    |     &nbsp;    | Callback called when the mouse leaves the Component.|
| `tooltip`             | `String`      |     &nbsp;    | The text string to use for the tooltip.|
| `tooltipDelay`        | `Number`      |     &nbsp;    | Amount of time in miliseconds spent before the tooltip is visible.|
| `tooltipHideOnClick`  | `Boolean`     | `true`        | If true, the Tooltip hides after a click in the host component.|
| `tooltipPosition`     | `String`      | `vertical`    | Determines the position of the tooltip. It can be automatic with `vertical` and `horizontal` values or forced with `bottom`, `top`, `left` or `right`.|
| `tooltipShowOnClick`  | `Boolean`     | `false`       | Determines the tooltip should be toggled when clicked. This is useful for mobile where there is no mouse enter.|

## Theming

| Name     | Description|
|:---------|:-----------|
| `tooltip` | Added to the tooltip element wrapper.|
| `tooltipActive` | Added to the root when the tooltip is active.|
| `tooltipBottom` | Added to the root in case the tooltip is being positioned at bottom.|
| `tooltipInner` | Added to the inner element which sets the background, font and rounded borders.|
| `tooltipLeft` | Added to the root in case the tooltip is being positioned at left.|
| `tooltipRight` | Added to the root in case the tooltip is being positioned at right.|
| `tooltipTop` | Added to the root in case the tooltip is being positioned at top.|
