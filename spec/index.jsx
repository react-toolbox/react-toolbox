import React from 'react';
import ReactDOM from 'react-dom';

import Autocomplete from './components/autocomplete';
import Button from './components/button';
import Card from './components/card';
import Checkbox from './components/checkbox';
import Dialog from './components/dialog';
import Drawer from './components/drawer';
import Dropdown from './components/dropdown';
import Input from './components/input';
import Pickers from './components/pickers';
import Progress from './components/progress';
import RadioGroup from './components/radio_group';
import Slider from './components/slider';
import Switch from './components/switch';
// import FontIcon from './components/font_icon';
// import Form from './components/form';
// import Tabs from './components/tabs';

const Test = React.createClass({
  displayName: 'App',

  render () {
    return (
      <app data-react-toolbox-app>
        <h1>React Toolbox</h1>
        <h3>Component Spec v0.10.9</h3>
        <Autocomplete />
        <Button />
        <Card />
        <Checkbox />
        <Dialog />
        <Drawer />
        <Dropdown />
        <Input />
        <Pickers />
        <Progress />
        <RadioGroup />
        <Slider />
        <Switch />
      </app>
    );
  }
});

ReactDOM.render(<Test/>, document.getElementById('toolbox-test'));
