# DatePicker

```javascript
var DatePicker = require('react-toolbox/components/date_picker');

var date = new Date(1995,11,17);

// Initialized date picker
<DatePicker value={date} />
```

## Properties

| Name          | Type    | Default         | Description|
| ------------- |:-------:|:--------------- |:---------- |
| **value**     | Date    | `new Date()`    | Date object with currrent date by default |

## Methods

#### getValue
Returns the value of the picker.

```
input_instance.getValue();
```
