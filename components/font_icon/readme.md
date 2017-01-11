# Font Icon

The font icon component is used to represent an icon from the [Google Material Design](https://material.io/icons/) icon font. React Toolbox does **not** provide the font icon for you. You need to get the icons using whatever method you want. We recommend to import the font and the associated CSS from Google Fonts as is specified [here](http://google.github.io/material-design-icons/#getting-icons).

<!-- example -->
```jsx
import FontIcon from 'react-toolbox/lib/font_icon';

const FontIcons = () => (
  <span>
    <FontIcon value='add' />
    <FontIcon value='favorite' />
    <FontIcon value='account_circle' />
    <FontIcon>star</FontIcon>
  </span>
);
```

## Properties

| Name            | Type                    | Default         | Description|
|:-----|:-----|:-----|:-----|
| `alt`     | `String`                | `''`            | The text used to set the `aria-label` attribute. 
| `className`     | `String`                | `''`            | The class name to give custom styles such as sizing.|
| `value`         | `String` or `Element`   |                 | The key string for the icon you want be displayed.|
