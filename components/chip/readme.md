# Chip

Chips represent complex entities in small blocks, such as a contact. Chips can be used for various types of entities, including free form text, predefined text, rules, or contacts. Chips may also contain icons.

<!-- example -->
```jsx
import Chip from 'react-toolbox/lib/chip';

const ChipTest = () => (
  <div>
        <Chip label="Example Chip" />
        <Chip label="Deletable Chip" deletable />
        <Chip
          label="Avatar Chip"
          avatar={<Avatar style={{backgroundColor: 'deepskyblue'}} icon="folder" />}
        />
        <Chip
          label="Initial chip"
          avatar={<Avatar title="A" />}
          deletable
        />
        <Chip
          label="Image contact chip"
          avatar={<Avatar><img src="https://placeimg.com/80/80/animals"/></Avatar>}
        />
  </div>
);
```

## Properties

| Name          | Type        | Default         | Description|
|:--------------|:------------|:----------------|:-----------|
| `avatar`      | `element`   |                 | An `Avatar` component to use in a contact chip. |
| `className`   | `String`    | `''`            | Additional class name to provide custom styling.|
| `deletable`   | `Boolean`   | `false`         | If true, the chip will be rendered with a delete icon.|
| `label`       | `String`    | `''`            | label for the chip. |
