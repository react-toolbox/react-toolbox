# Card

A [card](https://www.google.com/design/spec/components/cards.html) is a piece of paper with unique related data that serves as an entry point to more detailed information. For example, a card could contain a photo, text, and a link about a single subject.

<!-- example -->
```jsx
import Card from 'react-toolbox/lib/card';

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

<!--component-docgen-start-->
