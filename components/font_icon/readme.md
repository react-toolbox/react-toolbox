# Font Icon

The font icon component is used to represent an icon from the [Google Material Design](https://www.google.com/design/icons/) icon font. React Toolbox automatically includes the font for you so you just need to specify the name of the icon. Every name corresponds with the original one but separated with dashes. The font icon is displayed with the current color so it can be inherited from the parent component.

<!-- example -->
```jsx
import FontIcon from 'react-toolbox/font_icon';

const FontIcons = () => (
  <span>
    <FontIcon value='add' />
    <FontIcon value='favorite' />
    <FontIcon value='star' />
  </span>
);
```

## Properties

| Name              | Type          | Default         | Description|
|:-----|:-----|:-----|:-----|
| `className`     | `String`        |                 | The class name to give custom styles such as sizing.|
| `value`         | `String`        |                 | The key string for the icon you want be displayed.|
