# Card

```
var Card = require('react-toolbox/components/card');

<Card title="Default Card" />
<Card title="Default Card with text" text={text} />
<Card title="Default Card with legend" legend={legend} />
<Card title="Default Card with actions" actions={actions} />
<Card title="Defaulr Card with text & image" text={text} image="http://" />
<Card title="Default Card with text, color & onClick event" text={text}
    color="#e91e63" onClick={@onClick} />
<Card type="small" title="Small Card with text & onClick event"
    text={text} color="#00bcd4" onClick={@onClick} />
```

## Properties

| Name              | Type          | Default         | Description|
|:-                 |:-:            | :-              |:-|
| **className**     | String        |                 | Sets the class-styles of the Component.|
| **color**         | String        |                 | Sets HEX of the Component.|
| **image**         | String        |                 | Sets a background image url.|
| **text**          | String        |                 | Sets a complementary text.|
| **legend**        | String        |                 | Sets a legend text.|
| **loading**       | Boolean       |                 | If true, component will be disabled and show a loading animation.|
| **onClick**       | Function      |                 | Callback function that is fired when the components's is clicked.|
| **title**         | String        | "text"          | Sets the title of the component.|
| **type**          | String        | "text"          | Type of the component, overwrite this property if you need set a different stylesheet.|

## Methods

#### loading
If true, component will be disabled and show a loading animation.

```
card_instance.loading(true);
```
