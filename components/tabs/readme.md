# Tabs

[Tabs](https://www.google.com/design/spec/components/tabs.html) make it easy to explore and switch between different views or functional aspects of an app or to browse categorized data sets.  Tabs are composed with their content, but only the active tab's content is rendered.  In the future, we may add the ability to render headers only, with event listeners.

<!-- example -->
```jsx
import {Tab, Tabs} from 'react-toolbox';

class TabsTest extends React.Component {
  state = {
    index: 1
  };

  handleTabChange = (index) => {
    this.setState({index});
  };

  handleActive = () => {
    console.log('Special one activated');
  };

  render () {
    return (
      <Tabs index={this.state.index} onChange={this.handleTabChange}>
        <Tab label='Primary'><small>Primary content</small></Tab>
        <Tab label='Secondary' onActive={this.handleActive}><small>Secondary content</small></Tab>
        <Tab label='Third' disabled><small>Disabled content</small></Tab>
        <Tab label='Fourth' hidden><small>Fourth content hidden</small></Tab>
        <Tab label='Fifth'><small>Fifth content</small></Tab>
      </Tabs>
    );
  }
}
```

## Tabs

This component acts as the wrapper and the main controller of the content that is being displayed. It gets some properties that can be spread to the children.

| Name                          | Type            | Default         | Description|
|:-----|:-----|:-----|:-----|
| `className`                   | `String`        | `''`            | Additional class name to provide custom styling.|
| `disableAnimatedBottomBorder` | `Boolean`       | `false`         | Disable the animation below the active tab.|
| `index`                       | `Number`        | `0`             | Current <Tab> |
| `onChange`                    | `Function`      |                 | Callback function that is fired when the tab changes.|

## Tab

Represent a single tab element and it should include some properties to describe the tab itself and get children elements as content.

| Name              | Type            | Default         | Description|
|:-----|:-----|:-----|:-----|
| `active`          | `Boolean`       | `false`         | If true, the current component is visible.|
| `activeClassName` | `String`        | `''`            | Additional class name to provide custom styling for the active tab.|
| `className`       | `String`        | `''`            | Additional class name to provide custom styling for each tab.|
| `disabled`        | `Boolean`       | `false`         | If true, the current component is not clickable.|
| `hidden`          | `Boolean`       | `false`         | If true, the current component is not visible.|
| `label`           | `String`        |                 | Label text for navigation header. Required. |
| `onActive`        | `Function`      |                 | Callback function that is fired when the tab is activated. |
| `onClick`         | `Function`      |                 | Callback function that is fired when the tab is clicked. |
