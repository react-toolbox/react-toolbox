# Table

The Table component is an enhanced version of the standard HTML `<table>`. A data-table consists of rows and columns of well-formatted data, presented with appropriate user interaction capabilities. This component uses a solid typed model, helping you to create formatted cells. These cells can be editable if you subscribe to `onChange` method who dispatch then new source with each change.

*A note about models and table headers*: By default, the table header text uses name of the property in the model. Additionally, the table header text is automatically set in title case (first letter of each word capitalized). Thus, if you use the property name `twitter` in your model, the displayed table header will be `Twitter`. You can override the default text by including a `title` attribute, as demonstrated in the example below for the `birthdate` property. You may also override the title case in your own theme's css. In the following example, we force the first letter of the table header text to lowercase, using SCSS syntax:

```
.table {
  th {
    &:first-letter {
      text-transform: lowercase;
    }
  }
}
```

<!-- example -->

```jsx
import Table from 'react-toolbox/lib/table';

const UserModel = {
  name: {type: String},
  twitter: {type: String},
  birthdate: {type: Date,
    title: 'Date of Birth'},
  cats: {type: Number},
  dogs: {type: Number},
  active: {type: Boolean}
};

const users = [
  {name: 'Javi Jimenez', twitter: '@soyjavi', birthdate: new Date(1980, 3, 11), cats: 1},
  {name: 'Javi Velasco', twitter: '@javivelasco', birthdate: new Date(1987, 1, 1), dogs: 1, active: true}
];

class TableTest extends React.Component {
  state = { selected: [], source: users };

  handleChange = (row, key, value) => {
    const source = this.state.source;
    source[row][key] = value;
    this.setState({source});
  };

  handleSelect = (selected) => {
    this.setState({selected});
  };

  render () {
    return (
      <Table
        model={UserModel}
        onChange={this.handleChange}
        onSelect={this.handleSelect}
        selectable
        multiSelectable
        selected={this.state.selected}
        source={this.state.source}
      />
    );
  }
}
`
```

This component can be styled by context providing a theme with the key `RTTable` through the theme provider.

## Properties

Name              | Type       | Default | Description
:---------------- | :--------- | :------ | :--------------------------------------------------------------------------------------------------
`className`       | `String`   | `''`    | Sets a custom class to style the Component.
`heading`         | `Boolean`  | `true`  | If true, component will show a heading using model field names.
`model`           | `Object`   |         | Object describing the data model that represents each object in the `source`.
`onChange`        | `Function` |         | Callback function that is fired when an item in a row changes. If set, rows are editable.
`onSelect`        | `Function` |         | Callback function invoked when the row selection changes.
`selectable`      | `Boolean`  | `true`  | If true, each row will display a checkbox to allow the user to select that one row.
`multiSelectable` | `Boolean`  | `true`  | If true, the header and each row will display a checkbox to allow the user to select multiple rows.
`selected`        | `Array`    |         | Array of indexes of the items in the source that should appear as selected.
`source`          | `Array`    |         | Array of objects representing each item to show.

## Theme

Name         | Description
:----------- | :--------------------------------------------------
`editable`   | It will be added to a row in case it is editable.
`row`        | Used for the row element.
`selectable` | It will be added to a row in case it is selectable.
`selected`   | Added to a row in case it is selected.
`table`      | Classname used for the root element.
