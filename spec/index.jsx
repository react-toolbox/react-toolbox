/* global React */

import Drawer from './components/drawer';
import Autocomplete from './components/autocomplete';
import Button from './components/button';
import Card from './components/card';
import Dialog from './components/dialog';
import Dropdown from './components/dropdown';
import FontIcon from './components/font_icon';
import Form from './components/form';
import Progress from './components/progress';
import Slider from './components/slider';
import Switch from './components/switch';
import Pickers from './components/pickers';
import Tabs from './components/tabs';

const Test = React.createClass({
  displayName: 'App',

  render () {
    return (
      <app data-toolbox={true}>
        <h1>React-Toolbox <small>New way for create</small></h1>
          <Drawer />
          <Autocomplete />
          <Button />
          <Card />
          <Dialog />
          <Dropdown />
          <FontIcon />
          <Form />
          <Progress />
          <Slider />
          <Switch />
          <Tabs />
          <Pickers />
      </app>
    );
  }
});

React.render(<Test/>, document.body);
