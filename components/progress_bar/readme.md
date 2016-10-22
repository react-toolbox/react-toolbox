# Progress Bar

Minimize visual changes that occur while your app loads content by representing each operation with a single [activity indicator](https://www.google.com/design/spec/components/progress-activity.html). For example, a refresh operation should display either a refresh bar or an activity circle, but not both.

<!-- example -->
```jsx
import ProgressBar from 'react-toolbox/lib/progress_bar';

const ProgressTest = () => (
  <div>
    <ProgressBar type="circular" mode="indeterminate" />
    <ProgressBar type="linear" mode="determinate" value={83} buffer={90} />
  </div>
);
```

If you want to provide a theme via context, the component key is `RTProgressBar`.

## Properties

| Name          | Type        | Default         | Description|
|:-----|:-----|:-----|:-----|
| `buffer`      | `Number`    | `0`             | Value of a secondary progress bar useful for buffering.|
| `className`   | `String`    | `''`            | Additional class name to provide custom styling.|
| `disabled`    | `Boolean`   | `false`         | If true, component will be disabled.|
| `max`         | `Number`    | `100`           | Maximum value permitted.|
| `min`         | `Number`    | `0`             | Minimum value permitted.|
| `mode`        | `String`    | `indeterminate` | Mode of the progress bar, it can be `determinate` or `indeterminate`.|
| `multicolor`  | `Boolean`   | `false`         | If true, the circular progress bar will be changing its color.|
| `type`        | `String`    | `linear`        | Type of the progress bar, it can be `circular` or `linear`.|
| `value`       | `Number`    | `0`             | Value of the current progress.|

## Theme

| Name     | Description|
|:---------|:-----------|
| `buffer` | Used to style the buffer element in the linear progress.|
| `circle` | Used for the circle element in the circular progress.|
| `circular` | Used for the root element when the type is circular.|
| `indeterminate` | Added to the root element if mode is indeterminate.|
| `linear` | Used for the root element when the type is linear.|
| `multicolor` | Added to the root if the component is multicolor (circular).|
| `path` | Used for the inner path in the circular progress.|
| `value` | Used to style the value element in the linear progress.|
