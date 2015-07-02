# Aside

```
var Aside = require('react-toolbox/components/aside');

<Aside>
  <header/>
  <section>
    <h1>Hello World</h1>
  </section>
  <footer/>
</Aside>
```

## Properties

| Name              | Type          | Default         | Description|
|:-                 |:-:            | :-              |:-|
| **type**          | String        | "left"          | Type of the component, overwrite this property if you need set a different stylesheet. Options: "left" or "right"|
| **className**     | String        |                 | Sets the class-styles of the Component.|
| **active**        | Bool          | false           | If true, component will be show by default.|
| **hideable**      | Bool          | false           | If true, the componente can be hideable clicking in it.|

## Methods

#### show
Sets the value of the input element.

```
aside_instance.show();
```

#### hide

```
aside_instance.hide();
```
