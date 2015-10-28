# Progress Bar

```javascript
var ProgressBar = require('react-toolbox/components/progress_bar');

// Circular indeterminate progress bar
<ProgressBar type="circular" mode="indeterminate" />

// Linear determinate progress bar with buffer
<ProgressBar type="linear" mode="determinate" value={83} buffer={90}/>
```

## Properties

| Name          | Type    | Default         | Description|
| ------------- |:-------:|:--------------- |:---------- |
| **type**      | String  | `linear`        | Type of the component, it can be *circular* or *linear*.|
| **mode**      | String  | `indeterminate` | Mode of the progress bar, it can be *determinate* or *indeterminate*.|
| **value**     | Number  | `0`             | Value of the current progress.|
| **min**       | Number  | `0`             | Minimum value permitted.|
| **max**       | Number  | `100`           | Maximum value permitted.|
| **buffer**    | Number  | `0`             | Value of a secondary progress bar useful for buffering.|
| **className** | String  | `''`            | Additional class name to provide custom styling.|

## Methods

This component has no methods.
