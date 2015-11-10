# Navigation

This component is intended to be a common wrapper for a group of links or buttons. It sets a minimal layout, semantic markup and spacing for each of those elements.

<!-- example -->
```jsx
import Navigation from 'react-toolbox/lib/navigation';

const links = [
  { href: 'http://', icon: 'person', label: 'Profile' },
  { href: 'http://', icon: 'inbox', label: 'Inbox'}
];

const actions = [
  { label: 'Alarm', kind: 'raised', icon: 'access-alarm'},
  { label: 'Location', kind: 'raised', accent: true, icon: 'room'}
];

const NavigationTest = () => (
  <div>
    <Navigation type='horizontal' actions={actions} />
    <Navigation type='horizontal' routes={links} />
  </div>
);
```

## Properties

| Name              | Type          | Default         | Description|
|:-----|:-----|:-----|:-----|
| `actions`      | `Array`         |                 | Array of objects that represent buttons so the keys will be transferred as properties to those.|
| `className`     | `String`        |                 | Set a custom class styles to style the navigation.|
| `routes`        | `Array`         |                 | Array of objects similar to actions but that will be rendered as `<Link/>` component definition. |
| `type`          | `String`        | `horizontal`        | Type of the navigation, it can be vertical or horizontal.|
