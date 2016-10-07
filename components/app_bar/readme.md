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

If you want to provide a theme via context, the component key is `RTAppBar`.

The `AppBar` component provides properties for the common use cases of `title`, `leftIcon` and `rightIcon`. However, you can also override these with your own content by not specifying these and instead provide children elements, as shown in the example.

## Properties

| Name          | Type    | Default  | Description|
|:-----|:-----|:-----|:-----|
| `className`        | `String`   | `''`    | Set a class for the root component.|
| `fixed`            | `Bool`     | `false` | Determine if the bar should have position `fixed` or `relative`.|
| `flat`             | `Bool`     | `false` | If true, the AppBar shows a shadow.|
| `theme`            | `Object`   | `null`  | Classnames object defining the component style.|
| `title`            | `String`   | `null`  | Title used for the appbar.|
| `leftIcon`         | `String|Element`   | `null`  | Left icon.|
| `onLeftIconClick`  | `Function` | `null`  | Called on left icon click event.|
| `rightIcon`        | `String|Element`   | `null`  | Right icon.|
| `onRightIconClick` | `Function` | `null`  | Called on right icon click event.|

## Theme

| Name         | Description|
|:-------------|:-----------|
| `appBar`     | Used for the component root element.|
| `fixed`      | Added to the root element when the app bar is fixed.|
| `flat`       | Added to the root element when the app bar is flat.|
| `title`      | Added to the title element of the app bar.|
| `leftIcon`   | Added to the left icon element when the app bar.|
| `rightIcon`  | Added to the right icon element when the app bar.|
| `scrollHide` | Added to the root element when the app bar is hidden during scroll.|
