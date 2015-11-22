# Font Icon

The font icon component is used to represent an icon from the [Google Material Design](https://www.google.com/design/icons/) icon font. React Toolbox automatically includes the font for you so you just need to specify the name of the icon. The font icon is displayed with the current color so it can be inherited from the parent component.

<!-- example -->
```jsx
import FontIcon from 'react-toolbox/lib/font_icon';

const FontIcons = () => (
  <span>
    <FontIcon value='add' />
    <FontIcon value='add_circle_outline' />
    <FontIcon>star</FontIcon>
  </span>
);
```

## Properties

| Name              | Type          | Default         | Description|
|:-----|:-----|:-----|:-----|
| `children`     | `String`        |                 | The key string for the icon you want to be displayed.|
| `className`     | `String`        |                 | The class name to give custom styles such as sizing.|
| `value`         | `String`        |                 | The key string for the icon you want be displayed.|
