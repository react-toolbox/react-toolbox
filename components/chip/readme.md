# Chip

Chips represent complex entities in small blocks, such as a contact. Chips can be used for various types of entities, including free form text, predefined text, rules, or contacts. Chips may also contain icons.

To add an icon or contact image to a chip, include an `Avatar` element as the first child.

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

## Properties

| Name            | Type        | Default         | Description|
|:----------------|:------------|:----------------|:-----------|
| `children`      | `Node`      |                 | Child components, usually `Avatar` and inline elements. |
| `className`     | `String`    | `''`            | Additional class name to provide custom styling.|
| `deletable`     | `Boolean`   | `false`         | If true, the chip will be rendered with a delete icon.|
| `onDeleteClick` | `Function`  |                 | Callback to be invoked when the delete icon is clicked. |

## Theming

You can take a look to the configuration variables at the `_config.scss` file. The component implements the following class interface:

| Name       | Description|
|:-----------|:-----------|
| `avatar`     | Used in the root when the component includes an avatar.|
| `chip` | Root class.|
| `deletable` | Used in the root when the component is deletable.|
| `delete` | Used for the delete element wrapper.|
| `deleteIcon` | Used for the delete icon wrapper.|
| `deleteX` | Used for the delete svg inner layer.|
