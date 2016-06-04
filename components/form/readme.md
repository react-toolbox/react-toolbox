# Form

```
var Form  = require('react-toolbox/components/form');
var fields : [
  {ref: "name", label: "Your Name", required: true, storage: true},
  {ref: "description", multiline: true, label: "Description", value: "Doer"},
  {ref: "birthdate", type: "date", label: "Birthdate"}
]

<Form attributes={fields} storage="my_toolbox_form" />
```

## Properties

| Name              | Type          | Default         | Description|
|:-                 |:-:            | :-              |:-|
| **attributes**    | array         |                 | Array of fields you want hold, fields can be instances of <Autocomplete>, <Button/>, <Dropdown>, <Input/> or <Switch/> |
| **className**     | String        |                 | Set the class-styles of the Component.|
| **onChange**      | Function      |                 | Dispatch callback when values of the component changes.|
| **onError**       | Function      |                 | Dispatch callback when a required field is null or has incorrect type.|
| **onSubmit**      | Function      |                 | Dispatch callback when user clicks on submit <Button/> |
| **onValid**       | Function      |                 | Dispatch callback when all required fields are full-filled.|
| **Storage**       | String        |                 | Sets a localStorage key for save all current field values.|
