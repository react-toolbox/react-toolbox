# List

A [list component](https://material.google.com/components/lists.html) consists of a single continuous column of tessellated sub-divisions of equal width called rows that function as containers for tiles. Tiles hold content, and can vary in height within a list.

Lists are best suited to presenting a homogeneous data type or sets of data types, such as images and text, optimized for reading comprehension with the goal of differentiating between like data types or qualities within a single data type. You can compose lists based on subcomponents.

<!-- example -->
```jsx
import { List, ListItem, ListSubHeader, ListDivider, ListCheckbox } from 'react-toolbox/lib/list';

const ListTest = () => (
  <List selectable ripple>
    <ListSubHeader caption='Explore characters' />
    <ListItem
      avatar='https://placeimg.com/80/80/animals'
      caption='Dr. Manhattan'
      legend="Jonathan 'Jon' Osterman"
      rightIcon='star'
    />
    <ListItem
      avatar='https://placeimg.com/80/80/animals'
      caption='Ozymandias'
      legend='Adrian Veidt'
      rightIcon='star'
    />
    <ListItem
      avatar='https://placeimg.com/80/80/animals'
      caption='Rorschach'
      legend='Walter Joseph Kovacs'
      rightIcon='star'
    />
    <ListSubHeader caption='Configuration' />
    <ListCheckbox checked caption='Notify new comics' legend='You will receive a notification when a new one is published' />
    <ListDivider />
    <ListItem caption='Contact the publisher' leftIcon='send' />
    <ListItem caption='Remove this publication' leftIcon='delete' />
  </List>
);
```

If you want to provide styles via context to this components, you should use the key `RTList`.

## List

Is used as a wrapper for the list. It can hold properties that affect to the whole list and get styles for the wrapper.

### Properties
| Name          | Type        | Default    | Description|
|:-----|:-----|:-----|:-----|
| `className`   | `String`    |  `''`      | Sets a class to give custom styles to the list wrapper.|
| `ripple`      | `Boolean`   | `false`    | If true, each element in the list will have a ripple effect on click |
| `selectable`  | `Boolean`   | `false`    | If true, the elements in the list will display a hover effect and a pointer cursor. |

### Theme
| Name     | Description|
|:---------|:-----------|
| `list`   | Used for the root element of the list.|

## List Item

Represents a list item that can have avatar, icons, title, subtitle, etc. Note: you have to set it as an inmediate child of `List` component.

### Properties
| Name              | Type                  | Default       | Description|
|:-----|:-----|:-----|:-----|
| `avatar`          | `String` or `Element` |               | A string URL to specify an avatar in the left side of the item.|
| `caption`         | `String` or `Element` |               | Main text of the item.|
| `className`       | `String`              | `''`          | Set a class to give custom styles to the list item.|
| `disabled`        | `String`              | `false`       | If true, the item is displayed as disabled and is not clickable.|
| `itemContent`     | `Element`             |               | An element that will be displayed as the item. If set, this will override `caption` and `legend`.|
| `leftActions`     | `Array of Elements`   |               | A list of elements that are placed on the left side of the item and after the avatar attribute.|
| `leftIcon`        | `String` or `Element` |               | A string key of a font icon or element to display an icon in the left side of the item. |
| `legend`          | `String` or `Element` |               | Secondary text to display under the caption.|
| `onClick`         | `Function`            |               | Callback that is invoked when the item is clicked if it's not disabled. |
| `rightIcon`       | `String` or `Element` |               | The same as the `leftIcon` but in this case the icon is displayed in the right side.|
| `rightActions`    | `Array of Elements`   |               | A list of elements that are placed on the right side of the item and after the rightIcon attribute.|
| `ripple`          | `Boolean`             | `false`       | If true, the item displays a ripple effect on click. By default it's inherited from the parent element.|
| `selectable`      | `Boolean`             | `false`       | If true, the elements in the list will display a hover effect and a pointer cursor. Inherited from the parent.|
| `to`              | `String`              |               | In case you want to provide the item as a link, you can pass this property to specify the href. |

### Theme
| Name     | Description|
|:---------|:-----------|
| `disabled` | Added to the inner content if its a disabled item.|
| `item` | Used for the inner content of a list item.|
| `itemAction` | Used for each action element (left/right).|
| `itemContentRoot` | Used for the content wrapper element in list item.|
| `itemText` | Added to the text inside of the list item.|
| `large` | Added to the content wrapper element if size is large.|
| `left` | Added for the element that wraps left actions.|
| `listItem` | Used for the root element of the list.|
| `primary` | Added to the text inside of the list item if its primary.|
| `right` | Added for the element that wraps right actions.|
| `selectable` | Added to the inner content if its a selectable item.|


## List Checkbox

A special type of item that has a checkbox control on the left side. It implements similar methods to the `ListItem` component and some additional to control the checkbox.

### Properties
| Name            | Type            | Default       | Description|
|:-----|:-----|:-----|:-----|
| `caption`       | `String`        |               | Main text of the item. Required.|
| `className`     | `String`        |               | Set a class to give custom styles to Component.|
| `checked`       | `Boolean`       | `false`       | If true the checkbox appears checked by default.|
| `disabled`      | `String`        | `false`       | If true, the item is displayed as disabled and it's not clickable.|
| `legend`        | `String`        |               | Secondary text to display under the caption.|
| `name`          | `String`        |               | Name for the checkbox input item.|
| `onBlur`        | `Function`      |               | Callback called when the input element is blurred.|
| `onChange`      | `Function`      |               | Callback called when the input element is changed.|
| `onFocus`       | `Function`      |               | Callback called when the input element is focused.|

### Theme
| Name     | Description|
|:---------|:-----------|
| `checkbox` | Used as a wrapper class for the subheader element.|
| `checkboxItem` | Added to the checkbox element.|
| `disabled` | Added to the root element if the component is disabled.|
| `item` | Used as a wrapper class root element element. Same as List.|
| `itemContentRoot` | Used for the content wrapper element in list item.|
| `itemText` | Added to the text inside of the list item.|
| `large` | Added to the content wrapper element if size is large.|
| `primary` | Added to the text inside of the list item if its primary.|


## List Subheader

Simple subcomponent used to give a title to a list area.

### Properties
| Name          | Type        | Default       | Description|
|:-----|:-----|:-----|:-----|
| `caption`     | `String`    |               | Text that will be displayed.|
| `className`   | `String`    | `''`          | Set a class to give custom styles to the list subheader.|

### Theme
| Name     | Description|
|:---------|:-----------|
| `subheader` | Used as a wrapper class for the subheader element.|

## List Divider

Simple subcomponent used to separate list sections or items. It has only one property `inset` which is a `Boolean` that indicates if the divider should be full with or should leave an space to the left side. It has two theming keys: `inset` and `divider` that will be used depending on wether it should full width or leave space.
