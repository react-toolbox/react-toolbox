# Table

The Table component is an enhanced version of the standard HTML `<table>`. A data-table consists of rows and columns of well-formatted data, presented with appropriate user interaction capabilities. This component uses a solid typed model, helping you to create formatted formated cells. These cells can be editable if you subscribe to `onChange` method who dispatch then new dataSource with each change.

<!-- example -->
```jsx
import Table from 'react-toolbox/table';

const UserModel = {
  name: {type: String}
,
  twitter: {type: String}
,
  birthdate: {type: Date}
,
  cats: {type: Number}
,
  dogs: {type: Number}
,
  active: {type: Boolean}
};

const users = [
  {name: 'Javi Jimenez', twitter: '@soyjavi', birthdate: new Date(1980, 3, 11), cats: 1}
,
  {name: 'Javi Velasco', twitter: '@javivelasco', birthdate: new Date(1987, 1, 1), dogs: 1, active: true}
];

const TableTest = () => (
  <Table model={UserModel} dataSource={users} />
)
```

## Properties

| Name              | Type          | Default         | Description|
|:-----|:-----|:-----|:-----|
| `className`     | `String`      | `''`            | Sets a class to style of the Component.|
| `dataSource`    | `Array`       |           | array representing all items for show.|
| `model`         | `Object`      |                 | If true, component will be disabled.|
| `heading`       | `Bool`        | `true`          | If true, component will show a heading using model field names.|
| `onChange`      | `Function`    |                 | Callback function that is fired when the components's value changes.|
| `onSelect`      | `Function`    |                 | Callback function when  selects a determinate row.|
