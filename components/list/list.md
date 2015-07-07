# List

```
var List = require('react-toolbox/components/list');
var data = [];
var template = function(data) {
  <a href=/item/{data.id}>{data.name}</a>
};

<List dataSource={data} ItemFactory={template} />
```

## Properties

| Name              | Type          | Default         | Description|
|:-                 |:-:            | :-              |:-|
| **className**     | String        |                 | Sets the class-styles of the Component.|
| **dataSource**    | Array         | required        | JSON data representing all items in the list. |
| **ItemFactory**   | Function      | required        | Callback who contains the item data representation.|
| **onClick**       | Function      |                 | Dispatch event when user clicks on any item sub-component.|
| **type**          | String        |                 | Type of the component, overwrite this property if you need set a different stylesheet.|
