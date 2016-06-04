# Chip

Chips represent complex entities in small blocks, such as a contact. Chips can be used for various types of entities, including free form text, predefined text, rules, or contacts. Chips may also contain icons. To add an icon or contact image to a chip, include an `Avatar` element as the first child.

<!-- example -->
```jsx
import Avatar from 'react-toolbox/lib/avatar';
import Chip from 'react-toolbox/lib/chip';

const ChipTest = () => (
  <div>
    <Chip>Example chip</Chip>
    <Chip>
      <span style={{textDecoration: 'line-through'}}>Standard</span>
      <strong>Custom</strong> chip <small>(custom markup)</small>
    </Chip>

    <Chip deletable>Deletable Chip</Chip>

    <Chip>
      <Avatar style={{backgroundColor: 'deepskyblue'}} icon="folder" />
      <span>Avatar Chip</span>
    </Chip>

    <Chip>
      <Avatar title="A" /><span>Initial chip</span>
    </Chip>

    <Chip>
      <Avatar><img src="https://placeimg.com/80/80/animals"/></Avatar>
      <span>Image contact chip</span>
    </Chip>
  </div>
);
```

If you want to provide a theme via context, the component key is `RTChip`.

## Properties

| Name            | Type        | Default         | Description|
|:----------------|:------------|:----------------|:-----------|
| `children`      | `Node`      |                 | Child components, usually `Avatar` and inline elements. |
| `className`     | `String`    | `''`            | Additional class name to provide custom styling.|
| `deletable`     | `Boolean`   | `false`         | If true, the chip will be rendered with a delete icon.|
| `onDeleteClick` | `Function`  |                 | Callback to be invoked when the delete icon is clicked. |

## Theme

| Name       | Description|
|:-----------|:-----------|
| `avatar` | Added to the root element when the component includes an avatar.|
| `chip` | Used for the root element.|
| `deletable` | Added to the root element when the component is deletable.|
| `delete` | Used for the delete element wrapper.|
| `deleteIcon` | Used for the delete icon.|
| `deleteX` | Used for the delete svg inner layer.|
