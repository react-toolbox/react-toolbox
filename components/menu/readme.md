# Menu

A [Menu](https://www.google.com/design/spec/components/menus.html) is a temporary piece of material emitted from a button, an action, a pointer, or another control that contains at least two menu items. Each menu item is a discrete option or action that can affect the app, the view, or selected elements within a view. Menus should not be used as a primary method for navigation within an app. You can compose a menu based on a few subcomponents, same as for Lists.

<!-- example -->
```jsx
import {IconMenu, MenuItem, MenuDivider } from 'react-toolbox';

const MenuTest = () => (
  <IconMenu icon='more_vert' position='top-left' menuRipple>
    <MenuItem value='download' icon='get_app' caption='Download' />
    <MenuItem value='help' icon='favorite' caption='Favorite' />
    <MenuItem value='settings' icon='open_in_browser' caption='Open in app' />
    <MenuDivider />
    <MenuItem value='signout' icon='delete' caption='Delete' disabled />
  </IconMenu>
);
```

## Menu

This subcomponent is the default wrapper for a menu and is responsible for the opening behavior. Its properties can affect to the Item children.

| Name              | Type          | Default         | Description|
|:-----|:-----|:-----|:-----|
| `active`   | `Boolean`    | `false`    | If true, the menu will be displayed as opened by default.|
| `className`   | `String`    |  `''`    | Set a class to give custom styles to the menu wrapper.|
| `onHide`    | `Function`    |    | Callback that will be called when the menu is being hid. |
| `onShow`    | `Function`    |    | Callback that will be invoked when the menu is being shown. |
| `outline`    | `Boolean`    | `true`  | If true the menu wrapper will show an outline with a soft shadow. |
| `position`    | `String`    | `static`  | Determine the position of the menu. With `static` value the menu will be always shown, `auto` means that the it will decide the opening direction based on the current position. To force a position use `top-left`, `top-right`, `bottom-left`, `bottom-right`. |
| `ripple`    | `Boolean`    | `true`  | If true, the menu items will show a ripple effect on click. |
| `selectable`    | `Boolean`    | `false`  | If true, the menu will keep a value to highlight the active child item. |
| `selected`    | `Any`    |  | Used for selectable menus. Indicates the current selected value so the child item with this value can be highlighted. |

The menu has state to keep a value with the currently selected item. It also exposes methods to show and hide the menu from the code:

- `getValue` is used to get the current value.
- `setValue` is used to set a new active value.
- `show` is used to show the menu.
- `hide` is used to hide the menu.

## Icon Menu

As the most usual scenario will be to open the menu from a click in an Icon, we provide this subcomponent implementing this behavior. The `IconMenu` shows an icon and implements a `Menu` under the covers that is shown when is clicked. Some of its properties are transferred to the menu, others to the children:

| Name              | Type          | Default         | Description|
|:-----|:-----|:-----|:-----|
| `className`   | `String`    |  `''`    | Set a class to give custom styles to the icon wrapper.|
| `icon`    | `String`    | `more_vert`  | Icon font key string to display the opener icon. |
| `iconRipple`    | `String`    | `true`  | If true, the icon will show a ripple when is clicked. |
| `menuRipple`    | `String`    | `true`  | Transferred to the `Menu` component. |
| `onClick`    | `Function`    |    | Callback that will be called when the icon is clicked. |
| `onHide`    | `Function`    |    | Callback that will be called when the menu is being hid. |
| `onShow`    | `Function`    |    | Callback that will be invoked when the menu is being shown. |
| `onSelect`    | `Function`    |    | Callback that will be invoked when a menu item is selected. |
| `position`    | `String`    | `auto`  | Determine the position of the menu. This property is transferred to the inner `Menu` component. |
| `selectable`    | `Boolean`    | `false`  | If true, the menu will keep a value to highlight the active child item. |
| `selected`    | `Any`    |  | Used for selectable menus. Indicates the current selected value so the child item with this value can be highlighted. |

## Menu Item

Is the inner component for menus and describes the content of each option. It behaves in a similar way to List Items but simpler.

| Name              | Type          | Default         | Description|
|:-----|:-----|:-----|:-----|
| `caption`   | `String`    |    | The text to include in the menu item.|
| `className`   | `String`    |  `''`    | Set a class to give custom styles to the item.|
| `disabled`   | `Boolean`    |  `false`    | If true, the item will be displayed as disabled and is not selectable.|
| `icon`    | `String`    |  | Icon font key string to display in the right side of the option. |
| `ripple`    | `Boolean`    | `false`  | If true, the item will show a ripple effect when it's clicked. Inherited from the parent. |
| `selected`    | `Boolean`    | `false`  | Transferred from the `Menu` component for selectable menus. Indicates if it's the current active option. |

## Menu Divider

A very simple component that just displays a separator between options. It has no props and no state or methods, just markup.
