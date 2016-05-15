# App Bar

The app bar is a special kind of toolbar that’s used for branding, navigation, search, and actions. Usually it contains controls on the right and left side and a title with the current section or app name. You should give the content with children elements.

```jsx
import AppBar from 'react-toolbox/lib/app_bar';
import theme from 'react-toolbox/lib/app_bar/style';

const AppBarTest = () => (
  <AppBar theme={theme} fixed flat>
    <a href="/home">React Toolbox Docs</a>
    <Navigation />
  </AppBar>
);
```

## Properties

| Name          | Type    | Default  | Description|
|:-----|:-----|:-----|:-----|
| `className` | `String`  | `''`     | Set a class for the root component.|
| `fixed`     | `Bool`    | `false`  | Determine if the bar should have position `fixed` or `relative`.|
| `flat`      | `Bool`    | `false`  | If true, the AppBar shows a shadow.|
| `theme`     | `Object`  | `null`   | Classnames object defining the component style.|

## Theme interface

| Name     | Description|
|:---------|:-----------|
| `appBar` | Root class.|
| `fixed`  | Implemented when the app bar is fixed.|
| `flat`   | Implemented when the app bar is flat.|
