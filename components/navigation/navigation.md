# Navigation

```
var Navigation = require('react-toolbox/components/navigation');
var routes = [
  {route:'/profile/soyjavi', icon='user'},
  {route:'http://google.com', caption='Go to Google.com'},
];
var actions = [
 {caption:"Primary", style:"primary", icon="access_alarm"}
];

<Navigation routes={routes} actions={actions} />
```

## Properties

| Name              | Type          | Default         | Description|
|:-                 |:-:            | :-              |:-|
| **actions**       | Array         |                 | Array of actions callbacks using <Button/> component definition.|
| **className**     | String        |                 | Sets the class-styles of the Component.|
| **routes**        | Array         |                 | Array of URL String using <Link/> component definition. |
| **type**          | String        | "normal"        | Type of the component, overwrite this property if you need set a different stylesheet.|
