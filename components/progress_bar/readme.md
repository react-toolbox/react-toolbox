# Progress Bar

Minimize visual changes that occur while your app loads content by representing each operation with a single [activity indicator](https://www.google.com/design/spec/components/progress-activity.html). For example, a refresh operation should display either a refresh bar or an activity circle, but not both.

<!-- example -->
```jsx
import ProgressBar from 'react-toolbox/lib/progress_bar';

const ProgressTest = () => (
  <div>
    <ProgressBar type="circular" mode="indeterminate" />
    <ProgressBar type="linear" mode="determinate" value={83} buffer={90}/>
  </div>
);
```

## Properties

| Name          | Type        | Default         | Description|
|:-----|:-----|:-----|:-----|
| `buffer`      | `Number`    | `0`             | Value of a secondary progress bar useful for buffering.|
| `className`   | `String`    | `''`            | Additional class name to provide custom styling.|
| `max`         | `Number`    | `100`           | Maximum value permitted.|
| `min`         | `Number`    | `0`             | Minimum value permitted.|
| `mode`        | `String`    | `indeterminate` | Mode of the progress bar, it can be `determinate` or `indeterminate`.|
| `multicolor`  | `Boolean`   | `false`         | If true, the circular progress bar will be changing its color.|
| `type`        | `String`    | `linear`        | Type of the progress bar, it can be `circular` or `linear`.|
| `value`       | `Number`    | `0`             | Value of the current progress.|

