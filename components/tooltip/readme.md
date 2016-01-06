# Tooltip

A Tooltip is useful to show information on hover in any kind of component. We have a component that can be used as a **decorator** for any kind of component. You just have to take into account that the overflow in the component should be visible.

<!-- example -->
```jsx
import Button from 'react-toolbox/lib/button';
import Tooltip from 'react-toolbox/lib/tooltip';
import Link from 'react-toolbox/lib/link';

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

## Properties

In any component you decorate with the Tooltip you'd get some additional props:

| Name      | Type      | Default         | Description|
|:-----|:-----|:-----|:-----|
| `tooltip`     | `String`  |  | The text string to use for the tooltip.|
| `tooltipDelay`     | `Number`  |  | Amount of time in miliseconds spent before the tooltip is visible.|
| `tooltipHideOnClick`     | `Boolean`  | `true` | If true, the Tooltip hides after a click in the host component. |
