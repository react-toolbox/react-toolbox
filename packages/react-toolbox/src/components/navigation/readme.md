# Navigation

This component is intended to be a common wrapper for a group of links or buttons. It sets a minimal layout, semantic markup and spacing for each of those elements.

<!-- example -->
```jsx
import Navigation from 'react-toolbox/lib/navigation';
import Link from 'react-toolbox/lib/link';

const actions = [
  { label: 'Alarm', raised: true, icon: 'access_alarm'},
  { label: 'Location', raised: true, accent: true, icon: 'room'}
];

const NavigationTest = () => (
  <div>
    <Navigation type='horizontal' actions={actions} />
    <Navigation type='vertical'>
      <Link href='http://' label='Inbox' icon='inbox' />
      <Link href='http://' active label='Profile' icon='person' />
    </Navigation>
  </div>
);
```

The theming for this component can be provided using the key `RTNavigation`.

## Properties

| Name            | Type          | Default         | Description|
|:-----|:-----|:-----|:-----|
| `actions`       | `Array`       |                 | Array of objects that will be represented as `<Button/>` so the keys will be transferred as properties the Button Component.|
| `className`     | `String`      |                 | Set a custom class styles to style the navigation.|
| `routes`        | `Array`       |                 | Array of objects similar to actions but that will be rendered as `<Link/>` component definition. |
| `type`          | `String`      | `horizontal`    | Type of the navigation, it can be `vertical` or `horizontal`.|

## Theming

| Name     | Description|
|:---------|:-----------|
| `button` | Used for buttons provided in the component.|
| `horizontal`  | Used for the root element if the layout is horizontal.|
| `link`   | Used for links provided in the component.|
| `vertical`   | Used for the root element if the layout is vertical.|
