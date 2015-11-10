# App Bar

The app bar is a special kind of toolbar that’s used for branding, navigation, search, and actions. Usually it contains controls on the right and left side and a title with the current section or app name. You should give the content with children elements.

```jsx
import AppBar from 'react-toolbox/lib/app_bar';

const AppBarTest = () => (
  <AppBar fixed flat>
    <a href="/home">React Toolbox Docs</a>
    <Navigation />
  </AppBar>
);
```

Coming soon, the `AppBar` component will support arbitrary content attributes for left and right content and a title, for now it's just a wrapper.

## Properties

| Name          | Type    | Default  | Description|
|:-----|:-----|:-----|:-----|
| `className` | `String`  | `''`     | Set a class for the root component.|
| `flat`      | `Bool`    | `false`  | If true, the AppBar shows a shadow.|
| `fixed`     | `Bool`    | `false`  | Determine if the bar should have position `fixed` or `relative`.|
