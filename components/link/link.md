# Link

```
var Link = require('react-toolbox/components/link');

<Link route='http://google.com' label='Go to Google.com' />
<Link route='/profile/soyjavi' icon='user' />
```

## Properties

| Name              | Type          | Default         | Description|
|:-                 |:-:            | :-              |:-|
| **label**       | String        | "normal"        | he text string to use for the floating label element.|
| **className**     | String        |                 | Sets the class-styles of the Component.|
| **count**         | Number        |                 | Sets a count number behind label property.|
| **icon**          | String        |                 | Sets a <FontIcon/> sub-component.|
| **onClick**       | Function      |                 | Dispatch event when user clicks on component.|
| **route**         | String        |                 | URL String|
