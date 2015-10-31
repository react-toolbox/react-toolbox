# Card

A [card](https://www.google.com/design/spec/components/cards.html) is a piece of paper with unique related data that serves as an entry point to more detailed information. For example, a card could contain a photo, text, and a link about a single subject.

<!-- example -->
```jsx
import Card from 'react-toolbox/card';

const actions = [
  { label: 'Play', icon: 'play-arrow'},
  { label: 'Close' }
];

const TestCards = () => (
  <Card
    image='http://pitchfork-cdn.s3.amazonaws.com/longform/221/Deerhunter-Fading-Frontier640.jpg'
    text='A Deerhunter album rollout usually coincides with some pithy and provocative statements from Bradford Cox on pop culture...'
    title='Deerhunter - Fading Frontier'
    color="rgba(0,0,0,.4)"
    actions={actions}
  />
);
```

## Properties

| Name              | Type          | Default         | Description|
|:-                 |:-:            | :-              |:-|
| actions       | Array        |               | Array of objects describing actions. These actions will be rendered as buttons and the object fields will be transferred to those.|
| className     | String        |     `''`            | Sets a class to give customized styles to the card.|
| color         | String        |                 | Sets HEX or RGBA color to add a colored layer to the heading.|
| image         | String        |                 | URL to sets a background image in the heading.|
| loading       | Boolean       | `false`                | If true, component will be disabled and showing a loading animation.|
| onClick       | Function      |                 | Callback function that is fired when the components's is clicked. It also will display a ripple effect on click. |
| subtitle      | String        |                 | Sets a complementary smaller text under the title.|
| text          | String        |                 | Sets a complementary text display as a card description.|
| title         | String        |           | Sets the title of the card.|
| type          | String        | `default`          | Type of the component to display general modifications. It can be `wide` for a larger card, `image` if it's an image card or `event` which shows just a title on top. |
