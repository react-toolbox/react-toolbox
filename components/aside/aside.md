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
| **active**        | Bool          | false           | If true, component will be show by default.|
| **className**     | String        |                 | Sets the class-styles of the Component.|
| **hideable**      | Bool          | false           | If true, the componente can be hideable clicking in it.|
| **type**          | String        | "left"          | Type of the component, overwrite this property if you need set a different stylesheet. Options: "left" or "right"|

## Methods

#### show
Show component.

```
aside_instance.show();
```

#### hide
Hide component.
```
aside_instance.hide();
```
