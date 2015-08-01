# Slider

```javascript
var Slider = require('react-toolbox/components/slider');

// Normal slider with max, min and initial value
<Slider min={0} max={255} value={140} />

// Slider with editable field, pinned and with steps
<Slider editable pinned step={1} min={0} max={10} step={1}/>
```

## Properties

| Name          | Type    | Default   | Description|
| ------------- |:-------:|:--------- |:---------- |
| **editable**  | Boolean | `false`   | If true, an input is shown and user can use it to set the slider value.|
| **pinned**    | Boolean | `false`   | If true, a pin with numeric value label is shown when the slider thumb is pressed. Use for settings for which users need to know the exact value of the setting.|
| **snaps**     | Boolean | `false` | If true, the slider thumb snaps to tick marks evenly spaced based on the step property value.|
| **step**      | Number  | `0.01`    | Amount to vary the value when the knob is moved or increase/decrease is called.|
| **min**       | Number  | `0`       | Minimum value permitted.|
| **max**       | Number  | `100`     | Maximum value permitted.|
| **value**     | Number  | `0`       | Value of the current value.|
| **className** | String  | `''`      | Additional class name to provide custom styling.|

## Methods

#### getValue
Returns the value of the slider.

```
slider_instance.getValue();
> 150
```

#### setValue
Sets the value of the slider.

```
var new_value = 340
slider_instance.setValue(new_value);
```
