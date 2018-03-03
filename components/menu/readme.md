# Menu

A [Menu](https://material.google.com/components/menus.html) is a temporary piece of material emitted from a button, an action, a pointer, or another control that contains at least two menu items. Each menu item is a discrete option or action that can affect the app, the view, or selected elements within a view. Menus should not be used as a primary method for navigation within an app. You can compose a menu based on a few subcomponents, same as for Lists.

<!-- example -->
```jsx
import {IconMenu, MenuItem, MenuDivider } from 'react-toolbox/lib/menu';

const MenuTest = () => (
  <IconMenu icon='more_vert' position='topLeft' menuRipple>
    <MenuItem value='download' icon='get_app' caption='Download' />
    <MenuItem value='help' icon='favorite' caption='Favorite' />
    <MenuItem value='settings' icon='open_in_browser' caption='Open in app' />
    <MenuDivider />
    <MenuItem value='signout' icon='delete' caption='Delete' disabled />
  </IconMenu>
);
```

If you want to provide a theme for any of these subcomponents via context, the component key is `RTMenu`.

## Menu

This subcomponent is the default wrapper for a menu and is responsible for the opening behavior. Its properties can affect to the Item children.

### Properties

| Name          | Type          | Default     | Description|
|:-----|:-----|:-----|:-----|
| `active`      | `Boolean`     | `false`     | If true, the menu will be displayed as opened by default.|
| `className`   | `String`      | `''`        | Set a class to give custom styles to the menu wrapper.|
| `onHide`      | `Function`    |             | Callback that will be called when the menu is being hidden. |
| `onSelect`    | `Function`    |             | Callback that will be invoked when a menu item is selected. |
| `onShow`      | `Function`    |             | Callback that will be invoked when the menu is being shown. |
| `outline`     | `Boolean`     | `true`      | If true the menu wrapper will show an outline with a soft shadow. |
| `position`    | `String`      | `static`    | Determine the position of the menu. With `static` value the menu will be always shown, `auto` means that the it will decide the opening direction based on the current position. To force a position use `topLeft`, `topRight`, `bottomLeft`, `bottomRight`. |
| `ripple`      | `Boolean`     | `true`      | If true, the menu items will show a ripple effect on click. |
| `selectable`  | `Boolean`     | `false`     | If true, the menu will keep a value to highlight the active child item. |
| `selected`    | `Any`         |             | Used for selectable menus. Indicates the current selected value so the child item with this value can be highlighted. |

### Theming

| Name     | Description|
|:---------|:-----------|
| `active`   | Added to the root element when menu is active.|
| `bottomLeft`   | Added to the root when position is bottom left.|
| `bottomRight`   | Added to the root when position is bottom right.|
| `menu`   | Used for the root element of the menu.|
| `menuInner`   | Used for the inner wrapper.|
| `outline`   | Used to draw the outline.|
| `rippled`   | Added to the menu in case if should have ripple.|
| `static`   | Added to the root in case its static.|
| `topLeft`   | Added to the root when position is top left.|
| `topRight`   | Added to the root when position is top right.|

## Icon Menu

As the most usual scenario will be to open the menu from a click in an Icon, we provide this subcomponent implementing this behavior. The `IconMenu` shows an icon and implements a `Menu` under the covers that is shown when is clicked. Some of its properties are transferred to the menu, others to the children:

### Properties

| Name            | Type                  | Default         | Description|
|:-----|:-----|:-----|:-----|
| `active`        | `Boolean`             | `false`         | If true, the inner `Menu` component will be active. |
| `className`     | `String`              |  `''`           | Set a class to give custom styles to the icon wrapper.|
| `icon`          | `String` or `Element` | `more_vert`     | Icon font key string or Element to display the opener icon. |
| `iconRipple`    | `Boolean`             | `true`          | If true, the icon will show a ripple when is clicked. |
| `inverse`       | `Boolean`             | `false`         | If true, the neutral colors are inverted. Useful if the icon is over a dark background. |
| `menuRipple`    | `Boolean`             | `true`          | Transferred to the `Menu` component. |
| `onClick`       | `Function`            |                 | Callback that will be called when the icon is clicked. |
| `onHide`        | `Function`            |                 | Callback that will be called when the menu is being hidden. |
| `onSelect`      | `Function`            |                 | Callback that will be invoked when a menu item is selected. |
| `onShow`        | `Function`            |                 | Callback that will be invoked when the menu is being shown. |
| `position`      | `String`              | `auto`          | Determines the position of the menu. This property is transferred to the inner `Menu` component. |
| `selectable`    | `Boolean`             | `false`         | If true, the menu will keep a value to highlight the active child item. |
| `selected`      | `Any`                 |                 | Used for selectable menus. Indicates the current selected value so the child item with this value can be highlighted. |

### Theming

| Name     | Description|
|:---------|:-----------|
| `icon`   | Used for the icon element.|
| `iconMenu`   | Used for the root element of the icon menu.|

## Menu Item

The inner component for menus and describes the content of each option. It behaves in a similar way to List Items but simpler.

### Properties

| Name              | Type              | Default     | Description|
|:-----|:-----|:-----|:-----|
| `caption`     | `String`              |             | The text to include in the menu item. Required.|
| `className`   | `String`              | `''`        | Set a class to give custom styles to the item.|
| `disabled`    | `Boolean`             | `false`     | If true, the item will be displayed as disabled and is not selectable.|
| `icon`        | `String` or `Element` |             | Icon font key string or Element to display in the right side of the option. |
| `onClick`     | `Function`            |             | Callback that will be called when Component is clicked. |
| `selected`    | `Boolean`             | `false`     | Transferred from the `Menu` component for selectable menus. Indicates if it's the current active option. |
| `shortcut`    | `String`              | `''`        | Displays shortcut text on the right side of the `caption` attribute. |

### Theming

| Name     | Description|
|:---------|:-----------|
| `caption`   | Used for the caption inside the item.|
| `disabled`   | Added to the root element if it's disabled.|
| `icon`   | Used for the icon element if exists.|
| `menuItem`   | Used as the root class for the component.|
| `selected`   | Added to the root element in case it's selected.|
| `shortcut`   | Used for the shortcut element if exists.|

## Menu Divider

A very simple component that just displays a separator between options. It has no props and no state or methods, just markup. Also it accepts a single class for the styling which is `menuDivider`.
