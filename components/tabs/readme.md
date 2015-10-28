# Tabs

```javascript
Tabs = require('../../components/tabs').Tabs
Tab  = require('../../components/tabs').Tab

<Tabs>
  <Tab label='Primary'>
    <small>primary</small>
  </Tab>
  <Tab label='Secondary'>
    <small>secondary</small>
  </Tab>
  <Tab label='Third' disabled>
    <small>third</small>
  </Tab>
  <Tab label='Fourth' hidden>
    <small>fourth</small>
  </Tab>
</Tabs>
```


## Properties <Tabs>
| Name              | Type          | Default         | Description|
|:-                 |:-:            | :-              |:-|
| **className**     | String        | `''`            | Additional class name to provide custom styling.|
| **index**         | Number        | `0`             | Current <Tab> |
| **onChange**      | Function      |                 | Callback function that is fired when the tab changes.

## Properties <Tab>

| Name              | Type          | Default         | Description|
|:-                 |:-:            | :-              |:-|
| **active**        | Boolean       | `false`         | If true, the current component is visible.|
| **className**     | String        | `''`            | Additional class name to provide custom styling.|
| **disabled**      | Boolean       | `false`         | If true, the current component is not clickable.|
| **hidden**        | Boolean       | `false`         | If true, the current component is not visible.|
| **label**         | String        |                 | Label for navigation|
| **onActive**      | Function      |                 | Callback function that is fired when the tab is activated. |
| **tabIndex**      | Number        |                 | Sets the tabindex html attribute.|

## Methods <Tab>

#### active
Active/Deactive a determinate instance of the <Tab> component.

```
tab_instance.active(true);
```
