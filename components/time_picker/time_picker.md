# TimePicker

```javascript
var TimePicker = require('react-toolbox/components/time_picker');

var time = new Date();
time.setHours(17);
time.setMinutes(28);

// Initialized time picker with AM-PM format
<TimePicker format="ampm" value={time} />
```

## Properties

| Name          | Type    | Default         | Description|
| ------------- |:-------:|:--------------- |:---------- |
| **format**    | String  | `24hr`          | Format to display the clock. It can be *24hr* or *ampm*.|
| **value**     | Date    | `new Date()`    | Datetime object with currrent time by default |

## Methods

#### getValue
Returns the value of the picker.

```
input_instance.getValue();
```
