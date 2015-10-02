/* global React */

import Autocomplete from './components/autocomplete';
import Button from './components/button';
import Drawer from './components/drawer';
// import Card from './components/card';
// import Dialog from './components/dialog';
// import Dropdown from './components/dropdown';
// import FontIcon from './components/font_icon';
// import Form from './components/form';
// import Progress from './components/progress';
// import Slider from './components/slider';
// import Switch from './components/switch';
// import Pickers from './components/pickers';
// import Tabs from './components/tabs';

const Test = React.createClass({
  displayName: 'App',

  render () {
    return (
      <app data-toolbox-app={true}>
        <h1>React Toolbox</h1>
        <Autocomplete />
        <Button />
        <Drawer />
      </app>
    );
  }
});

React.render(<Test/>, document.body);
